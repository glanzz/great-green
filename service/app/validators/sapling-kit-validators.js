import * as yup from "yup";
import { GENDER, LEVEL  } from "../models/enums/index.js";

const instructionSchema = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  resources: yup.array().of(yup.string())
})


export const createSaplingKitSchema = yup.object({
  name: yup.string().required(),
  level: yup.string().oneOf(LEVEL.getValues()).required(),
  plant_id: yup.string().required(),
  journey_instructions: yup.array().of(instructionSchema).required(),
  preperation_instructions: yup.array().of(instructionSchema).required(),
  addons: yup.array().of(yup.string()),
  preferred_gender: yup.string().oneOf(GENDER.getValues()),
});

export const updateSaplingKitSchema = yup.object({
  name: yup.string(),
  level: yup.string().oneOf(LEVEL.getValues()),
  plant_id: yup.string(),
  journey_instructions: yup.array().of(instructionSchema),
  preperation_instructions: yup.array().of(instructionSchema),
  addons: yup.array().of(yup.string()),
  preferred_gender: yup.string().oneOf(GENDER.getValues()).nullable(),
});

