import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <Link to='/' style={{textDecoration: "none", color: "unset"}}>
      <div style={{backgroundColor: "rgb(213, 233, 233)", minHeight: "100vh", display: "flex", justifyContent: "center", textAlign: "center"}}>
        <div>
          <h1 style={{marginTop: "10rem"}}>Error: 404</h1>
          <h3>Page not found</h3>
          <p style={{textAlign: "center"}}>click anywhere on screen to go to the home page</p>
        </div>
      </div>
    </Link>
  )
}

export default ErrorPage