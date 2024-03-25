import React from 'react'

function ResumePage({resume}) {
  return (
    <div style={{display: "absolute", height: "100vh", width: "100vw"}}>
      <iframe src='resume' width={75} height={90} />
    </div>
  )
}

export default ResumePage