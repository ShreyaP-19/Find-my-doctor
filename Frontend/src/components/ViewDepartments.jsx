import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from './DoctorHeader';
import HomeFooter from './HomeFooter';
import './viewdepartment.css';
import { useAuth } from './AuthContext';
import SignIn from './SignIn';
import DoctorBody from './DoctorBody';
import DeptList from './DeptList';

function ViewDepartments() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const { isAuthenticated,userData } = useAuth(); // Add this inside the component
  const hospitalId = userData?.hospitalId; // Get hospital ID

   useEffect(() => {
      if (hospitalId) {
        fetchDepartments(hospitalId);
      }
    }, [hospitalId]); // Fetch departments when hospitalId is available



  const fetchDepartments = async (id) => {
     axios
       .get(`http://localhost:5000/hospital/departments/${id}`)
       .then((response) => {
         setDepartments(response.data);
       })
       .catch((error) => console.error('Error fetching departments:', error));
   };

  return (
    <div>
      {isAuthenticated ? (
        <div>
      <DoctorHeader />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

      <div id="back-button" style={{fontSize:"20px"}}onClick={()=>navigate('/DoctorBody')}>
        <button style={{backgroundColor:"white",border:"1px solid #165e98",borderRadius:"3px",color:"#165e98"}}>Prev</button>
      </div>
      <div style={{marginTop:"100px"}}></div>
      
      <div id="main-container">
        <div id="existing">
          <h2>Existing Departments</h2>
          <ul id="ul">
            {departments.length > 0 ? (
              departments.map((dept) => <li key={dept._id} id="li" onClick={()=>navigate('/DeptList', { state: { dept } })}>{dept.name}</li>)
            ) : (
              <p style={{textAlign:"center"}}>No departments available</p>
            )}
          </ul>
        </div>
      </div>
      <div style={{height:"62px"}}></div>
      <HomeFooter />
    </div>):(<div><SignIn /></div>)}
    <Routes>
      <Route path='/DeptList' element={<DeptList/>}/>
      <Route path='/DoctorBody' element={<DoctorBody/>}/>
    </Routes>
    </div>
  );
}

export default ViewDepartments;
