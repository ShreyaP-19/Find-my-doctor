import React from 'react'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
import './appointmentHistory.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import DoctorList from './DoctorList';

function AppointmentHistory() {
    const navigate=useNavigate();
    
  return (
    <div>
      <HomeHeader/>
      <div id="appointment-history">
            <h1>Appointment History</h1>
      </div>
      {/* <div id="appointment-container">
        <div id="details-doc">
          <p style={{marginTop:"13px"}}>Doctor</p>
        </div>
        <div id="details-fees">
          <p style={{marginTop:"14px"}}>Fees</p>
        </div>
        <div id="details-slot">
          <p style={{marginTop:"14px"}}>Slot</p>
        </div>
        <div id="details-status">
          <p style={{marginTop:"13px"}}>Status</p>
        </div>
      </div>
      <div id="appointment-container">
        <div id="details-doc">
          <p style={{marginTop:"13px"}}></p>
        </div>
        <div id="details-fees">
          <p style={{marginTop:"14px"}}></p>
        </div>
        <div id="details-slot">
          <p style={{marginTop:"14px"}}></p>
        </div>
        <div id="details-status">
          <p style={{marginTop:"13px"}}></p>
        </div>
      </div> 
      <div id="appointment-container">
        <div id="details-doc">
          <p style={{marginTop:"13px"}}></p>
        </div>
        <div id="details-fees">
          <p style={{marginTop:"14px"}}></p>
        </div>
        <div id="details-slot">
          <p style={{marginTop:"14px"}}></p>
        </div>
        <div id="details-status">
          <p style={{marginTop:"13px"}}></p>
        </div>
      </div>  */}
      <div id="no">No Appointments yet....</div>
      <div id="else-div">
        <button id="book-but" onClick={()=>navigate('/DoctorList')}>Explore Doctors</button>
      </div>
      <div style={{height:"63px"}}></div>
      <HomeFooter/>
      <Routes>
        <Route path='/DoctorList' element={<DoctorList/>}/>
      </Routes>
    </div>
  )
}

export default AppointmentHistory
