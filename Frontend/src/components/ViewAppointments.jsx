import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from './DoctorHeader';
import HomeFooter from './HomeFooter';
import './viewappointments.css';
import { useAuth } from './AuthContext';
import SignIn from './SignIn';


function ViewAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated,userData } = useAuth(); // Add this inside the component
  const hospitalId = userData?.hospitalId; // Get hospital ID
  useEffect(() => {
      if (hospitalId) {
        fetchAppointments(hospitalId);
      }
    }, [hospitalId]); // Fetch departments when hospitalId is available

  const fetchAppointments = async(id) => {
    axios
      .get(`http://localhost:5000/hospital/appointment-list/${id}`)
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => console.error('Error fetching appointments:', error));
  };

  return (
    <div>
      {isAuthenticated ? (

        <div>
      <DoctorHeader />
      {/* <h1 id="heading" style={{marginTop:"70px"}}>View Appointments</h1> */}
      <div style={{height:"60px"}}></div>
      <button id="back-button" onClick={() => navigate('/DoctorBody')}>
        <i className="fa-solid fa-circle-left"></i>
      </button>
      <div id="main-container">
        <div id="container-existing">
          <h2>Appointments List</h2>
          <ul id="appoint-ul">
          <div id="another-container" style={{marginBottom:"10px"}}>
              <div id="column-doc" style={{backgroundColor:"white",}}>
                <p id="styling-para"><strong>Doctor</strong></p>
              </div>
              <div id="column-doc"style={{backgroundColor:"white"}}>
                <p id="styling-para"><strong>Department</strong></p>
              </div>
              <div id="column-doc"style={{backgroundColor:"white"}}>
                <p id="styling-para"><strong>Patient</strong></p>
              </div>
              <div id="column-fees"style={{backgroundColor:"white"}}>
                <p id="styling-para"><strong>Age</strong></p>
              </div>
              <div id="column-date" style={{backgroundColor:"white"}}>
                <p id="styling-para"><strong>Date</strong></p>
              </div>
              <div id="column-slot" style={{backgroundColor:"white"}}>
                <p id="styling-para"><strong>Slot</strong></p>
              </div>
            </div>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div id="another-container" style={{marginBottom:"10px"}} key={appointment._id}>
                  <div id="column-doc" style={{backgroundColor:"white"}}>
                  <p id="styling-para"> {appointment.doctorName}</p>
                </div>
                <div id="column-doc" style={{backgroundColor:"white"}}>
                  <p id="styling-para"> {appointment.department}</p>
                </div>
                <div id="column-doc" style={{backgroundColor:"white"}}>
                  <p id="styling-para"> {appointment.patientName}</p>
                </div>
                <div id="column-fees" style={{backgroundColor:"white"}}>
                  <p id="styling-para"> {appointment.age}</p>
                </div>
                <div id="column-date" style={{backgroundColor:"white"}}>
                  <p id="styling-para"> {appointment.appointmentDate}</p>
                </div> 
                <div id="column-slot" style={{backgroundColor:"white"}}>
                  <p id="styling-para"> {appointment.appointmentTime}</p>
                </div> 
                  </div>
              ))
            ) : (
              <p style={{textAlign:"center"}}>No appointments available</p>
            )}
          </ul>
        </div>
      </div>
      <div style={{height:"62px"}}></div>
      <HomeFooter />
    </div>):(<div><SignIn /></div>)}
    </div>
  );
}

export default ViewAppointments;
