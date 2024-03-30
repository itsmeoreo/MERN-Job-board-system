import Company from '../models/companyModels.js';
import Provider from '../models/providerModels.js';
import Job from '../models/jobModel.js'
import Application from '../models/applicationModel.js';
import Seeker from '../models/seekersModel.js';

const getSingleJob= async ( req, res )=> {
  const job= await Job.findById(req.params.id)
  res.status(200).send(job)
}

const getAllJobsByOne= async ( req, res )=> {
  let jobs;
  const company= await Company.findOne({ username: req.params.username })
  if(company){
    jobs= await Job.find({company_or_provider: company.id})
  }
  else{
    const provider= await Provider.findOne({ username: req.params.username })
    jobs= await Job.find({company_or_provider: provider.id})
  }
  jobs!==null&&jobs!==undefined ? res.status(200).send(jobs) : res.status(200).json({Empty: `no jobs poster by ${req.params.username}`})
}
const getAllJobs= async ( req, res )=> {
  const offset = parseInt(req.query.offset) || 0; 
  const limit = parseInt(req.query.limit) || 10;

  const jobs= await Job.find().skip(offset).limit(limit)
  res.status(200).json(jobs)
}

const searchJobs= async ( req, res)=> {
  const { position, location, limit } = req.query;
  const query = {};
  console.log(query);

  if (position !== 'null') {
    query.position = position;
  }
  if (location !== 'null') {
    query.location = location;
  }
  console.log(query);
  if(limit){
    const jobs= await Job.find(query).limit(limit)
    console.log(jobs);
    res.status(200).send(jobs)
  }
  else{
    const jobs= await Job.find(query)
    console.log(jobs);
    res.status(200).send(jobs)
  }
}

const getSingleApplication= async ( req, res )=> {
  const user= await Seeker.findOne({username: req.user.username})
  const application= await Application.findOne({job: req.params.job_id,applicant: user._id})
  if(application){
    res.status(200).send(true)
  }
  else{
    res.status(200).send(false)
  }
}

const getApplications= async ( req, res )=> {
  try{
    const job= await Job.findById(req.params.job_id)
    const user= await Company.findById(job.company_or_provider) || await Provider.findById(job.company_or_provider)
    if(user.company_name === req.user.company_name || user.username === req.params.username ){
      const applications= await Application.find({job: req.params.job_id})
      applications? res.status(200).send(applications) : res.status(200).json({Empty: "No applications for this job"})
    }
    else{
      res.status(400).json({declined: "You are not authorised to view these details"})
    }
  }
  catch(error){
    res.status(400).json({error: error.message})
  }
}

const result= async ( req, res )=> {
  const job= await Job.findById(req.params.job_id)
  const user= await Company.findById(job.company_or_provider) || await Provider.findById(job.company_or_provider)
  if( (user.company_name === req.user.company_name) || (user.username === req.user.username) ){
    let selected
    if(req.params.result==="true")
      selected= true
    if(req.params.result==="false")
      selected= false
    await Application.findByIdAndUpdate(req.params.application_id, { selected })
    selected?  res.status(200).json({success: "Application selected"}) : res.status(200).json({success: "Application rejected"})
  }
  else{
    res.status(400).json({invalid: "you are not authorised to do these kinds of actions"})
  }
}

const closeJob= async ( req, res )=> {
  const job= await Job.findById(req.params.job_id)
  const user= await Company.findById(job.company_or_provider) || await Provider.findById(job.company_or_provider)
  if( (user.company_name === req.user.company_name) || (user.username === req.user.username) ){
    await Job.findByIdAndUpdate(job.id, {closed: true})
    res.status(200).json({success: "Job closed for applicants"})
  }
  else{
    res.status(400).json({ invalid: "you are not authorised to do these kinds of actions" })
  }
}

export default { getSingleJob, getAllJobsByOne, getAllJobs, searchJobs, getSingleApplication, getApplications, result, closeJob }