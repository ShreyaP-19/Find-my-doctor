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
const { userData,isAuthenticated } = useAuth();

if (!isAuthenticated) {
  return <Navigate to="/SignIn" replace />; // ✅ Redirects unauthenticated users
}

const handleDayChange = (event) => {
  const day = event.target.value;
  setAvailableDays((prevDays) => {
    const updatedDays = prevDays.includes(day) 
      ? prevDays.filter((d) => d !== day) 
      : [...prevDays, day];

    console.log("Updated availableDays:", updatedDays);  // ✅ Debugging
    return updatedDays;
  });
};

  

 const handleSave = async (event) => {
  event.preventDefault();
  const updatedData = {};
  if (doctor?.location !== loc && loc.trim() !== "") {
    updatedData.location = loc;
  }
  
  if (doctor?.qualification !== qualification && qualification.trim() !== "") {
    updatedData.qualification = qualification;
  }
  if (JSON.stringify(doctor?.availability) !== JSON.stringify(availableDays) && availableDays.length > 0) {
    updatedData.availability = availableDays;  // Prevent updating with an empty array
  }
  if (doctor?.Slots?.join(", ") !== availableSlots && availableSlots.trim() !== "") {
    updatedData.Slots = availableSlots.split(",").map((slot) => slot.trim());
  }
  if (doctor.user?.email !== email && email.trim() !== "") {
    updatedData.email = email;
  }
  
  updatedData.name=name;

  // Check if there's any data to update
  if (Object.keys(updatedData).length === 0) {
    alert("No changes made.");
    return;
  }
  console.log("Data sent is: ",updatedData);
     try {
       await axios.put(`http://localhost:5000/hospital/doctor-details/${doctor.id}`,updatedData);
  
       alert("Doctor details updated successfully!");
       navigate("/ViewDepartments");  // Redirect after saving
     } catch (error) {
       console.error("Error updating doctor:", error);
       alert("Failed to update doctor details.");
     }
   };

   const cancelEditing = () => {
    if (doctor) {
      setLocation(doctor.location || "");
      setAvailableDays(doctor.availability || []);
      setAvailableSlots(doctor.Slots ? doctor.Slots.join(", ") : "");
      setQualification(doctor.qualification || "");
      setEmail(doctor.user.email || "");
    }
    
    
  };

  const handlePrev = () => {
    navigate("/DeptList", { state: { dept: location.state?.dept } });
  };
   
  

  return (
    <div>
      <DoctorHeader />
       <div id="back-button" style={{fontSize:"20px"}}onClick={handlePrev}>
        <button style={{backgroundColor:"white",border:"1px solid #165e98",borderRadius:"3px",color:"#165e98"}}>Prev</button>
      </div> 
      <div className="edit-profile-container">
        <h1 id="edit-head" style={{marginBottom:"30px"}}>Edit Doctor Profile</h1>
        <form 
         onSubmit={handleSave} 
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
                   onClick={cancelEditing}
                  className="cancel-btn">Cancel</button>
                </div>
              </form>
      </div>
      <HomeFooter/>
      
    </div>
  )
}

export default EditDr
