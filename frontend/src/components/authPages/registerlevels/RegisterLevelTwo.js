import { Button } from '@mui/material'
import React from 'react'
import '../AuthPage.css'

function RegisterLevelTwo(props) {

  function HandleProfessionalDetail(event){
    props.SetProfessionalDetail(event.target.value)
  }

  return (
    <div style={{paddingBottom: "2rem"}}>
      <h1 style={{textAlign: "start", marginLeft: "4rem"}}>Professional details</h1>
      <p style={{textAlign: "start", marginLeft: "4rem"}}>You are a !?</p>
      <form>
        <div className='css-registerlevel-two-professionaldetail' style={{display: "flex", width: "100%", justifyContent: "center", gap: "1rem", marginTop: "4rem", marginBottom: "4rem"}}>
          <label>
            <div className='css-registerleveltwo-options'>
              <h2>Experienced</h2>
              <p style={{width: "15rem"}}>Have worked in an organisation before</p>
            </div>
            <input onClick={HandleProfessionalDetail} type='radio' name='professional-detail' value='experienced' required />
            <img style={{width: "15rem", height: "25rem", borderRadius: "1.5rem", marginTop: "-7rem"}} src="https://images.pexels.com/photos/3794382/pexels-photo-3794382.jpeg?auto=compress&cs=tinysrgb&w=800" alt='option-1' />
          </label>
          <label>
            <div className='css-registerleveltwo-options'>
              <h2>Fresher</h2>
              <p style={{width: "15rem"}}>Just got my degree</p>
            </div>
            <input onClick={HandleProfessionalDetail} type='radio' name='professional-detail' value='fresher' required />
            <img style={{width: "15rem", height: "25rem", borderRadius: "1.5rem", marginTop: "-6rem"}} src="https://images.pexels.com/photos/8093033/pexels-photo-8093033.jpeg?auto=compress&cs=tinysrgb&w=800" alt='option-1' />
          </label>
          <label>
          <div className='css-registerleveltwo-options'>
              <h2>Student</h2>
              <p style={{width: "15rem"}}>Still Studying</p>
            </div>
            <input onClick={HandleProfessionalDetail} type='radio' name='professional-detail' value='student' required />
            <img style={{width: "15rem", height: "25rem", borderRadius: "1.5rem", marginTop: "-6rem"}} src="https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800" alt='option-1' />
          </label>
        </div>
        <Button
          className='continue-btn-registerLevel2 registerLevel-continue-btn'
          style={{
            borderRadius: "2rem", 
            backgroundColor: "darkcyan",
            padding: ".5rem 1rem",
            color: "white"
          }} 
          color="inherit"
          onClick={props.HandleFunc}
        >
          continue
        </Button>
      </form>
    </div>
  )
}

export default RegisterLevelTwo