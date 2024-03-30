import { Button } from '@mui/material'
import React from 'react'
import axios from 'axios'
import './VerificationCard.css'
import { useNavigation } from 'react-router-dom'

function VerificationCard({Company, GetRequests, SetLoading}) {

  const navigate= useNavigation

  function HandleVerify(){
    axios
      .put(`http://localhost:3333/administrator/verify/${Company.company_name}/yes`,
      {
        username:Company.company_name,
        password: `${Company.recruiter_employee_id}${Company.company_name}`
      },
      {withCredentials:true})
      .then(response=>{alert("verification successful");GetRequests();SetLoading(true)})
      .catch(error=>console.log(error.response.data))
  }

  return (
    <div className='verification-card' style={{marginBottom: "2rem"}}>
      <div className='verification-card-header'>
        <img src={Company.profile_picture} />
        <h2 style={{marginLeft: "1rem"}}>{Company.company_name}</h2>
      </div>
      <div className='verification-card-body'>
        <p>Emoployee ID: {Company.recruiter_employee_id}</p>
        <p>Employee name: {Company.recruiter_name}</p>
        <p>Employee email: {Company.recruiter_email}</p>
        <p>Employee ph_no: {Company.recruiter_phone_number}</p>
      </div>
      <div className='verification-card-footer'>
        <Button
          onClick={HandleVerify}
          style={{
            borderRadius: "2rem", 
            backgroundColor: "darkcyan",
            padding: ".5rem 1rem",
            color: "white",
          }} 
        >
          Verify
        </Button>
        <Button
          style={{
            borderRadius: "2rem", 
            backgroundColor: "darkcyan",
            padding: ".5rem 1rem",
            color: "white"
          }} 
        >
          Decline
        </Button>
      </div>
    </div>
  )
}

export default VerificationCard