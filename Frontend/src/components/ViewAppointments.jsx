import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from './DoctorHeader';
import HomeFooter from './HomeFooter';
import './viewAppointments.css';

function ViewAppointments() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = () => {
    axios
      .get('http://localhost:5000/hospital/appointments')
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => console.error('Error fetching appointments:', error));
  };

  return (
    <div>
      <DoctorHeader />
      <h1 id="heading">View Appointments</h1>
      <button id="back-button" onClick={() => navigate('/DoctorBody')}>
        <i className="fa-solid fa-circle-left"></i>
      </button>
      <div id="container">
        <div id="list-box">
          <h2>Appointments List</h2>
          <ul>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <li key={appointment._id}>
                  <strong>Patient:</strong> {appointment.patientName} | 
                  <strong> Doctor:</strong> {appointment.doctorName} | 
                  <strong> Date:</strong> {appointment.date} | 
                  <strong> Time:</strong> {appointment.time}
                </li>
              ))
            ) : (
              <p>No appointments available</p>
            )}
          </ul>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default ViewAppointments;
