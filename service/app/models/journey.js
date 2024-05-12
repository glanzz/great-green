import { JOURNEY_STATUS, CENTER_TYPE, LEVEL, CONTRIBUTION_STATUS } from "./enums/index.js";
import mongoose from "mongoose";

// Marks the milestone in the progress of journey
const MileStone = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  comment: String,
},{
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'updatedAt'
  }
});

// Contribution back to the community for a journey towards poverty
const Contribution = new mongoose.Schema({
  status: {
    type: String,
    enum: CONTRIBUTION_STATUS.getValues(),
    default: CONTRIBUTION_STATUS.PENDING,
    required: true
  },
  value: {type: String, required: true},
},{
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'updatedAt'
  }
});

// Contribution as affiliation to help the initiative grow
const Affiliation = new mongoose.Schema({
  completed_count: {
    type: Number,
    default: 0,
    required: true
  },
  center_id: {type: mongoose.Schema.Types.ObjectId, required: true},
},{
  timestamps: {
    createdAt: 'createdOn',
    updatedAt: 'updatedAt'
  }
});

// Journey of user in GreatGreen Initiative
const Journey = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  provider_type: {
    type: String,
    enum: CENTER_TYPE.getValues(),
  },
  provider_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  kit_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: {
    type: Number,
  },
  status: {
    type: String,
    enum: JOURNEY_STATUS.getValues(),
    default: JOURNEY_STATUS.PENDING,
    required: true,
  },
  level: {
    type: String,
    enum: LEVEL.getValues(),
  },
  contribution: Contribution,
  milestones: [MileStone],
  affiliation: Affiliation,
}, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});

const JourneyModel = mongoose.model("Journey", Journey);


export default JourneyModel;
