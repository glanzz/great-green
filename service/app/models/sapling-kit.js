import mongoose from "mongoose";
import { GENDER, LEVEL } from "./enums/index.js";



const Instruction = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  resources: [String],
},{
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'updatedAt'
  }
});

// Sapling Kit for a journey
const SaplingKit = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: LEVEL.getValues(),
    required: true,
  },
  preperation_instructions: {
    type: [Instruction],
    required: true,
  },
  journey_instructions: {
    type: [Instruction],
    required: true,
  },
  plant_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  preferred_gender: {
    type: String,
    enum: GENDER.getValues(),
  },
  addons: [mongoose.Schema.Types.ObjectId],
}, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});



const SaplingKitModel = mongoose.model("SaplingKit", SaplingKit);


export default SaplingKitModel;
