import React, { useEffect, useState } from 'react'
import DoctorHeader from './DoctorHeader'
import HomeFooter from './HomeFooter'
import axios from "axios";
import { useAuth } from "./AuthContext";
import { Navigate,useNavigate,Route, Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


function EditDr() {
    const navigate=useNavigate()
  // Form State Variables
  const location = useLocation();
const doctor = location.state?.doctor || {};
const [name, setName] = useState(doctor.name || "");
const [username, setUsername] = useState(doctor.user?.username || "");
const [password, setPassword] = useState(doctor.user?.username || "");
const [email, setEmail] = useState(doctor.user?.email || "");
const [qualification, setQualification] = useState(doctor.qualification || "");
const [loc, setLocation] = useState(doctor.location || "");
const [availableDays, setAvailableDays] = useState(doctor.availability || []);
const [availableSlots, setAvailableSlots] = useState(doctor.Slots ? doctor.Slots.join(", ") : "");
const handleDayChange = (event) => {
    const day = event.target.value;
    setAvailableDays((prevDays) =>
      prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
    );
  };
  

// const handleSave = async () => {
//     try {
//       await axios.put(``http://localhost:5000/doctor/doctor-details/${doctor.id}`, {
//         name,
//         email,
//         qualification,
//         location,
//         availability: availableDays,
//         Slots: availableSlots.split(", ").map(slot => slot.trim()),
//       });
  
//       alert("Doctor details updated successfully!");
//       navigate("/ViewDepartments");  // Redirect after saving
//     } catch (error) {
//       console.error("Error updating doctor:", error);
//       alert("Failed to update doctor details.");
//     }
//   };
  

  return (
    <div>
      <DoctorHeader />
      {/* <div id="back-button" style={{fontSize:"20px"}}onClick={()=>navigate('/DrBody')}>
        <button style={{backgroundColor:"white",border:"1px solid #165e98",borderRadius:"3px",color:"#165e98"}}>Prev</button>
      </div> */}
      <div className="edit-profile-container">
        <h1 id="edit-head" style={{marginBottom:"30px"}}>Edit Doctor Profile</h1>
        <form 
        // onSubmit={handleSubmit} 
        className="edit-form">
                <label id="edit-label">Name:</label>
                <input type="text" value={name} readOnly id="text-input" />
                <label id="edit-label">Username:</label>
                <input type="text" value={username} readOnly id="text-input" />
                <label id="edit-label">Password:</label>
                <input type="text" value={password} readOnly id="text-input" />
                <label id="edit-label">Email:</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} id="text-input" />
                <label id="edit-label">Qualification:</label>
                <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} id="text-input" />

                <label id="edit-label">Location:</label>
                <input type="text" value={loc} onChange={(e) => setLocation(e.target.value)} id="text-input" />

                <label id="edit-label">Available Slots:</label>
                <input type="text" value={availableSlots} onChange={(e) => setAvailableSlots(e.target.value)} id="text-input" />
                <label id="edit-label">Available Days:</label>
                <div className="availdays-container">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <label key={day} id="edit-label-check">
                        <input id="check-input"  type="checkbox" value={day}
                        checked={availableDays.includes(day)}
                        onChange={handleDayChange}
                        />
                        {day}
                        </label>
                    ))}
                </div>
                <div className="form-buttons">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" 
                //   onClick={cancelEditing}
                  className="cancel-btn">Cancel</button>
                </div>
              </form>
      </div>
      <HomeFooter/>
      
    </div>
  )
}

export default EditDr
