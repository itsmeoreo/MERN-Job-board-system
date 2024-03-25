import mongoose from "mongoose";
import Job from "./jobModel.js";

const notification= mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  sender_id: {
    type: String,
  },
  receiver_id: {
    type: String,
    required: true
  },
  job: {
    type: mongoose.Types.ObjectId,
    ref: Job
  },
  time: {
    type: Date,
    default: new Date()
  },
  seen: {
    type: Boolean,
    default: false
  }
})

const Notification= new mongoose.model("notification", notification)

export default Notification;