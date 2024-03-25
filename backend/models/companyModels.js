import mongoose from "mongoose";
import bcrypt from "bcrypt";

const company = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    typr: String
  },
  company_logo: {
    type: String,
  },
  recruiter_employee_id: {
    type: String,
    required: true,
  },
  recruiter_name: {
    type: String,
    required: true,
  },
  recruiter_email: {
    type: String,
    required: true,
  },
  recruiter_phone_number: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

  company.pre("save", async function(next) {
    if(this.password != null){
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next()
  });

const Company = mongoose.model("company", company);

export default Company;