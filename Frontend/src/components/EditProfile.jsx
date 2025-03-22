import React, { useState, useEffect } from "react";
import DoctorHeader from "./DoctorHeader";
import HomeFooter from "./HomeFooter";
import "./editProfile.css";
import axios from "axios";
import { useAuth } from "./AuthContext";

function EditProfile() {
  const { userData } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Track edit mode
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form State Variables
  const [location, setLocation] = useState("");
  const [availableDays, setAvailableDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState("");
  const [password, setPassword] = useState("");

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        if (userData?.doctorId) {
          const response = await axios.get(`http://localhost:5000/doctor/${userData.doctorId}`);
          const data = response.data;

          setDoctor(data);
          setLocation(data.location || "");
          setAvailableDays(data.availability || []);
          setAvailableSlots(data.Slots ? data.Slots.join(", ") : "");
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
        setErrorMessage("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [userData?.doctorId]);

  // Handle checkbox selection for available days
  const handleDayChange = (event) => {
    const { value, checked } = event.target;
    setAvailableDays(checked ? [...availableDays, value] : availableDays.filter((day) => day !== value));
  };

  // Enable editing mode
  const enableEditing = () => {
    setIsEditing(true);
  };

  // Cancel editing and revert to original details
  const cancelEditing = () => {
    if (doctor) {
      setLocation(doctor.location || "");
      setAvailableDays(doctor.availability || []);
      setAvailableSlots(doctor.Slots ? doctor.Slots.join(", ") : "");
    }
    setPassword(""); // Clear password field on cancel
    setIsEditing(false);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    const updatedData = {
      location,
      availability: availableDays,
      Slots: availableSlots.split(",").map((slot) => slot.trim()),
      password,
    };

    try {
      await axios.put(`http://localhost:5000/doctor/${userData.doctorId}`, updatedData);
      setSuccessMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div>
      <DoctorHeader />
      <div className="edit-profile-container">
        <h1 id="edit-head">Doctor Profile</h1>

        {loading ? (
          <p>Loading doctor details...</p>
        ) : doctor ? (
          <div>
            {/* Success & Error Messages */}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {errorMessage && <p className="error-message">{errorMessage}</p>}

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
                  <p><strong>Password:</strong> {doctor.user.password}</p>
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
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter your clinic/hospital location"
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
                  onChange={(e) => setAvailableSlots(e.target.value)}
                  placeholder="e.g., 10:00 AM - 12:00 PM, 3:00 PM - 5:00 PM"
                  required
                  disabled={!isEditing}
                />

                <label id="edit-label">Change Password:</label>
                <input
                  id="password-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  disabled={!isEditing}
                />

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
