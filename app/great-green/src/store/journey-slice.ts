import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from ".";
import { Journey } from "../models/journey";


export const JOURNEY_STATUS = {
  PENDING: {
    name: "PENDING"
  },
  WAITING: {
    name: "WAITING"
  },
  PICKUP_READY: {name: "PICKUP_READY"},
  IN_PROGRESS: {name: "IN_PROGRESS"},
  COMPLETED: {name: "COMPLETED"}
};


export type JourneyState = {
  activeJourney?: Journey,
  journeys: Array<Journey>,
}


const initiateState: JourneyState = {
  activeJourney: undefined,
  journeys: []
};

export const journeysSlice = createSlice({
  name: 'journeys',
  initialState: initiateState,
  reducers: {
    loadJourneys: (state: JourneyState, action: PayloadAction<Array<Journey>>) => {
      let activeJourney: Journey | undefined;
      action.payload.forEach((journey: Journey) => {
        if (journey.status !== JOURNEY_STATUS.COMPLETED.name) {
          activeJourney = journey;
          journey.active = true;
        } else {
          journey.active = false;
        }
      })
      return {
        ...state,
        activeJourney,
        journeys: action.payload
      }
    }
  }
}) ;


export const { loadJourneys } = journeysSlice.actions;


export const getJourneys = (): ((state: AppState) => Array<Journey>) => {
    return (state: AppState) => state.journeys.journeys;
}
export const getContributionJourneys = (): ((state: AppState) => Array<Journey>) => {
    return (state: AppState) => state.journeys.journeys.filter(journey => !!journey.contribution);
}
export const getActiveJourney = (): ((state: AppState) => Journey | undefined) => {
    return (state: AppState) => state.journeys.activeJourney;
}

export const getJourneyById = (id: string): ((state: AppState) => Journey | undefined) => {
    return (state: AppState) => state.journeys.journeys.find(journey => journey._id == id);
}


export default journeysSlice.reducer;