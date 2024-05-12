import mongoose from "mongoose";
import { YIELD_UNIT, PLANT_TYPE } from "./enums/index.js";

// Store all the OTP
const Token = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  }
}, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});



const TokenModel = mongoose.model("Token", Token);


export default TokenModel;
