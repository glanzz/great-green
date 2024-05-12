import axios from 'axios';
import { LoginFormInput } from '../models/login';
import { toast } from 'react-toastify';
import { JOURNEY_STATUS, loadJourneys } from '../store/journey-slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { Journey } from '../models/journey';
import { NewMileStone } from '../components/CreateMilestoneForm';




const HOST_URL = "http://localhost:3000/api/v1"
const api = axios.create({
  baseURL: HOST_URL,
  withCredentials: true,
  headers: {
      "Content-type": "application/json",
  },
});


const  getURL = (path: string) => (`${HOST_URL}${path}`);


export const getUserInfo = (params={}) => {
  return api.get("/auth/userinfo", {params})
}

export const login = (
  data: LoginFormInput,
  cb: () => void,
  translate: (message: string) => string,
  ) => {
  return  api.post("/auth/login", data).then(({data}) => {
    console.log(data);
    cb();
  }).catch(err => {
    console.log(err);
    toast( (err && err.response && err.response.data.message ) || translate('login.toast.error'))
  });
}


export const generateOTP = (email: string, cb: () => void) => {
  return  api.post("/auth/generateOTP", {email}).then(({data}) => {
    console.log(data);
    cb();
  }).catch(err => {
    console.log(err);
    toast( (err && err.response && err.response.data.error.message ) || "Login Failed !")
  });
}

export const registerUser = (params = {}, cb: () => void,t: (message: string) => string) => {
  return api.post(getURL("/auth/register"), params)
    .then(({ data }) => {
      console.log(data);
      toast(t('signup.toast'));
      cb();
    })
    .catch((err) => {
      console.log(err);
      toast.error((err && err.response && err.response.data.error.message) || t('signup.toast.error'));
    });
  };
export const fetchJourneys = (t: (message: string) => string, params={}) => (dispatch: (p: PayloadAction<Array<Journey>>) => void) => {
  return api.get(getURL("/journeys"), {params}).then(({data}) => {
    dispatch(loadJourneys(data));
  }).catch(err => {
    console.log(err);
    toast(t('fetch.journey.error'))
  })
}


export const completeContribution = (journeyId: string, cb: () => void, t: (message: string) => string) => {
  return  api.patch(`/journeys/${journeyId}/contributions/complete`).then(({data}) => {
    console.log(data);
    toast(t('contributuion.toast'));
    cb();
  }).catch(err => {
    console.log(err);
    toast( (err && err.response && err.response.data.message ) || t('contributuion.toast.error'))
  });
};

export const updateJourneyStatus = (journeyId: string, status: string, cb: () => void , t: (message: string) => string) => {
  return  api.patch(`/journeys/${journeyId}`, {status}).then(() => {
    cb();
  }).catch(err => {
    console.log(err.response);
    toast( (err && err.response && err.response.data.error.message ) || t('update.journey.toast.error'))
  });
};

export const createContribution = (journeyId: string, value: number, cb: () => void , t: (message: string) => string) => {
  return  api.post(`/journeys/${journeyId}/contributions`, {value}).then(async () => {
    await updateJourneyStatus(journeyId, JOURNEY_STATUS.COMPLETED.name, cb, t);
  }).catch(err => {
    console.log(err.response);
    toast( (err && err.response && err.response.data.error.message ) || t('update.journey.toast.error'))
  });
};

export const createJourney = (level: string, cb: (id: string) => void , t: (message: string) => string) => {
  return  api.post(`/journeys`, {level}).then(({data}) => {
    cb(data._id);
  }).catch(err => {
    toast( (err && err.response && err.response.data.error.message ) || t('create.journey.toast.error'))
  });
};

export const createMilestone = (journeyId: string, data: NewMileStone, cb: () => void , t: (message: string) => string) => {
  const formData = new FormData();
  formData.append("file", data.file);
  if (data.comment) {
    formData.append("comment", data.comment);
  }
  

  return  api({
    method: "post",
    url: `/journeys/${journeyId}/milestones`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then(() => {
    toast(t('milestone.toast'))
    cb();
  }).catch(err => {
    console.log(err);
    toast( (err && err.response && err.response.data.message ) || t('milestone.toast.error'))
  });
};
