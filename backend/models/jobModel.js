import mongoose from "mongoose";
import Application from "./applicationModel.js";
import Company from './companyModels.js'
import Provider from './providerModels.js'

const job= new mongoose.Schema({
  position: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  company_or_provider: {
    type: mongoose.Types.ObjectId,
    ref: Company,Provider
  },
  applications: {
    type: [mongoose.Types.ObjectId],
    ref: Application
  },
  start_date: Date,
  end_date: Date,
  job_description: [String],
  skills_required: [String],
  job_responsibilities: [String],
  closed: Boolean
})

const Job= mongoose.model('job', job);

export default Job;