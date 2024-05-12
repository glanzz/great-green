import mongoose from "mongoose";
import { YIELD_UNIT, PLANT_TYPE } from "./enums/index.js";

// Assignable Kit Plant
const Plant = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  yieldable: {
    type: Boolean,
    required: true,
  },
  unit: {
    type: String,
    enum: YIELD_UNIT.getValues(),
  },
  type: {
    type: String,
    enum: PLANT_TYPE.getValues(),
    required: true,
  }
}, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});



const PlantModel = mongoose.model("Plant", Plant);


export default PlantModel;
