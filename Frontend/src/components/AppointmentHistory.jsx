import React from 'react'
import HomeHeader from './HomeHeader'
import HomeFooter from './HomeFooter'
import './appointmentHistory.css'
import { Route, Routes, useNavigate } from 'react-router-dom';
import DoctorList from './DoctorList';
import { useAuth } from "./AuthContext";
import SignIn from "./SignIn"; 
import {useEffect,useState } from "react";
import axios from "axios";

function AppointmentHistory() {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(""); // Track error messages

    const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useAuth();
    const navigate=useNavigate();
   // console.log("User Data:", userData);
    try{
      useEffect(() => {
        const fetchAppointments = async () => {
          const response = await axios.get("http://localhost:5000/doctor/history", {
            params: { patientId: userData._id },
          });
          console.log("appointment history of",response.data.patientName);
          console.log("API response:", response.data);
          setAppointments(response.data.appointments);
         // console.log("Appointments:", appointments[0]);
         // console.log(appointments.length); // Should print 1

          setError(""); // Reset error state if successful
        };
        fetchAppointments();
      }, []);
    }catch(error){
      console.error("Error fetching appointments:", error);
      if (err.response && err.response.status === 404) {
        setError("No appointments yet...."); // Set custom message
      }
    }
    useEffect(() => {
      if (appointments.length > 0) {
        console.log("Appointments:", appointments[0]); 
        console.log("Total Appointments:", appointments.length);
      }
    }, [appointments]); 
    
    
  return (
    <div>
      {isAuthenticated ? (
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
    </div>
      ) : (
        <div>
          <SignIn/>
        </div>
      )}
      <Routes>
        <Route path='/DoctorList' element={<DoctorList/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
      </Routes>
    </div>
  )
}

export default AppointmentHistory
