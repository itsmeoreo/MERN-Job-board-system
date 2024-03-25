import React from 'react'
import SearchFieldLandingPage from '../searchFields/SearchFieldLandingPage'
import home_page_header from '../../services/images/home_page_header.jpg'
import './HeaderHomePage.css'

function HeaderHomePage() {
  return (
    <div className='header-home-page' style={{backgroundImage: `url(${home_page_header})`}}>
      <h1>Start Searching</h1>
      <SearchFieldLandingPage />
    </div>
  )
}

export default HeaderHomePage