import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const administrator= new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

administrator.pre('save', async function(next) {
  const saltRounds= 10;
  const salt= await bcrypt.genSalt(saltRounds);
  const hashedPassword= await bcrypt.hash(this.password, salt)
  this.password= hashedPassword;
  next();
})

const Administrator= mongoose.model("administrator", administrator);

export default Administrator;