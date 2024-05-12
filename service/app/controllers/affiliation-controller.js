import validators from "../validators/index.js";
import { NotFound, ValidationError, validateSchema} from '../utility.js';
import { setError, setResponse } from "./response-handler.js";
import JourneyService from "../services/journey-service.js";
import { AFFILIATION_JOURNEY_STATUS_MAP, AFFILIATION_STATUS, CENTER_TYPE, JOURNEY_STATUS } from "../models/enums/index.js";
import centerService from "../services/center-service.js";
import { updateCenter } from "./centers-controller.js";
import journeyService from "../services/journey-service.js";
import userService from "../services/user-service.js";
import saplingKitService from "../services/sapling-kit-service.js";
import plantService from "../services/plant-service.js";
import { getAssignable } from "./journey-controller.js";

const validateCompletedJourney = async (id, userId) => {
  let existingJourney = await JourneyService.findUserJourney(id, userId);
    if(!existingJourney) {
      NotFound("Journey not found !");
    }
    if(existingJourney.status !== JOURNEY_STATUS.COMPLETED) {
      ValidationError("Complete the journey be an affiliate !")
    }
  return existingJourney;
}


export const post = async (request, response) => {
  try{
    let existingJourney = await validateCompletedJourney(request.params.id, request.user._id);

    if(existingJourney.affiliation) {
      ValidationError("Your journey is already affiliated !")
    }

    const requestData = {
      ...request.body, // Location and address details are expected from the user
      name: `${request.user.name} Affiliation Center`,
      type: CENTER_TYPE.AFFILIATION,
      active: true
    };

    const affiliationCenterData  = validateSchema(validators.center.registerCenterSchema, requestData);
    updateCenter(affiliationCenterData);
    affiliationCenterData.kits = [{kit_id: [existingJourney.kit_id], count: 1}] // Add the kit_id which was part of journey

    const affiliationCenter = await centerService.save(affiliationCenterData);

    existingJourney =  await JourneyService.updateById(request.params.id, {affiliation: {center_id: affiliationCenter._id}});
    setResponse({message: "Your affiliation is registered ! Check in frequently to serve requests from your center.", affiliation: existingJourney.affiliation}, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};

/**
 * Send affiliation details along with the requests
 */
export const get = async (request, response) => {
  try{
    let existingJourney = await validateCompletedJourney(request.params.id, request.user._id);
    /**
     * Send the affiliation address details, send the kit, send kit instructions, send list of journeys associated
     */
    if(!existingJourney.affiliation) {
      NotFound("Affiliation does not exist for this journey")
    }
    const affiliationCenter = await centerService.find({_id: existingJourney.affiliation.center_id});
    const kit = await saplingKitService.find(existingJourney.kit_id);
    const plant = await plantService.find(kit.plant_id);

    // Fetch all the requested journeys served by the affiliate
    const journeys = await journeyService.findByAffiliateProvider(affiliationCenter._id);
    const journeyDetails = []
    for(let journey of journeys) {
      const affiliateRequest = getAffiliateRequest(journey);
      journeyDetails.push(affiliateRequest);
    }

    const affiliationDetails = {
      name: affiliationCenter.name,
      address: affiliationCenter.address,
      active: affiliationCenter.active,
      location: affiliationCenter.location,
      kit: {
        _id: kit._id,
        name: kit.name,
        preperation_instructions: kit.preperation_instructions,
        journey_instructions: kit.journey_instructions,
        level: kit.level,
        createdDate: kit.createdDate,
        updatedAt: kit.updatedAt,
        plant,
      },
      requests: journeyDetails
    };

    setResponse(affiliationDetails, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
}

/**
 * Mark the affiliation request as accepted
 */
export const accept = async(request, response) => {
  try {
    let existingJourney = await validateCompletedJourney(request.params.id, request.user._id);

    if(!existingJourney.affiliation) {
      NotFound("Affiliation does not exist for this journey")
    }

    let affiliateRequest = await journeyService.findAffiliateRequest(existingJourney.affiliation.center_id, request.params.requestid);
    if (!affiliateRequest) {
      NotFound("Request not found !")
    }
    const requestStatus = AFFILIATION_JOURNEY_STATUS_MAP[affiliateRequest.status];
    if(requestStatus != AFFILIATION_STATUS.ACTION_REQUIRED) {
      ValidationError("Request not in acceptable status !")
    }

    affiliateRequest =  await journeyService.updateById(affiliateRequest.id, {status: JOURNEY_STATUS.WAITING});
    affiliateRequest = getAffiliateRequest(affiliateRequest);
    setResponse({message: "Request accepted ! Start with your preperation.", request: affiliateRequest}, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};

/**
 * Mark the affiliation request as pickup ready
 */
export const complete = async(request, response) => {
  try {
    let existingJourney = await validateCompletedJourney(request.params.id, request.user._id);

    if(!existingJourney.affiliation) {
      NotFound("Affiliation does not exist for this journey")
    }

    let affiliateRequest = await journeyService.findAffiliateRequest(existingJourney.affiliation.center_id, request.params.requestid);
    if (!affiliateRequest) {
      NotFound("Request not found !")
    }
    const requestStatus = AFFILIATION_JOURNEY_STATUS_MAP[affiliateRequest.status];
    if(requestStatus != AFFILIATION_STATUS.WAITING) {
      ValidationError("Request cannot be put to complete request")
    }

    affiliateRequest =  await journeyService.updateById(affiliateRequest.id, {status: JOURNEY_STATUS.PICKUP_READY});
    affiliateRequest = getAffiliateRequest(affiliateRequest);
    setResponse({message: "Request marked as picked up ! Please wait till the user picks it up!", request: affiliateRequest}, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};


/**
 * Mark the affiliation request as rejected
 */
export const reject = async(request, response) => {
  try {
    let existingJourney = await validateCompletedJourney(request.params.id, request.user._id);

    if(!existingJourney.affiliation) {
      NotFound("Affiliation does not exist for this journey")
    }

    let affiliateRequest = await journeyService.findAffiliateRequest(existingJourney.affiliation.center_id, request.params.requestid);
    if (!affiliateRequest) {
      NotFound("Request not found !")
    }
    const requestStatus = AFFILIATION_JOURNEY_STATUS_MAP[affiliateRequest.status];
    if(requestStatus != AFFILIATION_STATUS.ACTION_REQUIRED) {
      ValidationError("Request not in acceptable status !")
    }

    const requestUser = await userService.find(affiliateRequest.user_id);
    // Attempt to find another provider
    const assignable = await getAssignable(affiliateRequest.level, requestUser.locationX, requestUser.locationY, requestUser.gender, [this.affiliateRequest.provider_id]);
    if (!assignable) {
      ValidationError("Cannot initate action as you are the only serving center in your locality ")
    }
    

    affiliateRequest =  await journeyService.updateById(affiliateRequest.id, {
      status: JOURNEY_STATUS.PENDING,
      provider_id: assignable.provider._id,
      provider_type: assignable.provider.type,
      kit_id: assignable.kit._id,
      status: getInitJourneyStatus(assignable.provider.type),
    });

    affiliateRequest = getAffiliateRequest(affiliateRequest);
    setResponse({message: "Request rejected !", request: affiliateRequest}, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};


const getAffiliateRequest = async (journey) => {
  const affiliationStatus = AFFILIATION_JOURNEY_STATUS_MAP[journey.status];
  const journeyUser = await userService.find(journey.user_id);
  journeyDetails.push({
    _id: journey._id,
    user: {
      name: journeyUser.name,
      email: journeyUser.email,
    },
    status: affiliationStatus,
  });
}