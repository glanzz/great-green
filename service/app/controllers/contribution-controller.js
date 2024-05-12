import validators from "../validators/index.js";
import { NotFound, ValidationError, validateSchema} from '../utility.js';
import { setError, setResponse } from "./response-handler.js";
import JourneyService from "../services/journey-service.js";
import { CONTRIBUTION_STATUS, JOURNEY_STATUS } from "../models/enums/index.js";
import { HUNGER_FREE_BADGE } from "../constants.js";
import badgeService from "../services/badge-service.js";


export const post = async (request, response) => {
  try{
    let existingJourney = await JourneyService.findUserJourney(request.params.id, request.user._id);
    if(!existingJourney) {
      NotFound("Journey not found !");
    }
    if(existingJourney.status !== JOURNEY_STATUS.COMPLETED) {
      //ValidationError("Complete the journey to contribute !")
    }

    if(existingJourney.contribution) {
      ValidationError("You have already contributed towards this journey !")
    }

    const requestData = {...request.body};
    const contributionData  = validateSchema(validators.journey.createContributionSchema, requestData);
    existingJourney =  await JourneyService.updateById(request.params.id, {contribution: contributionData});
    setResponse({message: "Thank You for your contribution !", contribution: existingJourney.contribution}, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};


export const patch = async (request, response) => {
  try{
    let existingJourney = await JourneyService.findUserJourney(request.params.id, request.user._id);
    if(!existingJourney) {
      NotFound("Journey not found !");
    }
    if(existingJourney.status !== JOURNEY_STATUS.COMPLETED) {
      ValidationError("Complete the journey to contribute !")
    }

    if(!existingJourney.contribution) {
      NotFound("No contribution found for this journey !")
    }

    if(existingJourney.contribution.status == CONTRIBUTION_STATUS.COMPLETED) {
      ValidationError("You have already contributed to this journey. Start a new journey to contribute more !");
    }

    // Assign hunger free badge
    const contributionBadge = await badgeService.getByName(HUNGER_FREE_BADGE);
    request.user.badges.push({badge_id: contributionBadge._id});
    request.user.save()

    existingJourney.contribution.status = CONTRIBUTION_STATUS.COMPLETED;
    await existingJourney.save()
    setResponse({"message": "Congratulations ! Your contribution is marked complete !", contribution: existingJourney.contribution}, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};
