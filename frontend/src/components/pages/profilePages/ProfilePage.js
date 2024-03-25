import React from 'react'
import SeekersProfilePage from './seekersProfilePage/SeekersProfilePage'
import ProvidersProfilePage from './providersProfilePage/ProvidersProfilePage'
import CompanyProfilePage from './companyProfilePage/CompanyProfilePage'
import Cookies from 'js-cookie'

function ProfilePage() {
  const user= Cookies.get('user')
  return (
    <div className='profile-page'>
      {user=== "seeker" ?
        <SeekersProfilePage />
      :
        user=== "free-lancer" ?
          <ProvidersProfilePage />
        :
          <CompanyProfilePage />}
    </div>
  )
}

export default ProfilePage