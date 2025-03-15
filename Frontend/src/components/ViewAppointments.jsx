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
      <h1 id="heading" style={{marginTop:"70px"}}>View Appointments</h1>
      <button id="back-button" onClick={() => navigate('/DoctorBody')}>
        <i className="fa-solid fa-circle-left"></i>
      </button>
      <div id="main-container">
        <div id="existing">
          <h2>Appointments List</h2>
          <ul id="appoint-ul">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <li id="appoint-li" key={appointment._id}>
                  <strong> Doctor:</strong> {appointment.doctorName} | 
                  <strong> Department:</strong> {appointment.department} |
                  <strong>Patient:</strong> {appointment.patientName} | 
                  <strong> Age:</strong> {appointment.age} |
                  <strong> Date:</strong> {appointment.appointmentDate} | 
                  <strong> Time:</strong> {appointment.appointmentTime}
                </li>
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
