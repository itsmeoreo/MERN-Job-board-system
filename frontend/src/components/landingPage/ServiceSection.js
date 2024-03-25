import React from 'react'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

function ServiceSection() {
  return (
    <div>
      <h2>GET AHEAD WITH <b style={{color:"red"}}>R</b>ED TIE</h2>
      <p style={{ fontSize: "1rem"}}>We're serving up trusted insights and anonymous conversation, so you'll have the goods<br/> you need to succeed.</p>
      <div className='css-service-section' style={{backgroundColor: "rgba(0, 139, 139, 0.075)"}}>
        <div className='css-service-section-inline-block' style={{ width: "30rem"}}>
          <PageviewOutlinedIcon style={{ color: "darkcyan", fontSize: "15rem"}}/>
          <h3>Find and Apply Jobs</h3>
        </div>
        <div className='css-service-section-inline-block' style={{ width: "30rem"}}>
          <PeopleOutlinedIcon style={{ color: "darkcyan", fontSize: "15rem"}}/>
          <h3>Join your Work Community</h3>
        </div>
        <div className='css-service-section-inline-block' style={{ width: "30rem" }}>
          <RateReviewOutlinedIcon style={{ paddingBottom: "2.2rem", color: "darkcyan", fontSize: "13rem"}}/>
          <h3>Search Company Reviews</h3>
        </div>
      </div>
    </div>
  )
}

export default ServiceSection