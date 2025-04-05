import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import HomeFooter from "./HomeFooter";
import "./editProfile.css";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { Navigate,useNavigate,Route, Routes } from 'react-router-dom'


function EditProfile() {
  const { userData,isAuthenticated } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate=useNavigate()
  // Form State Variables
  const [location, setLocation] = useState("");
  const [availableDays, setAvailableDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 


  if (!isAuthenticated) {
    return <Navigate to="/SignIn" replace />; // ✅ Redirects unauthenticated users
  }

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        if (userData?.doctorId) {
          const response = await axios.get(`http://localhost:5000/doctor/doctor-details/${userData.doctorId}`);
          const data = response.data;

          setDoctor(data);
          setLocation(data.location || "");
          setAvailableDays(data.availability || []);
          setAvailableSlots(data.Slots ? data.Slots.join(", ") : "");
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        //setErrorMessage("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [userData?.doctorId]);

  // Handle checkbox selection for available days
  const handleDayChange = (event) => {
    const day = event.target.value;
    const weekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
    setAvailableDays((prevDays) => {
      let updatedDays;
      if (prevDays.includes(day)) {
        updatedDays = prevDays.filter((d) => d !== day);
      } else {
        updatedDays = [...prevDays, day];
      }
  
      // Sort days based on weekOrder
      updatedDays.sort((a, b) => weekOrder.indexOf(a) - weekOrder.indexOf(b));
  
      setErrorMessage(""); // Clear error
      return updatedDays;
    });
  };
  

  // Enable editing mode
  const enableEditing = () => {
    setIsEditing(true);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
  
    // Validate if `newPassword` and `confirmPassword` match
    if (newPassword && value !== newPassword) {
      setErrorMessage("Password do not match.");
    } else {
      setErrorMessage(""); // Clear error when they match
    }
  };
  
  

  // Cancel editing and revert to original details
  const cancelEditing = () => {
    if (doctor) {
      setLocation(doctor.location || "");
      setAvailableDays(doctor.availability || []);
      setAvailableSlots(doctor.Slots ? doctor.Slots.join(", ") : "");
    }
    setNewPassword(""); // Clear password field on cancel
    setCurrentPassword("")
    setConfirmPassword("")
    setIsEditing(false);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const updatedData = {};
    if (doctor?.location !== location && location.trim() !== "") {
      updatedData.location = location;
    }
    if (currentPassword && newPassword) {
      updatedData.currentPassword = currentPassword;
      updatedData.newPassword = newPassword;
    }
    if (JSON.stringify(doctor?.availability) !== JSON.stringify(availableDays) && availableDays.length > 0) {
      updatedData.availability = availableDays;  // Prevent updating with an empty array
    }
    if (doctor?.Slots?.join(", ") !== availableSlots && availableSlots.trim() !== "") {
      updatedData.Slots = availableSlots.split(",").map((slot) => slot.trim());
    }

    if (Object.keys(updatedData).length === 0) {
      setErrorMessage("No changes detected.");
      return;
    }

    console.log(updatedData);
    
    

    try {
      await axios.put(`http://localhost:5000/doctor/edit-profile/${userData.doctorId}`, updatedData);
      setSuccessMessage("Profile updated successfully!");
      alert("Profile updated successfully!");
      setIsEditing(false);
      navigate("/DrBody");
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <DoctorHeader />
      <div id="back-button" style={{fontSize:"20px"}}onClick={()=>navigate('/DrBody')}>
        <button style={{backgroundColor:"white",border:"1px solid #165e98",borderRadius:"3px",color:"#165e98"}}>Prev</button>
</div>
      <div className="edit-profile-container">
        <h1 id="edit-head">Doctor Profile</h1>

        {loading ? (
          <p>Loading doctor details...</p>
        ) : doctor ? (
          <div>
            {/* Success & Error Messages */}
            {/*successMessage && <p className="success-message">{successMessage}</p>*/}
            {/*errorMessage && <p className="error-message">{errorMessage}</p>*/}

            {/* Edit Profile Button */}
            {!isEditing && (
              <button onClick={enableEditing} className="edit-btn">Edit Profile</button>
            )}

            {/* Display Doctor Details */}
            <div className="doctor-information">
              <h2>Current Profile Information</h2>
              <p><strong>Name:</strong> {doctor.name}</p>
              <p><strong>Specialization:</strong> {doctor.specialization}</p>
              <p><strong>Qualification:</strong> {doctor.qualification}</p>
              <p><strong>Location:</strong> {doctor.location}</p>
              <p><strong>Available Days:</strong> {doctor.availability?.join(", ") || "Not set"}</p>
              <p><strong>Available Slots:</strong> {doctor.Slots?.join(", ") || "Not set"}</p>

              {/* Show user details if they exist */}
              {doctor.user && (
                <>
                  <p><strong>Username:</strong> {doctor.user.username}</p>
                  <p><strong>Email:</strong> {doctor.user.email}</p>
                  {/*<p><strong>Password:</strong> {doctor.user.password}</p>*/}
                </>
              )}
            </div>

            {/* Editable Form */}
            {isEditing && (
              <form onSubmit={handleSubmit} className="edit-form">
                <label id="edit-label">Location:</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setErrorMessage(""); // Clear error when user types
                  }}
                  placeholder="Enter your  location"
                  required
                  disabled={!isEditing} id="text-input"
                />

                <label id="edit-label">Available Days:</label>
                <div className="availdays-container">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <label id="edit-label-check" key={day}>
                      <input
                        id="check-input"
                        type="checkbox"
                        value={day}
                        checked={availableDays.includes(day)}
                        onChange={handleDayChange}
                        disabled={!isEditing}
                      />
                      {day}
                    </label>
                  ))}
                </div>

                <label id="edit-label">Available Slots:</label>
                <input
                  id="text-input"
                  type="text"
                  value={availableSlots}
                  onChange={(e) => {
                    setAvailableSlots(e.target.value);
                    setErrorMessage(""); // Clear error when user types
                  }}
                  placeholder="e.g., 10:00 AM - 12:00 PM, 3:00 PM - 5:00 PM"
                  required
                  disabled={!isEditing}
                />

                <label id="edit-label">Current Password:</label>
                <input
                  id="password-input"
                  type="text"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    setErrorMessage("");
                  }}
                  placeholder="Enter Current Password"
                  disabled={!isEditing}
                />

                <label id="edit-label">New Password:</label>
                <input
                  id="password-input"
                  type="text"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={!isEditing}
                />

                <label id="edit-label">Confirm New Password:</label>
                <input
                  id="password-input"
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm new password"
                  disabled={!isEditing}
                />
                {errorMessage && <p style={{ color: "red", fontSize: "14px" }}>{errorMessage}</p>}


                <div className="form-buttons">
                  <button type="submit" className="save-btn">Save Changes</button>
                  <button type="button" onClick={cancelEditing} className="cancel-btn">Cancel</button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <p style={{textAlign:"center",color:"red"}}>No doctor details found.</p>
        )}
      </div>
      <div style={{height:"56px"}}></div>
      <HomeFooter />
    </div>
  );
}

export default EditProfile;
