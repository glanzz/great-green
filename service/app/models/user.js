import { GENDER } from "./enums/index.js";
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserBadge = new mongoose.Schema({
  badge_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
},{
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  locationX: {
    type: Number,
    required: true,
  },
  locationY: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: GENDER.getValues(),
    required: true,
  },
  badges: [UserBadge]
}, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});


User.plugin(passportLocalMongoose);
const UserModel = mongoose.model("User", User);


export default UserModel;
