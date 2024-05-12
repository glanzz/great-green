import Models from "../models/index.js";
import genericService from "./generic-service.js";

/**
 * Filters based on params and retrieves all addons
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

  const addons = await Models.Addon.find(queryParams).exec();
  return addons;
}

export const get = async (id) => {
  const addon = await Models.Addon.findById(id).exec();
  return addon;
}


export default {
  ...genericService(Models.Addon),
  filter,
  get,
}