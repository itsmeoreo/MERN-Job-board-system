import React from 'react'
import landing_page_header from '../../services/images/landing_page_header.jpg'
import SearchFieldLandingPage from '../searchFields/SearchFieldLandingPage'

function HeaderLandingPage() {
  return (
    <div style={{backgroundImage: `url(${landing_page_header})`, backgroundRepeat: "no-repeat", backgroundPosition: "absolute", backgroundSize: "cover", paddingTop: "12%", paddingBottom: "15%"}}>
      <h1 style={{textAlign: "center", color: "white", letterSpacing: "1.3rem"}}>WE GET YOU HIRED</h1>
      <SearchFieldLandingPage />
    </div>
  )
}

export default HeaderLandingPage