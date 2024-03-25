import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import 'dotenv/config'
import Provider from '../models/providerModels.js';
import Job from '../models/jobModel.js'
import Application from '../models/applicationModel.js';
import Company from '../models/companyModels.js';

const secretKey= process.env.JWT_SECRET_KEY;

const register= async ( req, res )=> {
  try {
    const providerData= { ...req.body }
    const duplicateUsername= Provider.findOne({username: providerData.username});
    const duplicateEmail= Provider.findOne({email: providerData.email});
    const duplicatePhoneNumber= Provider.findOne({phone_number: providerData.phone_number});
    switch (true) {
      case duplicateUsername:
        return res.status(400).json({Invalid: "username already taken"});
      case duplicateEmail:
        return res.status(400).json({Invallid: "this email already seems to have an account"})
      case duplicatePhoneNumber:
        return res.status(400).json({Invalid: "this phone number is already linked to an account"})
    }
    try {
      const provider= await Provider.create({
        username: providerData.username,
        name: providerData.name,
        linkedin_url: providerData.linkedin_url,
        email: providerData.email,
        password: providerData.password,
        phone_number: providerData.phone_number,
        current_location_state: providerData.current_location_state,
        current_location_city: providerData.current_location_city,
        gender: providerData.gender
      })
      const token= jwt.sign({username: provider.username}, secretKey);
      res.cookie("token", token, {maxAge: 86400});
      res.status(200).json({success: "User registered successfully", token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const login= async ( req, res )=> {
  try {
    const { username, password }= req.body;
    const provider= await Provider.findOne({ username });
    if (provider) {
      const verifyPassword= await bcrypt.compare(password, provider.password);
      if (verifyPassword) {
        const token= jwt.sign({ username }, secretKey);
        res.cookie("token", token, { maxAge: 86400 });
        res.status(200).json({success: "Login successful", token})
      }
      else {
        res.status(400).json({Invalid: "Invalid password"})
      }
    }
    else {
      res.status(400).json({Invalid: "Invalid username"})
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getAnyUser = async ( req, res )=> {
  try {
    const provider= await Provider.findById(req.params.id) || await Company.findById(req.params.id)
    res.status(200).json(provider)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getUser = async (req, res)=> {
  try{
    const provider= await Provider.findOne({username: req.user.username})
    res.status(200).json(provider)
  }
  catch(error){
    res.status(400).json({error: error.message})
  }
}

const updateUser= async ( req, res )=> {
  const userDate= {...req.body}
  try {
    const provider= await Provider.findOneAndUpdate({username: req.user.username}, userDate)
    if(req.file){
      await Provider.findOneAndUpdate({username: req.user.username}, {
        profile_picture: req.file.location
      })
    }
    res.status(200).json({success: "user updated successfull"})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const newJob= async ( req, res )=> {
  const jobData= { ...req.body }
  const provider= await Provider.findOne({username: req.user.username})
  if(provider){
    const job= await Job.create({
      position: jobData.position,
      location: jobData.location,
      experience: jobData.experience,
      company_or_provider: provider._id,
      job_description: jobData.job_description || null,
      skills_required: jobData.skills_required || null,
      job_responsibilities: jobData.job_responsibilities || null,
      start_date: Date.now(),
      end_date: jobData.end_date,
    })
    res.status(200).json({success: "New job posteed successfully"})
  }
  else{
    res.status(400).json({invalid: "you are not authorised to post job"})
  }
}

export default { register, login, getAnyUser, updateUser, getUser, newJob };