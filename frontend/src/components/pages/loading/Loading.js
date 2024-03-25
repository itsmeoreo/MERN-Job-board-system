import React from 'react'
import ReactLoading from 'react-loading'

function Loading(props) {
  return (
    <div style={props.style? props.style :{padding: "40vh 46vw"}}>
      <ReactLoading type="spin" color="darkcyan" width={100} />
    </div>
  )
}

export default Loading