import Models from "../models/index.js";
import genericService from "./generic-service.js";

/**
 * Filters based on params and retrieves all badges
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

  const badges = await Models.Badge.find(queryParams).exec();
  return badges;
}


export const getByName = async (name) => {
  const badge = await Models.Badge.findOne({name});
  return badge;
}



export default {
  ...genericService(Models.Badge),
  filter,
  getByName,
}