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
  const [hoveredDoctor, setHoveredDoctor] = useState(null);

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

  //  const handleIconClick = (id,name) => {
  //   const confirmDelete = window.confirm(`Are you sure you want to delete the department ${name}?`);
  //   if (confirmDelete) {
  //     console.log(`Deleting Department ${name}`);
  //     axios
  //     .delete(`http://localhost:5000/hospital/delete-department/${id}`)
  //     .then((response) => {
  //       console.log(`Department ${name} deleted successfully!`, response.data);
  //       // Remove the deleted doctor from the state
  //       setDepartments((prevDepartments) => prevDepartments.filter((dept) => dept._id !== id));
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting doctor:", error);
  //       alert("Failed to delete doctor. Please try again.");
  //     });
  //     // Add delete logic here
  //   } else {
  //     console.log("Deletion canceled");
  //   }
  // };

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
              departments.map((dept) => <li key={dept._id} id="li" onClick={()=>navigate('/DeptList', { state: { dept } })} 
              onMouseEnter={() => setHoveredDoctor(dept._id)}
              onMouseLeave={() => setHoveredDoctor(null)}
              style={{ position: "relative" }} 
              >{dept.name}
              {hoveredDoctor===dept._id && (<i className="fa-solid fa-trash" id="hover-icon" style={{top:"10px"}}
              onClick={()=>handleIconClick(dept._id,dept.name)}
              />)}
              </li>)
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
