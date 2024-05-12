import validators from "../validators/index.js";
import { NotFound, getPointSchema, validateSchema} from '../utility.js';
import { setError, setResponse } from "./response-handler.js";
import CenterService from '../services/center-service.js';
import { POINT } from "../models/enums/index.js";


/**
 * Lists all the Centers by default,
 * Filters basis the parameters given for keyword
 * 
 */
export const search = async (request, response) => {
  try {
    const centers = await CenterService.filter(request.query);
    setResponse(centers, response);
  } catch(error) {
    console.log(error);
    setError(error, response);
  }
}

export const updateCenter = (centerData) => {
  centerData["location"] = getPointSchema(centerData.locationX, centerData.locationY);
  delete centerData.locationX;
  delete centerData.locationY;
}

/**
 * Register a new center
 */
export const post = async (request, response) => {
  try{
    const requestData = {...request.body};
    const centerData  = validateSchema(validators.center.registerCenterSchema, requestData);
    updateCenter(centerData);

    const center = await CenterService.save(centerData);
    setResponse(center, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};

/**
 * Deletes a center given an ID
 *
 */
export const deleteCenter = async (request, response) => {
  try {
    const center =  await CenterService.deleteById(request.params.id);
    if (!center) {
      NotFound("Center not found !");
    }
    setResponse({"message": `Deleted the center with ID:${request.params.id}`, center}, response);
  } catch (error) {
    setError(error, response)
  }
}

/**
 * Updates the center details
 * Location X is longitude
 * Location Y is lattitude
 */
export const update = async (request, response) => {
  try {
    let center =  await CenterService.find(request.params.id);
    if (!center) {
      NotFound("Center not found with given ID");
    }
    const requestData = {...request.body};

    // Validate the request data
    const centerData  = validateSchema(validators.center.updateCenterSchema, requestData);

    // Update center data to include the previous points as the location data will be updated
    if (centerData.locationX == undefined) {
      centerData.locationX = center.location.coordinates[0];
    }
    if (centerData.locationY == undefined) {
      centerData.locationY = center.location.coordinates[1];
    }
    updateCenter(centerData);
    center =  await CenterService.updateById(request.params.id, centerData);
    setResponse({message: "Center data updated !", center}, response);
  } catch (error) {
    setError(error, response)
  }
}

