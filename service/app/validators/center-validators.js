import * as yup from "yup";
import { CENTER_TYPE  } from "../models/enums/index.js";

export const registerCenterSchema = yup.object({
  name: yup.string().required(),
  address: yup.string().required(),
  locationX: yup.number().required(),
  locationY: yup.number().required(),
  type: yup.string().oneOf(CENTER_TYPE.getValues()).required(),
  active: yup.boolean().required(),
});

export const updateCenterSchema = yup.object({
  name: yup.string(),
  address: yup.string(),
  locationX: yup.number(),
  locationY: yup.number(),
  type: yup.string().oneOf(CENTER_TYPE.getValues()),
  active: yup.boolean(),
});

