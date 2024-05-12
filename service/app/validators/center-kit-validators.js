import { isValidObjectId } from "mongoose";
import * as yup from "yup";

export const registerCenterKitSchema = yup.object({
  kit_id: yup.string().required().test(
    "is-valid-object-id",
    "Kit ID is not a valid Object ID",
    value => value && isValidObjectId(value)
  ),
  count: yup.number().required().min(1).positive(),
});

export const updateCenterKitSchema = yup.object({
  count: yup.number().required().min(1).positive(),
});

