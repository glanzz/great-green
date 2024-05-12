import validators from "../validators/index.js";
import { NotFound, validateSchema, ValidationError} from '../utility.js';
import { setError, setResponse } from "./response-handler.js";
import SaplingkitService from '../services/sapling-kit-service.js';
import plantService from "../services/plant-service.js";
import addonService from "../services/addon-service.js";
import { isValidObjectId } from "mongoose";

/**
 * Lists all the Saplingkits by default,
 * Filters basis the parameters given for keyword
 * 
 */
export const search = async (request, response) => {
  try {
    const saplingkits = await SaplingkitService.filter(request.query);
    setResponse(saplingkits, response);
  } catch(error) {
    console.log(error);
    setError(error, response);
  }
}

/**
 * Register a new saplingkit
 */
export const post = async (request, response) => {
  try{
    const requestData = {...request.body};
    const saplingkitData  = validateSchema(validators.saplingKit.createSaplingKitSchema, requestData);

    const plant = await plantService.get(saplingkitData.plant_id);
    if (!plant) {
      ValidationError("Plant not found with given ID");
    }

    const existingKit = await SaplingkitService.checkUnique(saplingkitData.name, saplingkitData.level, plant._id);
    if (existingKit) {
      ValidationError("Sapling Kit exists for given data, Use patch instead !");
    }

    if(saplingkitData.addons) {
      saplingkitData.addons.forEach(addonId => {
        if (!addonService.get(addonId)) {
          ValidationError("Addon not found with ID, Please create one !");
        }
        return addonId;
      })
    }

    const saplingkit = await SaplingkitService.save(saplingkitData);
    setResponse(saplingkit, response);
  } catch(e) {
    console.log(e);
    setError(e, response);
  }
};

/**
 * Deletes a saplingkit given an ID
 *
 */
export const deleteSaplingkit = async (request, response) => {
  try {
    const saplingkit =  await SaplingkitService.deleteById(request.params.id);
    if (!saplingkit) {
      NotFound("Saplingkit not found !");
    }
    setResponse({"message": `Deleted the saplingkit with ID:${request.params.id}`, saplingkit}, response);
  } catch (error) {
    setError(error, response)
  }
}

/**
 * Updates the saplingkit details
 */
export const put = async (request, response) => {
  try {
    if (!isValidObjectId(request.params.id)) {
      ValidationError("Identifier is not a valid object ID");
    }

    let saplingkit =  await SaplingkitService.find(request.params.id);
  
    const requestData = {...request.body};

    // Validate the request data
    const saplingkitData  = validateSchema(validators.saplingKit.createSaplingKitSchema, requestData);

    const plant = await plantService.get(saplingkitData.plant_id);
    if (!plant) {
      ValidationError("Plant not found with given ID");
    }

    if (!saplingkit) {
      const existingKit = await SaplingkitService.checkUnique(saplingkitData.name, saplingkitData.level, plant._id);
      if (existingKit) {
        ValidationError("Sapling Kit exists for given data with ID:" + existingKit._id);
      }
    }
    

    if(saplingkitData.addons) {
      saplingkitData.addons.forEach(addonId => {
        if (!addonService.get(addonId)) {
          ValidationError("Addon not found with ID, Please create one !");
        }
      })
    }
    if (!saplingkit) {
      saplingkitData._id = request.params.id;
      saplingkit = await SaplingkitService.save(saplingkitData);
    } else {
      saplingkit =  await SaplingkitService.updateById(request.params.id, saplingkitData);
    }

    setResponse({message: "Saplingkit data updated !", saplingkit}, response);
  } catch (error) {
    console.log(error);
    setError(error, response)
  }
}

