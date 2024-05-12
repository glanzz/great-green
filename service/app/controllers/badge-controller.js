import validators from "../validators/index.js";
import { InternalServerError, NotFound, uploadImage, validateSchema} from '../utility.js';
import { setError, setResponse } from "./response-handler.js";
import BadgeService from "../services/badge-service.js";
import fs from "fs";


/**
 * Lists all the Badges by default,
 * Filters basis the parameters given for keyword
 * 
 */
export const search = async (request, response) => {
  try {
    const badges = await BadgeService.filter(request.query);
    setResponse(badges, response);
  } catch(error) {
    console.log(error);
    setError(error, response);
  }
}

/**
 * Register a new badge
 */
export const post = async (request, response) => {
  try{
    const requestData = {...request.body, file: request.file};
    const badgeData  = validateSchema(validators.badge.createBadgeSchema, requestData);
    // Upload file
    const logoUrl = await getLogoURL(badgeData);
    const badgeDetails  = {name: badgeData.name, logo: logoUrl};
    const badge = await BadgeService.save(badgeDetails);
    setResponse(badge, response);
  } catch(e) {
    setError(e, response);
  }
};

/**
 * Deletes a badge given an ID
 *
 */
export const deleteBadge = async (request, response) => {
  try {
    const badge =  await BadgeService.deleteById(request.params.id);
    if (!badge) {
      NotFound("Badge not found !");
    }
    setResponse({"message": `Deleted the badge with ID:${request.params.id}`, badge}, response);
  } catch (error) {
    setError(error, response)
  }
}

/**
 * Updates the badge details
 */
export const update = async (request, response) => {
  try {
    let badge =  await BadgeService.find(request.params.id);
    if (!badge) {
      NotFound("Bagde not found with given ID");
    }
    const requestData = {...request.body};
    if(request.file) {
      requestData.file = request.file;
    }

    // Validate the request data
    const badgeData  = validateSchema(validators.badge.updateBadgeSchema, requestData);
    if (badgeData.file) {
      const logoUrl = await getLogoURL(badgeData);
      delete badgeData.file;
      badgeData.logo = logoUrl;
    }
    badge =  await BadgeService.updateById(request.params.id, badgeData);
    setResponse({message: "Badge data updated !", badge}, response);
  } catch (error) {
    setError(error, response)
  }
}


/**
 * Upload file and recieve the logo URL
 * @param {Object} badgeData 
 * @returns 
 */
export const getLogoURL = async (badgeData) => {
  let logoUrl;
  try {
    const data = await uploadImage(
      fs.createReadStream(badgeData.file.path),
      badgeData.file.filename,
      badgeData.file.mimetype
    );
    logoUrl = data["data"]["url"];
  } catch(err) {
    console.log(err);
    InternalServerError("Failed to upload logo");
  }
  return logoUrl;
}

