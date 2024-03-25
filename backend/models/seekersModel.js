import mongoose from "mongoose";
import bcrypt from "bcrypt";

const seeker = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    default: "https://static.thenounproject.com/png/3237155-200.png",
  },
  resume: {
    type: String,
    required: true,
  },
  linkedin_url: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  current_location_state: {
    type: String,
    required: true
  },
  current_location_city: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
  },
  skills: {
    type: [String]
  },
  professional_detail: {
    type: String,
    required: true,
  },
  heighest_qualification: {
    type: String,
  },
  major: {
    type: String,
  },
  university: {
    type: String,
  },
  graduation_year: {
    type: Number,
  },
  education_type: {
    type: String,
  },
  current_designation: {
    type: String,
  },
  company_name: {
    type: String,
  },
  currently_inhere: {
    type: Boolean,
  },
  start_date: {
    type: String,
  },
  current_salary: {
    type: String,
  },
  hide_salary: {
    type: Boolean,
  },
  notice_period: {
    type: Number,
  },
});

seeker.pre("save", async function(next) {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const Seeker = mongoose.model("seeker", seeker);

export default Seeker;
