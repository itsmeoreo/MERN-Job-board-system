import mongoose from "mongoose";
import Job from "./jobModel.js";
import Seeker from "./seekersModel.js";

const application= new mongoose.Schema({
  job: {
    type: mongoose.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  applicant: {
    type: mongoose.Types.ObjectId,
    ref: 'Seeker',
    required: true
  },
  selected: {
    type: Boolean,
    default: null
  }
})

const Application= mongoose.model("application", application);

export default Application;



