import * as yup from "yup";
import { ADDON_TYPE  } from "../models/enums/index.js";

export const registerAddonSchema = yup.object({
  name: yup.string().required(),
  type: yup.string().oneOf(ADDON_TYPE.getValues()).required(),
});

export const updateAddonSchema = yup.object({
  name: yup.string(),
  type: yup.string().oneOf(ADDON_TYPE.getValues()),
});

