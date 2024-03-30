import Administrator from "../models/administratorModels.js";
import Company from "../models/companyModels.js";
import Provider from "../models/providerModels.js"
import Seeker from "../models/seekersModel.js"
import BlockedUser from "../models/blockedUsersModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

const secretKey = process.env.JWT_ADMINISTRATOR_SECRET_KEY;

const register = async (req, res) => {
  try {
    const adminData = { ...req.body };
    const duplicate = await Administrator.findOne({
      username: adminData.username,
    });
    if (duplicate) {
      res.json({ username_taken: "This username already exists" });
      return;
    }
    try {
      const administrator = await Administrator.create({
        username: adminData.username,
        name: adminData.name,
        email: adminData.email,
        password: adminData.password,
      });
      const token = jwt.sign({ username: administrator.username }, secretKey);
      res.cookie("token", token, { maxAge: 3600 });
      res
        .status(201)
        .json({ successful: "Administrator created successfully" });
    } catch (error) {
      res.json({ error: error.message });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const administrator = await Administrator.findOne({ username });
    if (administrator) {
      const verifyPassword = await bcrypt.compare(
        password,
        administrator.password
      );
      if (verifyPassword) {
        const token = jwt.sign({ username: administrator.username }, secretKey);
        res.cookie("token", token, { maxAge: 3600 });
        res.status(201).json({ successful: "Login successfull", token });
      } else {
        res.status(400).json({ invalid: "Invalid password !" });
      }
    } else {
      res.status(400).json({ invalid: "Invalid username !" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const allVerifyRequests = async (req, res) => {
  const companies = await Company.find({ password: undefined });
  if (companies.length === 0){
    console.log("no");
    return res.status(200).json({ Empty: "No pending requests" });
  }
  else{
    console.log("yes");
    res.status(200).send(companies);
  }
};

const verifyCompany = async (req, res) => {
  try {
    let { username, password } = req.body;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
    const company = await Company.findOneAndUpdate(
      { company_name: req.params.company },
      { username, password }
    );
    if (company) {
      res
        .status(200)
        .json({
          success: `verification success, ${req.params.company} account created`,
        });
    } else {
      res
        .status(400)
        .json({
          error: `there is no such company applied in the name ${req.params.company}`,
        });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyFailedCompany= async ( req, res )=> {
  try {
    const company= await Company.findOneAndDelete({ company_name: req.params.company })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const block = async (req, res) => {
  try {
    const username= req.params.username;
    const account= await Company.findOne({username})
    if(account){
      await BlockedUser.create({
        username: account.username,
        name: account.name,
        profile_picture: account.profile_picture,
        linkedin_url: account.linkedin_url,
        email: account.email,
        phone_number: account.phone_number,
        current_location_state: account.current_location_state,
        current_location_city: account.current_location_city,
        gender: account.gender,
        company_name: account.company_name,
        company_logo: account.company_logo,
        recruiter_employee_id: account.recruiter_employee_id,
        recruiter_name: account.recruiter_name,
        recruiter_email: account.recruiter_email,
        recruiter_phone_number: account.recruiter_phone_number,
        password: account.password,
      });
      res.status(200).json({success: "Blocked Account"})
    }
    else {
      res.send(`No account found with username ${username}`)
    }
  } catch (error) {
    res.status(400).json({error: error.message})
  }
};

const getSingleUser= async ( req, res)=> {
  try {
    const user= await Seeker.findOne({email: req.params.email}) || await Provider.findOne({email: req.params.email}) || await Company.findOne({recruiter_email: req.params.email})
    res.status(200).send(user)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const changePassword= async ( req, res )=> {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  try{
    const user= await Seeker.findOneAndUpdate(
      {email: req.body.email},
      {password: hashedPassword}) 
    || await Provider.findOneAndUpdate(
      {email: req.body.email},
      {password: hashedPassword}) 
    || await Company.findOneAndUpdate(
      {recruiter_email: req.body.email},
      {password: hashedPassword})
    res.status(200).json({success: "pasword reset success"})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

export default { register, login, allVerifyRequests, verifyCompany, verifyFailedCompany, block, getSingleUser, changePassword };