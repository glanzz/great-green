import mongoose from "mongoose";

// Rewardable badges
const Badge = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
}, {
  timestamps: {
    createdAt: 'createdDate',
    updatedAt: 'updatedAt'
  }
});



const BadgeModel = mongoose.model("Badge", Badge);


export default BadgeModel;
