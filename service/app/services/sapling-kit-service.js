import Models from "../models/index.js";
import genericService from "./generic-service.js";

/**
 * Filters based on params and retrieves all saplingkits
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

  const saplingkits = await Models.SaplingKit.find(queryParams).exec();
  return saplingkits;
};

const checkUnique = async (name, level, plantId) => {
  const saplingkit = await Models.SaplingKit.findOne({name, level, plant_id: plantId}).exec();
  return saplingkit;
}



export default {
  ...genericService(Models.SaplingKit),
  filter,
  checkUnique,
}