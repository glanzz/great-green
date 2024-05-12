import mongoose from "mongoose";
import { ADDON_TYPE } from "./enums/index.js";
// Addons for Kit
const Addon = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ADDON_TYPE.getValues(),
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});



const AddonModel = mongoose.model("Addon", Addon);


export default AddonModel;
