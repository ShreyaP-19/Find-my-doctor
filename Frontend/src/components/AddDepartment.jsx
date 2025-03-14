import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from './DoctorHeader';
import HomeFooter from './HomeFooter';
import './addDepartment.css';

function AddDepartment() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [departmentName, setDepartmentName] = useState('');

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

  const handleAddDepartment = (e) => {
    e.preventDefault();
    if (!departmentName) return;

    axios
      .post('http://localhost:5000/hospital/departments', { name: departmentName })
      .then((response) => {
        setDepartments([...departments, response.data]);
        setDepartmentName('');
      })
      .catch((error) => console.error('Error adding department:', error));
  };

  return (
    <div>
      <DoctorHeader />
      <h1 id="heading">Manage Departments</h1>
      <button id="back-button" onClick={() => navigate('/DoctorBody')}>
        <i className="fa-solid fa-circle-left"></i>
      </button>
      <div id="container">
        <div id="form-box">
          <h2>Add New Department</h2>
          <form onSubmit={handleAddDepartment}>
            <input
              type="text"
              placeholder="Enter Department Name"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              required
            />
            <button type="submit">Add Department</button>
          </form>
        </div>
        <div id="list-box">
          <h2>Existing Departments</h2>
          <ul>
            {departments.map((dept) => (
              <li key={dept._id}>{dept.name}</li>
            ))}
          </ul>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default AddDepartment;
