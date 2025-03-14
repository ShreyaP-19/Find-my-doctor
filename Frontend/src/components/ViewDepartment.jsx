import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from './DoctorHeader';
import HomeFooter from './HomeFooter';
import './viewDepartments.css';

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
      <h1 id="heading">View Departments</h1>
      <button id="back-button" onClick={() => navigate('/DoctorBody')}>
        <i className="fa-solid fa-circle-left"></i>
      </button>
      <div id="container">
        <div id="list-box">
          <h2>Existing Departments</h2>
          <ul>
            {departments.length > 0 ? (
              departments.map((dept) => <li key={dept._id}>{dept.name}</li>)
            ) : (
              <p>No departments available</p>
            )}
          </ul>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default ViewDepartments;
