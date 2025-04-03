
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DoctorHeader from './DoctorHeader';
import HomeFooter from './HomeFooter';
import './viewdepartment.css';
import { useAuth } from './AuthContext';
import SignIn from './SignIn';
import AdminBody from './AdminBody';

function ViewHospital() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const { isAuthenticated,userData } = useAuth(); // Add this inside the component
  const hospitalId = userData?.hospitalId; // Get hospital ID
  const [hoveredDoctor, setHoveredDoctor] = useState(null); 
   useEffect(() => {
        fetchHospitals();
    }, []); // Fetch hospitals 



    const fetchHospitals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/hospital/");
        setHospitals(response.data); // Store hospitals in state
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };

const handleAddDoctor = () => {
    console.log("Add Doctor clicked");
    // console.log(userData)
    navigate('/AddHospital')
    // Implement Add Doctor functionality
  };

  const handleIconClick = (hospital) => {
    // const confirmDelete = window.confirm(`Are you sure you want to delete ${doctor.name}?`);
    // if (confirmDelete) {
    //   console.log(`Deleting Dr. ${doctor.name}`);
    //   axios
    //   .delete(`http://localhost:5000/doctor/delete-doctor/${doctor.id}`)
    //   .then((response) => {
    //     console.log(`Doctor ${doctor.name} deleted successfully!`, response.data);
    //     // Remove the deleted doctor from the state
    //     setDoctors((prevDoctors) => prevDoctors.filter((d) => d.id !== doctor.id));
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting doctor:", error);
    //     alert("Failed to delete doctor. Please try again.");
    //   });
    //   // Add delete logic here
    // } else {
    //   console.log("Deletion canceled");
    // }
    // console.log("clicked");
    // console.log("Hospital:",hospital.name)
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
      <DoctorHeader />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

      <div id="back-button" style={{fontSize:"20px"}}onClick={()=>navigate('/AdminBody')}>
        <button style={{backgroundColor:"white",border:"1px solid #165e98",borderRadius:"3px",color:"#165e98"}}>Prev</button>
      </div>
      {/* <div style={{marginTop:"100px"}}></div> */}
      <div id="but-div">
        <button id="buttonStyle" style={{marginRight:"0",marginTop:"15px"}} onClick={handleAddDoctor}>Add Hospital</button>
      </div>
      <div id="main-container">
        <div id="existing" style={{width:"40%"}}>
          <h2>Existing Hospitals</h2>
          <ul id="ul">
            {hospitals.length > 0 ? (
              hospitals.map((hospital) => <li key={hospital._id} id="li" 
              onMouseEnter={() => setHoveredDoctor(hospital._id)}
                onMouseLeave={() => setHoveredDoctor(null)}style={{ position: "relative" }} 
              // onClick={()=>navigate('/DeptList', { state: { hospital } })}
              >{hospital.name} - {hospital.location}
              {hoveredDoctor===hospital._id && (<i className="fa-solid fa-trash" id="hover-icon" style={{top:"10px"}} onClick={()=>handleIconClick(hospital)}/>)}
              </li>)
            ) : (
              <p style={{textAlign:"center"}}>No Hospital available</p>
            )}
          </ul>
        </div>
      </div>
      <div style={{height:"62px"}}></div>
      <HomeFooter />
    </div>):(<div><SignIn /></div>)}
    <Routes>
      {/* <Route path='/DeptList' element={<DeptList/>}/> */}
      <Route path='/AdminBody' element={<AdminBody/>}/>
    </Routes>
    </div>
  );
}

export default ViewHospital;
