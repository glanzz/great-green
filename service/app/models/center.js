import mongoose from "mongoose";
import {CENTER_TYPE, POINT} from "./enums/index.js"

const CenterKit  = new mongoose.Schema({
  kit_id: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  count: {
    type: Number,
    required: true
  }
});

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: [POINT],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});


// Location of UN Office / Affiliation Center
const Center = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    index: '2dsphere',
    type: pointSchema,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: CENTER_TYPE.getValues(),
    required: true,
  },
  active: {
    type: Boolean,
    default: 0,
    required: true
  },
  kits: [CenterKit]
}, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});



const CenterModel = mongoose.model("Center", Center);


export default CenterModel;
