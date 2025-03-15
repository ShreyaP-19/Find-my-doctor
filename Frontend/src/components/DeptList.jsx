import React, { useState,useEffect } from 'react'
import DoctorHeader from './DoctorHeader'
import HomeFooter from './HomeFooter'
import { Route, Routes, useLocation,useNavigate } from 'react-router-dom';
import './deptList.css'
import AddDr from './AddDr';

function DeptList() {
  const location = useLocation();
  const navigate=useNavigate();
  const dept = location.state?.dept;
  const [doctors,setDoctors]=useState([]);

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
        <Routes>
            <Route path='/AddDr' element={<AddDr/>}/>
        </Routes>
    </div>
  )
}

export default DeptList
