import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import 'dotenv/config';

const provider= new mongoose.Schema({
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
  linkedin_url: {
    type: String,
    required: true
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
})

provider.pre('save', async function( req, res ) {
  const saltRounds= 10;
  const salt= await bcrypt.genSalt(saltRounds);
  const hashedPassword= await bcrypt.hash(this.password, saltRounds);
  this.password= hashedPassword;
})

const Provider= mongoose.model("provider", provider);

export default Provider;