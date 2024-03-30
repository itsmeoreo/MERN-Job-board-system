import React, { useEffect, useState } from 'react'
import './ForgotPassword.css'
import LandingPageAppBar from "../../navbar/Navbar.js";
import forgot_password_background from '../../../services/images/forgot_password_background.jpg'
import { TextField } from '@mui/material';
import axios from 'axios'
import { Button } from '@mui/material';
import emailjs from '@emailjs/browser'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {

  const navigate= useNavigate()

  const [user, setUser] = useState(null)
  const [sent, setSent] = useState(false)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [opt, setOpt] = useState("")
  const [alertMessage, setAlertMessage] = useState("No user found with this email")
  const [verificationCode, setVerificationCode] = useState(null)
  const [verified,setVerfied] = useState(false)

  useEffect(() => {
    if(sent && !user) setAlertMessage("No user found with this email")
    if(user) console.log(user);
    sendEmail()
  }, [user]);

  async function HandleRequest(event){
    event.preventDefault()
    if(email){
      await axios
        .get(`http://localhost:3333/administrator/single_user/${email}`)
        .then(response=>{setUser(response.data);setSent(true); console.log(response.data);})
        .catch(error=>setAlertMessage(error.message))
    }
    else{
      setAlertMessage("email field should not be empty")
    }
  }

  function sendEmail(){
    console.log(user);
    if(sent && user){
      const code= Math.floor(Math.random() * 900000 + 100000)
      setVerificationCode(code)
      console.log(code);
      const emailDetails= {
        email_to: `${email}`,
        message: `${code}`,
        to_name: user.name || user.recruiter_name
      }
      console.log(emailDetails);
      emailjs.send( "service_w6d1l1m", "template_4fb0ccd", emailDetails, "UxilKB-ZRu5wdpmqh")
      setAlertMessage(null)
    }
  }

  function HandleSubmit(){
    console.log(verificationCode);
    if(verificationCode === parseInt(opt)){
      setVerfied(true)
    }
    else{
      setAlertMessage("verfiction code does not match! try again")
      setOpt("")
    }
  }

  async function HandleReset(){
    await axios
      .put("http://localhost:3333/administrator/update_password", { email, password })
      .then(response=>alert("Pasword change successful, try logging back in"))
      .catch(error=>console.log(error))
    navigate('/login')
  }

  return (
    <div className='forgot-password' style={{backgroundImage: `url(${forgot_password_background})`}}>
      <LandingPageAppBar />
      {!verified ?
        <div className='css-forgot-password-main-container'>
          <form>
            <h2 style={{margin: "0",textAlign: "start"}}>Forgot Password !?</h2>
            <p style={{margin: "0 0 1rem 0",textAlign: "start",color: "black"}}>Let us hepl you reset your password. please enter the email synced with your redtie accound and we will send you verification code</p>
            {sent && user?
              <React.Fragment >
              <p >Please enter the otp sent to your mail :</p>
                <TextField
                  label="OTP"
                  variant="outlined"
                  required
                  value={opt}
                  onChange={(event)=>setOpt(event.target.value)}
                  style={{
                    width: "14rem",
                    backgroundColor: "white",
                    borderRadius: "1.3rem",
                  }}
                />
                <p style={{color: "rgb(255, 61, 61)"}}>{alertMessage}</p>
                <div>
                  <Button
                    type='submit'
                    onClick={HandleSubmit}
                    style={{
                      borderRadius: "1.3rem",
                      backgroundColor: "darkcyan",
                      color: "white",
                      width: "14rem"
                    }}
                  >submit</Button>
                </div>
              </React.Fragment>
            :
              <React.Fragment>
                <TextField
                  label="email linked with your account"
                  variant="outlined"
                  type="email"
                  name='email_to'
                  value={email}
                  onChange={(event)=>setEmail(event.target.value)}
                  required
                  fullWidth
                  style={{
                    backgroundColor: "white",
                    borderRadius: "1.3rem",
                  }} 
                />
                <p style={{color: "rgb(255, 61, 61)"}}>{alertMessage}</p>
                <div>
                  <Button
                    type='submit'
                    onClick={HandleRequest}
                    style={{
                      borderRadius: "1.3rem",
                      backgroundColor: "darkcyan",
                      // value={}
                      color: "white",
                      width: "14rem"
                    }}
                  >request otp</Button>
                </div>
              </React.Fragment>
            }
          </form>
        </div>
      :
        <div className='css-reset-password-main-container' style={{width: "35rem"}}>
          <h1 style={{margin: "0"}}>Reset password</h1>
          <p style={{margin: "0"}}>{password.length<7? "Password length must be atlest 8" : "valid password"}</p>
          <TextField
            label="Enter new password"
            variant="outlined"
            type="password"
            value={password}
            required
            fullWidth
            onChange={(event)=>setPassword(event.target.value)}
            style={{
              backgroundColor: "white",
              borderRadius: "1.3rem",
            }} 
          />
          <TextField
            label="Confirm password"
            variant="outlined"
            type="password"
            value={confirmPassword}
            required
            fullWidth
            onChange={(event)=>setConfirmPassword(event.target.value)}
            style={{
              backgroundColor: "white",
              borderRadius: "1.3rem",
            }} 
          />
          <p style={{color: "rgb(255, 61, 61)", textAlign: "end"}}>
            {password.length>1 && confirmPassword.length>1 ? 
              password===confirmPassword ?
                ""
              :
                "password does not match"
            : 
              ""
            }
          </p>
          <div>
            <Button
              type='submit'
              onClick={HandleReset}
              disabled={password.length>6 && password !== confirmPassword}
              style={{
                borderRadius: "1.3rem",
                backgroundColor: "darkcyan",
                color: "white",
                width: "14rem"
              }}
            >confirm</Button>
          </div>
        </div>
      }
    </div>
  )
}

export default ForgotPassword