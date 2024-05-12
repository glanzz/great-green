import validators from "../validators/index.js";
import { NotFound, validateSchema} from '../utility.js';
import { setError, setResponse } from "./response-handler.js";
import PlantService from '../services/plant-service.js';


/**
 * Lists all the Plants by default,
 * Filters basis the parameters given for keyword
 * 
 */
export const search = async (request, response) => {
  try {
    const plants = await PlantService.filter(request.query);
    setResponse(plants, response);
  } catch(error) {
    console.log(error);
    setError(error, response);
  }
}

/**
 * Register a new plant
 */
export const post = async (request, response) => {
  try{
    const requestData = {...request.body};
    const plantData  = validateSchema(validators.plant.registerPlantSchema, requestData);
    if (plantData.yieldable == false) {
      plantData.unit = null;
    }
    const plant = await PlantService.save(plantData);
    setResponse(plant, response);
  } catch(e) {
    setError(e, response);
  }
};

/**
 * Deletes a plant given an ID
 *
 */
export const deletePlant = async (request, response) => {
  try {
    const plant =  await PlantService.deleteById(request.params.id);
    if (!plant) {
      NotFound("Plant not found !");
    }
    setResponse({"message": `Deleted the plant with ID:${request.params.id}`, plant}, response);
  } catch (error) {
    setError(error, response)
  }
}

/**
 * Updates the plant details
 */
export const update = async (request, response) => {
  try {
    let plant =  await PlantService.find(request.params.id);
    if (!plant) {
      NotFound("Plant not found with given ID");
    }
    const requestData = {...request.body};

    // Validate the request data
    const plantData  = validateSchema(validators.plant.updatePlantSchema, requestData);
    if (plantData.yieldable == false) {
      plantData.unit = null;
    }
    plant =  await PlantService.updateById(request.params.id, plantData);
    setResponse({message: "Plant data updated !", plant}, response);
  } catch (error) {
    setError(error, response)
  }
}

