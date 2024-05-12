import Models from "../models/index.js";
import genericService from "./generic-service.js";



export const getByEmail = async (email) => {
  const token = await Models.Token.findOne({email});
  return token;
}



export default {
  ...genericService(Models.Token),
  getByEmail,
}