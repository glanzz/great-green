import validators from "../validators/index.js";
import { NotFound, ValidationError, validateSchema} from '../utility.js';
import { setError, setResponse } from "./response-handler.js";
import JourneyService from "../services/journey-service.js";
import Assigner from "../assigner.js";
import { CENTER_TYPE, INVALID_USER_UPDATE_JOURNEY_STATUS, JOURNEY_STATUS, LEVEL } from "../models/enums/index.js";
import saplingKitService from "../services/sapling-kit-service.js";
import centerService from "../services/center-service.js";
import plantService from "../services/plant-service.js";
import addonService from "../services/addon-service.js";
import badgeService from "../services/badge-service.js";
import { GREAT_GREEN_CONTRIBUTOR_BADGE } from "../constants.js";
import { getLogoURL } from "./badge-controller.js";



/**
 * Lists all the Journeys by default of the particular user
 * Filter based on status only if satus is in set of valid status
 * 
 */
export const search = async (request, response) => {
  try {
    const journeys = await JourneyService.filter(request.query, request.user._id);
    const journeysResponse = [];
    for(let journey of journeys) {
      let journeyResponse = await getJourneyResponse(journey);
      journeysResponse.push(journeyResponse);
    }
    setResponse(journeysResponse, response);
  } catch(error) {
    console.log(error);
    setError(error, response);
  }
}


export const getAssignable = async (userLevel, locationX, locationY, gender, blacklistCenters=[]) => {
  const index = LEVEL.getValues().findIndex(level => level == userLevel);
    let assignable = null;
    for(let i=index; i<LEVEL.getValues().length; i++) {
      const assigner = new Assigner(locationX, locationY, gender, LEVEL.getValues()[i], blacklistCenters)
      await assigner.build();
      console.log(assigner);
      assignable = await assigner.getBest(assigner);
      console.log(assignable);
      if(assignable) {
        break;
      }
    }
    return assignable;
}


export const getInitJourneyStatus = (providerType) => providerType == CENTER_TYPE.UN ? JOURNEY_STATUS.PICKUP_READY: JOURNEY_STATUS.PENDING;

/**
 * Register a new journey
 */
export const post = async (request, response) => {
  try{
    const existingJourney = await JourneyService.findExistingOngoingJourney(request.user._id);
    if(existingJourney) {
      ValidationError("Bad request! There is an ongoing journey");
    }
    const requestData = {...request.body, user_id: request.user._id};
    const journeyData  = validateSchema(validators.journey.registerJourneySchema, requestData);


    // Incrementally search by reducing the difficulty
    // Decrement the level and find the best

    const assignable = await getAssignable(journeyData.level, request.user.locationX, request.user.locationY, request.user.gender);
    if (!assignable) {
      NotFound("Sorry, we cannot serve your request due to high demand. Please try again later !");
    }

    const journeyDetails  = {
      user_id: request.user._id,
      provider_id: assignable.provider._id,
      provider_type: assignable.provider.type,
      kit_id: assignable.kit._id,
      status: getInitJourneyStatus(assignable.provider.type),
      level: journeyData.level,
      quantity: 1,
    };


    const journey = await JourneyService.save(journeyDetails);
    const journeyResponse = await getJourneyResponse(journey);
    setResponse(journeyResponse, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};

export const patch = async (request, response) => {
  try{
    let journey = await JourneyService.findUserJourney(request.params.id, request.user._id);
    if(!journey) {
      NotFound("Journey not found ! ");
    }
    const requestData = {...request.body};
    const journeyData  = validateSchema(validators.journey.updateJourneySchema, requestData);
    if(journey.status == journeyData.status) {
      ValidationError(`Journey is already ${journey.status} !`)
    }
    
    if (INVALID_USER_UPDATE_JOURNEY_STATUS.includes(journeyData.status)) { // These are special status related to 
      ValidationError("Invalid status value !")
    }
    // Check the journey status to be updated is in next possible state so that its seqential update
    const index = JOURNEY_STATUS.getValues().findIndex(status => status == journey.status);
    if (journeyData.status != JOURNEY_STATUS.getValues()[index+1]) {
      ValidationError(`Next possible state is ${JOURNEY_STATUS.getValues()[index+1]}`)
    }
    const MIN_MILESTONES_TO_COMPLETE = 5;
    if((journeyData.status == JOURNEY_STATUS.COMPLETED) && (journey.milestones.length < MIN_MILESTONES_TO_COMPLETE)) {
      ValidationError(`Cannot complete until min ${MIN_MILESTONES_TO_COMPLETE} milestones are added !`);
    }


    /** Remove if any errors found */
    if((journeyData.status == JOURNEY_STATUS.IN_PROGRESS)  && (journey.provider_type == CENTER_TYPE.AFFILIATION)) {
      let affiliator = await JourneyService.findAffiliator(journey.provider_id);
      // Update affiliation completion count
      affiliator =  await JourneyService.updateById(journey._id, {affiliation: {count: affiliator.affiliation.count + 1}});
    }

    const completeJourney = journeyData.status == JOURNEY_STATUS.COMPLETED;
    if (completeJourney) {
      const contributionBadge = await badgeService.getByName(GREAT_GREEN_CONTRIBUTOR_BADGE);
      request.user.badges.push({badge_id: contributionBadge._id});
      request.user.save()
    }

    journey =  await JourneyService.updateById(request.params.id, {status: requestData.status});
    let journeyResponse = await getJourneyResponse(journey);
    setResponse({message: "Journey status updated !", journey: journeyResponse}, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};

/**
 * Creates a journey resposne by populating the details
 * of the kit and other dependant docs
 * @param {Models.Journey} journey 
 * @returns {Object}
 */
const getJourneyResponse = async (journey) => {
  const kit = await saplingKitService.find(journey.kit_id);
  const provider = await centerService.find(journey.provider_id);
  const plant = await plantService.find(kit.plant_id);
  const addons = [];
  for(let addonId of kit.addons) {
    let addon = await addonService.find(addonId);
    addons.push(addon);
  }
  return {
    _id: journey._id,
    user_id: journey.user_id,
    provider: {
      _id: provider._id,
      name: provider.name,
      location: provider.location,
      address: provider.address,
      type: provider.type,
      active: provider.active,
      createdDate: provider.createdDate,
      updatedAt: provider.updatedAt,
    },
    kit: {
      _id: kit._id,
      name: kit.name,
      preperation_instructions: kit.preperation_instructions,
      journey_instructions: kit.journey_instructions,
      addons,
      level: kit.level,
      createdDate: kit.createdDate,
      updatedAt: kit.updatedAt,
      plant,
    },
    quantity: journey.quantity,
    status: journey.status,
    level: journey.level,
    milestones: journey.milestones,
    contribution: journey.contribution,
    createdDate: journey.createdDate,
    updatedAt: journey.updatedAt,
  }
}



export const addMilestone = async(request, response) => {
  try{
    let journey = await JourneyService.findUserJourney(request.params.id, request.user._id);
    if(!journey) {
      NotFound("Journey not found ! ");
    }
    const requestData = {...request.body, file: request.file};
    const milestoneData  = validateSchema(validators.journey.createMilestoneSchema, requestData);
    // Upload file
    const logoUrl = await getLogoURL(milestoneData);
    const milestoneDetails  = {comment: milestoneData.comment, url: logoUrl};
    journey.milestones.push(milestoneDetails);
    await journey.save()
    setResponse({message: "Milestone created successfully !", milestone: milestoneDetails}, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
}