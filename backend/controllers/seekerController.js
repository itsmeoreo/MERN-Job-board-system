import Seeker from "../models/seekersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import validators from "../validators/credentialsValidator.js";
import Job from "../models/jobModel.js";
import Application from "../models/applicationModel.js";

const secretKey = process.env.JWT_SECRET_KEY;

const register = async (req, res) => {
  try {
    const seekerData = { ...req.body };
    const duplicateUsername = await Seeker.findOne({ username: seekerData.username });
    const duplicateEmail= await Seeker.findOne({email: seekerData.email})
    const duplicatePhoneNumber=await Seeker.findOne({phone_number: seekerData.phone_number})
    switch (true) {
      case duplicateUsername:
        return res.status(400).json({Invalid: "username already taken"})
      case duplicateEmail:
        return res.status(400).json({Invalid: "this email seems to have an account"})
      case duplicatePhoneNumber:
        return res.status(400).json({Invalid: "this phone number is already linked to an account"})
    }
    if (
      validators.validateName(seekerData.username) &&
      validators.validateEmail(seekerData.email) &&
      validators.validatePassword(seekerData.password)
    ) {
      try {
        const seeker = await Seeker.create({
          resume: req.file.location,
          linkedin_url: seekerData.linkedin_url,
          username: seekerData.username,
          name: seekerData.name,
          email: seekerData.email,
          password: seekerData.password,
          phone_number: seekerData.phone_number,
          current_location_state: seekerData.current_location_state,
          current_location_city: seekerData.current_location_city,
          gender: seekerData.gender,
          professional_detail: seekerData.professional_detail,
          heighest_qualification: seekerData.heighest_qualification,
          major: seekerData.major,
          university: seekerData.university,
          graduation_year: seekerData.graduation_year,
          education_type: seekerData.education_type,
          current_designation: seekerData.current_designation,
          company_name: seekerData.company_name,
          currently_inhere: seekerData.currently_inhere,
          start_date: seekerData.start_date,
          current_salary: seekerData.current_salary,
          hide_salary: seekerData.hide_salary,
          notice_period: seekerData.notice_period,
        });
        const token = jwt.sign({ username: seeker.username}, secretKey );
        res.cookie("token", token, { maxAge: 3600});
        res.status(200).json({ success: "Account created successfully", token });
      } catch (error) {
        res.json({ error: error.message });
      }
    } else {
      res.status(400).json({ Fail: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const seeker = await Seeker.findOne({ username });
    if (seeker) {
      const verifyPassword = await bcrypt.compare(password, seeker.password);
      if (verifyPassword) {
        const token = jwt.sign({ username }, secretKey);
        res.cookie("token", token, { maxAge: 900000 });
        res.status(200).json({ success: "Login successful", token });
      } else {
        res.status(400).json({invalid_credentials: "Invalid password !" });
      }
    } else {
      res.status(400).json({invalid_credentials: "Invalid username !" });
    }
  } catch (error) {
    res.status(400).json({invalid_credentials: error.message });
  }
};

const logout= async ( req, res )=> {
  try{
    res.clearcookie('token')
    res.status(200).json({success: "logout sucessful"})
  }
  catch(error){
    res.send(400).json({error: error.message})
  }
}

const updateUser= async ( req, res )=> {
  const userData= req.body 
  const skills= userData.skills.split(",")
  try{
    const seeker= await Seeker.findOne({username: req.user.username});
    await Seeker.findOneAndUpdate({username: req.user.username}, {
      linkedin_url: userData.linkedin_url,
      username: userData.username,
      name: userData.name,
      email: userData.email,
      phone_number: userData.phone_number,
      current_location_state: userData.current_location_state,
      current_location_city: userData.current_location_city,
      gender: userData.gender,
      skills: skills,
      professional_detail: userData.professional_detail,
      heighest_qualification: userData.heighest_qualification,
      major: userData.major,
      university: userData.university,
      graduation_year: userData.graduation_year,
      education_type: userData.education_type,
      current_designation: userData.current_designation,
      company_name: userData.company_name,
      currently_inhere: userData.currently_inhere,
      start_date: userData.start_date,
      current_salary: userData.current_salary,
      hide_salary: userData.hide_salary,
      notice_period: userData.notice_period,
    } )
    if(req.file){
      await Seeker.findOneAndUpdate({username: req.user.username}, {
        resume: req.file.location
      })
    }
    res.status(200).json({success: "user updated successfully"})
  }
  catch(error){
    res.status(400).json({error: error.message})
  }
}

const getUser = async (req, res)=> {
  try{
    const seeker= await Seeker.findOne({username: req.user.username})
    res.status(200).json(seeker)
  }
  catch(error){
    res.status(400).json({error: error.message})
  }
}

const getApplicant = async (req, res)=> {
  try{
    const applicant= await Seeker.findById(req.params.id)
    res.status(200).json(applicant)
  }
  catch(error){
    res.status(400).json({error: error.message})
  }
}

const createApplication= async ( req, res )=> {
  const user= await Seeker.findOne({username: req.user.username})
  const applied= await Application.findOne({job: req.params.job_id, applicant: user._id})
  if(!applied){
    const application= await Application.create({
      job: req.params.job_id,
      applicant: user.id
    })
    res.status(200).json({success: "application created successfully"})
  }
  else{
    res.status(400).json({applied: "You have already applied for this specific job"})
  }
}

export default { register, Login , logout, updateUser, createApplication, getUser, getApplicant };
