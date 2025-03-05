import React from 'react'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
import './appointmentHistory.css'
import { useLocation } from 'react-router-dom';
import DoctorList from './DoctorList';

function AppointmentHistory() {
    const location = useLocation();
    const doctor = location.state?.doctor;
    
  return (
    <div>
      <HomeHeader/>
      <div id="appointment-history">
            <h1>Appointment History</h1>
      </div>
      <div id="appointment-container">
            <div id="details">
                <h2 style={{marginTop:"20px"}}>Doctor Name</h2>
                <p>Hospital:</p>
                <p>Fee:</p>
                <p>Slot booked:</p>
            </div>
            {/* <div id="details">

            </div>
            <div id="details">

            </div>
            <div id="details">

            </div> */}
            </div>
      <HomeFooter/>
    </div>
  )
}

export default AppointmentHistory
