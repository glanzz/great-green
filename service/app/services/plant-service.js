import Models from "../models/index.js";
import genericService from "./generic-service.js";

/**
 * Filters based on params and retrieves all plant
 * By default has filter on createdDate less than today
 * 
 */
export const filter = async (params = {}) => {
  let queryParams = {};
  if(params["keyword"]) {
    queryParams["$or"]  = [
      { "name": { $regex: new RegExp(params["keyword"], "i") } },
    ]

  }
  queryParams["createdDate"]= {
    $lt: params["endDate"] || new Date()
  }
  if(params["startDate"]) {
    queryParams["createdDate"] = {...queryParams["createdDate"], $gte: params["startDate"] };
  }

  const plants = await Models.Plant.find(queryParams).exec();
  return plants;
}


export const get = async (id) => {
  const plant = await Models.Plant.findById(id).exec();
  return plant;
}


export default {
  ...genericService(Models.Plant),
  filter,
  get,
}