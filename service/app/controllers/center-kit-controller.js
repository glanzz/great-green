import validators from '../validators/index.js';
import CenterService from '../services/center-service.js';
import { InternalServerError, NotFound, validateSchema, ValidationError } from '../utility.js';
import { setResponse, setError } from './response-handler.js';


/**
 * Get Center
 */
const getCenter = async (id) => {
  const center =  await CenterService.find(id);
  if (!center) {
    NotFound("Center not found with given ID");
  }
  return center;
}


/**
 * Add new kit to center
 */
export const post = async (request, response) => {
  try {
    const center = await getCenter(request.params.id);
    const requestData = {...request.body};
    const centerKit = await validateSchema(validators.centerKit.registerCenterKitSchema, requestData);

    if (center.kits.some(kit => kit.kit_id == centerKit.kit_id)) {
      ValidationError("Center kit already exists ! use patch to update count!");
    }
    center.kits.push(centerKit);
    center.save().then(updatedCenter => setResponse(updatedCenter, response)).catch(err => InternalServerError("Could not create a new center kit action"));
  } catch(error) {
    console.log(error);
    setError(error, response);
  }
}

/**
 * Deletes a Center kit provided an ID
 */
export const deleteCenterKit = async (request, response) => {
  try {
    const center = await getCenter(request.params.id);
    const centerKit = center.kits.id(request.params.kitId);
    if(!centerKit) {
      NotFound("Kit not found with given ID !");
    }
    center.kits.pull(request.params.kitId);
    center.save().then(() => {
      setResponse({"message": `Deleted the Center Kit with ID:${request.params.kitId}`, center_kit: centerKit}, response);
    }).catch(() => {
      InternalServerError("Could not delete Center Kit")
    });
  } catch (error) {
    console.log(error);
    setError(error, response)
  }
}

/**
 * Updates center kit count
 */
export const update = async (request, response) => {
  try {
    const center = await getCenter(request.params.id);
    const centerKit = center.kits.id(request.params.kitId);
    if(!centerKit) {
      NotFound("Kit not found with given ID !");
    }

    const requestData = {...request.body};
    const updateCenterSchema = validateSchema(validators.centerKit.updateCenterKitSchema, requestData);

    centerKit.count = updateCenterSchema.count;

    center.save().then(() => {
      setResponse({"message": `Updated the center kit with ID:${request.params.kitId}`, center_kit: centerKit}, response);
    }).catch(() => {
      InternalServerError("Could not update Center Kit")
    });

  } catch (error) {
    console.log(error);
    setError(error, response)
  }
}
