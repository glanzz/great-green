import * as yup from "yup";
import { YIELD_UNIT, PLANT_TYPE  } from "../models/enums/index.js";

export const registerPlantSchema = yup.object({
  name: yup.string().required(),
  type: yup.string().oneOf(PLANT_TYPE.getValues()).required(),
  unit: yup.string().when('yieldable', {
    is: true,
    then: () => yup.string()
    .required('Please provide a yield unit').oneOf(YIELD_UNIT.getValues()),
    otherwise: () => yup.string().nullable(),
 }),
  yieldable: yup.boolean().required(),
});

export const updatePlantSchema = yup.object({
  name: yup.string().required(),
  type: yup.string().oneOf(PLANT_TYPE.getValues()).required(),
  unit: yup.string().when('yieldable', {
    is: (yieldable) => yieldable && yieldable == true,
    then: () => yup.string()
    .required('Please provide a yield unit').oneOf(YIELD_UNIT.getValues()),
    otherwise: () => yup.string().nullable(),
 }),
  yieldable: yup.boolean().required(),
});

