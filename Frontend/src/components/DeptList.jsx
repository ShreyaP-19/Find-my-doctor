import React, { useState,useEffect } from 'react'
import DoctorHeader from './DoctorHeader'
import HomeFooter from './HomeFooter'
import { Route, Routes, useLocation,useNavigate,Navigate } from 'react-router-dom';
import './deptList.css'
import AddDr from './AddDr';
import axios from 'axios';
import { useAuth } from './AuthContext';
import SignIn from './SignIn';

function DeptList() {
  const location = useLocation();
  const navigate=useNavigate();
  const dept = location.state?.dept;
  
  const [doctors,setDoctors]=useState([]);
  const { isAuthenticated,userData } = useAuth(); // Get user data from context
  //console.log("user data is",userData);
  //console.log("department",dept.name);

  useEffect(() => {
    if (dept && userData?.hospitalId) { 
      axios
        .get(`http://localhost:5000/hospital/doctor-hospital-admin/${userData.hospitalId}/${dept.name}`)
        .then((response) => {
          console.log(response.data);
          setDoctors(response.data);
        })
        .catch((error) => console.error("Error fetching doctors:", error));
    }
  }, [dept, userData?.hospitalId]); // ✅ Runs when dept or hospitalId changes
  

  const handleAddDoctor = () => {
    console.log("Add Doctor clicked");
    navigate('/AddDr',{ state: { dept } })
    // Implement Add Doctor functionality
  };

  const handleRemoveDoctor = () => {
    console.log("Remove Doctor clicked");
    // Implement Remove Doctor functionality
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
      <DoctorHeader/>
      <div id="but-div">
        <button id="buttonStyle" onClick={handleAddDoctor}>Add Doctor</button>
        <button id="buttonStyle" onClick={handleRemoveDoctor}>Remove Doctor</button>
      </div>
      <div id="main-container" style={{marginTop:"20px"}}>
      <div id="existing" style={{maxWidth:"40%"}}>
        <h1 id="heading" style={{marginBottom:"30px"}}>{dept ? dept.name : "No department selected"}</h1>
         <ul id="ul">
            {doctors.length > 0 ? (
              doctors.map((doctor) => <li key={doctor._id} id="li">{doctor.name}</li>)
            ) : (
              <p style={{textAlign:"center",marginBottom:"40px"}}>No doctors available</p>
            )}
          </ul>
        </div>
        </div>
        <div style={{height:"15px"}}></div>
        <HomeFooter/>
        </div>) : (<div><Navigate to="/SignIn" replace /></div>)}
      
        <Routes>
            <Route path='/AddDr' element={<AddDr/>}/>
            {/*<Route path='/SignIn' element={<SignIn/>}/>*/}
        </Routes>
    </div>
  )
}

export default DeptList
