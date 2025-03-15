import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from './DoctorHeader';
import HomeFooter from './HomeFooter';
import './viewdepartment.css';

function ViewDepartments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios
      .get('http://localhost:5000/hospital/departments')
      .then((response) => {
        setDepartments(response.data);
      })
      .catch((error) => console.error('Error fetching departments:', error));
  };

  return (
    <div>
      <DoctorHeader />
      <h1 id="heading" style={{marginTop:"70px"}}>View Departments</h1>
      <button id="back-button" onClick={() => navigate('/DoctorBody')}>
        <i className="fa-solid fa-circle-left"></i>
      </button>
      <div id="main-container">
        <div id="existing">
          <h2>Existing Departments</h2>
          <ul id="ul">
            {departments.length > 0 ? (
              departments.map((dept) => <li key={dept._id} id="li">{dept.name}</li>)
            ) : (
              <p style={{textAlign:"center"}}>No departments available</p>
            )}
          </ul>
        </div>
      </div>
      <div style={{height:"62px"}}></div>
      <HomeFooter />
    </div>
  );
}

export default ViewDepartments;
