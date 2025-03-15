import React from 'react'
import DoctorHeader from './DoctorHeader'
import HomeFooter from './HomeFooter'
import './editProfile.css'

function EditProfile() {
  return (
    <div>
      <DoctorHeader/>
      <h1 id="edit-head">Edit Your Profile</h1>
      <HomeFooter/>
    </div>
  )
}

export default EditProfile
