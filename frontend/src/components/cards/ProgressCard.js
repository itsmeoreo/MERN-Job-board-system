import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './ProgressCard.css'

function ProgressCard({content, percentage}) {
  return (
    <div className='progress-card'>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem", width: "20rem"}}>
        <h2 style={{color: "darkcyan", width: "13rem", textAlign: "start"}}>{content}</h2>
        <div className='circular-progress-bar'>
          <CircularProgressbar
            value={percentage}
            strokeWidth= {15}
            text={`${percentage}%`}
            styles={buildStyles({
              pathTransitionDuration: 0.15,
              textColor: "darkcyan",
              pathColor: "darkcyan",
              trailColor: "rgb(213, 233, 233)",
            })}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressCard