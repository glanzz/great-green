import validators from "../validators/index.js";
import { NotFound, validateSchema} from '../utility.js';
import { setError, setResponse } from "./response-handler.js";
import AddonService from '../services/addon-service.js';


/**
 * Lists all the Addons by default,
 * Filters basis the parameters given for keyword
 * 
 */
export const search = async (request, response) => {
  try {
    const addons = await AddonService.filter(request.query);
    setResponse(addons, response);
  } catch(error) {
    console.log(error);
    setError(error, response);
  }
}

/**
 * Register a new addon
 */
export const post = async (request, response) => {
  try{
    const requestData = {...request.body};
    const addonData  = validateSchema(validators.addon.registerAddonSchema, requestData);
    const addon = await AddonService.save(addonData);
    setResponse(addon, response);
  } catch(e) {
    setError(e, response);
  }
};

/**
 * Deletes a addon given an ID
 *
 */
export const deleteAddon = async (request, response) => {
  try {
    const addon =  await AddonService.deleteById(request.params.id);
    if (!addon) {
      NotFound("Addon not found !");
    }
    setResponse({"message": `Deleted the addon with ID:${request.params.id}`, addon}, response);
  } catch (error) {
    setError(error, response)
  }
}

/**
 * Updates the addon details
 */
export const update = async (request, response) => {
  try {
    let addon =  await AddonService.find(request.params.id);
    if (!addon) {
      NotFound("Addon not found with given ID");
    }
    const requestData = {...request.body};

    // Validate the request data
    const addonData  = validateSchema(validators.addon.updateAddonSchema, requestData);
    addon =  await AddonService.updateById(request.params.id, addonData);
    setResponse({message: "Addon data updated !", addon}, response);
  } catch (error) {
    setError(error, response)
  }
}

