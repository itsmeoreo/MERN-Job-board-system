import mongoose from "mongoose";

const blockedUser= new mongoose.Schema({
  username: {
    type: String
  },
  name: {
    type: String,
  },
  profile_picture: {
    type: String,
  },
  linkedin_url: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone_number: {
    type: Number,
  },
  current_location_state: {
    type: String,
  },
  current_location_city: {
    type: String,
  },
  gender: {
    type: String,
  },
  company_name: {
    type: String,
  },
  username: {
    type: String
  },
  company_logo: {
    type: String,
  },
  recruiter_employee_id: {
    type: String,
  },
  recruiter_name: {
    type: String,
  },
  recruiter_email: {
    type: String,
  },
  recruiter_phone_number: {
    type: Number,
  },
  password: {
    type: String,
  },
})

const BlockedUser= mongoose.model("blockedUser", blockedUser);

export default BlockedUser;