import { POINT } from "../models/enums/index.js";
import Models from "../models/index.js";
import genericService from "./generic-service.js";

/**
 * Filters based on params and retrieves all centers
 * By default has filter on createdDate less than today
 * 
 */
export const filter = async (params = {}) => {
  let queryParams = {};
  if(params["keyword"]) {
    queryParams["$or"]  = [
      { "name": { $regex: new RegExp(params["keyword"], "i") } },
      { "address": { $regex: new RegExp(params["keyword"], "i") } },
    ]

  }
  queryParams["createdDate"]= {
    $lt: params["endDate"] || new Date()
  }
  if(params["startDate"]) {
    queryParams["createdDate"] = {...queryParams["createdDate"], $gte: params["startDate"] };
  }

  const centers = await Models.Center.find(queryParams).exec();
  return centers;
}

/**
 * 
 * @param {Number} x - Long
 * @param {Number} y - Lat
 * @param {Number} minDistance - Default closest
 * @param {Number} maxDistance - Default within a kilometer
 */
const findAssignableCenter = async (x, y, minDistance=0, maxDistance=1000) => {
  const params = {
    location: {
      $near: {
        $geometry: {
           type: POINT ,
           coordinates: [x,y]
        },
        $maxDistance: maxDistance,
        $minDistance: minDistance
      }
    },

  }
  const centers = await Models.Center.find(params);
  return centers;
}



export default {
  ...genericService(Models.Center),
  filter,
  findAssignableCenter,
}