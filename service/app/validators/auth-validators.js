import * as yup from "yup";
import { GENDER } from "../models/enums/index.js";

export const registerUserSchema = yup.object({
  name: yup.string().required(),
  password: yup.string().required("Please enter password !")
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          'Minimum eight characters, at least one letter and one number'
        ),
  passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
  email: yup.string().email().required(),
  locationX: yup.number().required(),
  locationY: yup.number().required(),
  gender: yup.string().oneOf(GENDER.getValues()).required(),
  token: yup.string().matches(/^\d{6}$/, 'Must be a 6-digit number').required()
});


export const updateUserSchema = yup.object({
  name: yup.string(),
  password: yup.string()
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          'Minimum eight characters, at least one letter and one number'
        ),
});


export const createTokenSchema = yup.object({
  email: yup.string().email().required(),
});

