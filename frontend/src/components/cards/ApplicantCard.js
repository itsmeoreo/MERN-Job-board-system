import { Button } from '@mui/material'
import React from 'react'
import './ApplicantCard.css'

function ApplicantCard() {
  return (
    <div className='applicant-card'>
      <div className='css-applicant-card-header'>
          <img src="https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png" />
          <div className='css-applicant-card-main-info'>
            <h3>Applicant</h3>
            <p>fresher</p>
          </div>
      </div>
      <div className='css-applicant-card-footer'>
        <Button
          style={{
            borderRadius: "1.5rem",
          }}
        >
          view resume
        </Button>
        <Button
          style={{
            borderRadius: "1.5rem",
          }}
        >
          select
        </Button>
      </div>
    </div>
  )
}

export default ApplicantCard