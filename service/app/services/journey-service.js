import { CENTER_TYPE, JOURNEY_STATUS } from "../models/enums/index.js";
import Models from "../models/index.js";
import genericService from "./generic-service.js";

/**
 * Filters based on params and retrieves all journeys
 * By default has filter on createdDate less than today
 * 
 */
export const filter = async (params = {}, userId) => {
  let queryParams = {};

  queryParams["createdDate"]= {
    $lt: params["endDate"] || new Date()
  }
  if(params["startDate"]) {
    queryParams["createdDate"] = {...queryParams["createdDate"], $gte: params["startDate"] };
  }


  // Filter by status only if the status is one of the valid status
  if(params["status"]) {
    let statuses = `${params["status"]}`.split(",");
    let queryStatuses = [];
    statuses.forEach(stat => {
      if (stat && !JOURNEY_STATUS.getValues().includes(stat)) {
        queryStatuses.push(stat);
      }
    });
    queryParams["status"] = {"$in": queryStatuses};
  }

  queryParams["user_id"] = userId;

  const journeys = await Models.Journey.find(queryParams).sort({createdDate: -1}).exec();
  return journeys;
}

/**
 * Find all the journey which the affiliate serves
 * @param {Number} providerId 
 * @returns {Promise([Models.Journey])}
 */
export const findByAffiliateProvider = async (providerId) => {
  const queryParams = {
    provider_id: providerId,
    provider_type: CENTER_TYPE.AFFILIATION
  };
  const journeys = await Models.Journey.find(queryParams).exec();
  return journeys;
}

export const get = async (id) => {
  const journey = await Models.Journey.findById(id).exec();
  return journey;
}

/**
 * Find all the journey which the affiliate serves
 * @param {Number} providerId 
 * @returns {Promise(Models.Journey)}
 */
const findAffiliateRequest = async (providerId, requestId) => {
  const queryParams = {
    _id: requestId,
    provider_id: providerId,
    provider_type: CENTER_TYPE.AFFILIATION
  };
  const journey = await Models.Journey.findOne(queryParams).exec();
  return journey;
}

/**
 * Find affiliator who is providing
 * @param {Number} providerId 
 * @returns {Promise(Models.Journey)}
 */
const findAffiliator = async (providerId, requestId) => {
  const queryParams = {
    affiliation: {
      center_id: providerId
    }
  };
  const journey = await Models.Journey.findOne(queryParams).exec();
  return journey;
}



/**
 * 
 * @param {String} id 
 * @returns {Promise}
 */
const findExistingOngoingJourney = async (id) => {
  const journey = await Models.Journey.findOne({
    user_id: id,
    status: {
      $in: [
        JOURNEY_STATUS.PENDING,
        JOURNEY_STATUS.PICKUP_READY,
        JOURNEY_STATUS.IN_PROGRESS
      ]
    }
  }).exec();
  return journey;
}

/**
 * 
 * @param {String} id 
 * @returns {Promise}
 */
const findUserJourney = async (id, userId) => {
  const journey = await Models.Journey.findOne({
    user_id: userId,
    _id: id,
  }).exec();
  return journey;
}


export default {
  ...genericService(Models.Journey),
  filter,
  get,
  findExistingOngoingJourney,
  findUserJourney,
  findByAffiliateProvider,
  findAffiliateRequest,
  findAffiliator,
}