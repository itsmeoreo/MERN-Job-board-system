import Company from "../models/companyModels.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import validators from "../validators/credentialsValidator.js";
import Job from "../models/jobModel.js";
import Application from "../models/applicationModel.js";

const secretKey= process.env.JWT_SECRET_KEY;

const register= async( req, res )=> {
  try {
    const companyData= { ...req.body }
    const duplicateCompany= await Company.findOne({company_name: companyData.company_name})
    if (duplicateCompany) {
      const duplicateEmployeeId= await duplicateCompany.recruiter_employee_id=== companyData.recruiter_employee_id;
      const duplicateEmployeeEmail= await duplicateCompany.recruiter_email=== companyData.recruiter_email;
      const duplicateEmployeePhoneNumber= await duplicateCompany.recruiter_phone_number=== companyData.recruiter_phone_number;
      switch (true) {
        case duplicateEmployeeId:
          return res.status(400).json({invalid_credentials: "Employee Id already registered"})
        case duplicateEmployeeEmail:
          return res.status(400).json({invalid_credentials: `This email is already registered with ${companyData.company_name}`})
        case duplicateEmployeePhoneNumber:
          return res.status(400).json({invalid_credentials: `This phone number is already registered with ${companyData.company_name}`})
      }
      try {
        if(validators.validateName(companyData.recruiter_name) &&
          validators.validateEmail(companyData.recruiter_email))
        {
          const company= await Company.findOneAndUpdate({company_name: companyData.company_name},
            {
              company_name: companyData.company_name,
              username: null,
              recruiter_employee_id: companyData.recruiter_employee_id,
              recruiter_name: companyData.recruiter_name,
              recruiter_email: companyData.recruiter_email,
              recruiter_phone_number: companyData.recruiter_phone_number,
              password: null
            })
            res.status(200).json({Success: `Change of Controll for ${companyData.company_name}'s Redtie account request sent, account controll will be transfred after the background check, you will receive all the further informations via mail`})
        }
        else {
          res.status(400).json({invalid_credentials: "Invalid Credentials"})
        }
      } catch (error) {
        res.status(400).json({error: error.message})
      }
    }
    else {
      const company= await Company.create({
        company_name: companyData.company_name,
        recruiter_employee_id: companyData.recruiter_employee_id,
        recruiter_name: companyData.recruiter_name,
        recruiter_email: companyData.recruiter_email,
        recruiter_phone_number: companyData.recruiter_phone_number
      })
      res.status(200).json({Success: `request sent, account will be activated after the background check, you will receive all the further informations via mail`})
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const login= async( req, res )=> {
  try {
    const { username, password }= req.body;
    const company= await Company.findOne({ username })
    if(company) {
      const verifyPassword= await bcrypt.compare( password, company.password )
      if(verifyPassword) {
        const token= jwt.sign({company_name: company.company_name}, secretKey)
        res.cookie("token", token)
        res.status(200).json({Success: "Login successful", token})
      }
      else {
        res.status(400).json({invalid_credentials: "Invalid password"})
      }
    }
    else {
      return res.status(400).json({invalid_credentials: "Invalid username"})
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getUser = async (req, res)=> {
  try{
    const company= await Company.findOne({company_name: req.user.company_name})
    res.status(200).json(company)
  }
  catch(error){
    res.status(400).json({error: error.message})
  }
}

const newJob= async ( req, res )=> {
  const jobData= { ...req.body }
  const company= await Company.findOne({username: req.user.username})
  if(company){
    const job= await Job.create({
      position: jobData.position,
      location: jobData.location,
      experience: jobData.experience,
      company_or_provider: company._id,
      job_description: jobData.job_description,
      skills_required: jobData.skills_required,
      job_responsibilities: jobData.job_responsibilities,
      start_date: Date.now(),
      end_date: jobData.end_date
    })
    res.status(200).json({success: "New job posteed successfully"})
  }
  else{
    res.status(400).json({invalid: "you are not authorised to post job"})
  }
}

export default { register, login, getUser, newJob }