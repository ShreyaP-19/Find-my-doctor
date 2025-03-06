import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import "./appointments.css";
import { useAuth } from "./AuthContext";
import SignIn from "./SignIn"; 
import axios from "axios";

function Appointments() {
  const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useAuth();
  const navigate=useNavigate();
  const location = useLocation();
  const doctor = location.state?.doctor;
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [filteredSlots, setfilteredSlots] = useState([]);
  const [isAvailable, setisAvailable] = useState(false);
 

  // Generate weekdays (Monday to Friday)
  const generateWeek = (startDate) => {
    const week = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate); //new date object ,ie,it makes a copy of startDate
      date.setDate(startDate.getDate() + i); //if startDate is March 3rd, 2025, getDate() returns 3 then increment
      week.push(date);
    }
    return week;
  };

  const checkAvailability = (date) => {
    const day = date.toLocaleDateString("en-US", { weekday: "long" }); // Extracts "Monday", "Tuesday", etc.
    return doctor.availability.includes(day); // Returns true if available
  };

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date); //set the date in the button 
   // setSelectedDate(new Date(date.getTime()));

    const available = checkAvailability(date); //vailability of dr
    setisAvailable(available);
    if (available) {
      setfilteredSlots(doctor.timeSlots); // Show time slots if available
    }
    console.log("Selected Date:", date.toDateString());
    console.log("Doctor available on this day?", available);
  };

  const handleTimeClick = (time) => {
    setSelectedTime(time); //selected time from button
    console.log(time.start)
  };

  const handleConfirm=async ()=>{

    console.log("Appointment confirmed for", selectedDate);
    
    //alert("Your appointment has been confirmed!!");
    // Convert selectedDate to a full DateTime object
 // const selectedDateTime = new Date(selectedDate);
  const selectedDateTime = new Date(selectedDate?.getTime());
  console.log(isNaN(selectedDateTime.getTime())); // Output: false (if valid)
  if (!selectedTime || !selectedTime.start) {
    console.error("selectedTime is undefined or missing 'start' property:", selectedTime);
    alert("Please select a valid time slot.");
    return;
}

console.log(selectedTime.start);
const timeMatch = selectedTime.start.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/); // Extract hours, minutes, and AM/PM
let [_, hours, minutes, period] = timeMatch;
hours = Number(hours);
minutes = Number(minutes);
if (period === "PM" && hours !== 12) {
  hours += 12;
} else if (period === "AM" && hours === 12) {
  hours = 0;
}
console.log("Final selectedDateTime:", selectedDateTime.toISOString());
  //const [hours, minutes] = selectedTime.start.split(":").map(Number); // Extract hours and minutes
  selectedDateTime.setHours(hours, minutes, 0, 0); // Set hours and minutes
  console.log(selectedDateTime instanceof Date);  // Output: true
  
  console.log(typeof(selectedDateTime));
  console.log("Doctor:", doctor.name ,"doctor id is ", doctor._id) ;
  console.log("user details :",userData);


  const requestBody = {
    patientId: userData?._id, // Ensure userData contains patient ID
    doctor: doctor?._id, // Ensure doctor ID exists
    hospital: doctor?.hospital?._id, // Ensure hospital ID exists
    appointmentDateTime: selectedDateTime.toISOString(), // Send in ISO format
  };
 // appointment data to send and store in backend

  try {
    const response = await axios.post("http://localhost:5000/doctor/bookappointment", requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Appointment booked successfully:", response.data);
    alert("Your appointment has been confirmed!");
    navigate("/HomeBody");

  } catch (error) {
    console.error("Error booking appointment:", error.response?.data || error.message);
    alert("Failed to book appointment. Please try again.");
  }
};
    
  

  const weekDates = generateWeek(today);

  return (
    <div>
    {isAuthenticated ?
    <div>
      <HomeHeader />
      <h2 id="bookAppmt">Book an Appointment</h2>
      
      <div id="container">
        {doctor  && ( //if doc not null/undefined/false
          <div id="doc">
            <h2 style={{marginBottom:"10px"}}>{doctor.name}</h2>
            <p><strong>Specialty:</strong> {doctor.specialization}</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Location:</strong> {doctor.location}</p>
            <p><strong>Hospital:</strong> {doctor.hospital?.name}</p>
            <p><strong>Fee:</strong> {doctor.fee}</p>
            <p><strong>Available Days:</strong> {doctor.availability.join(", ")}</p>
           {/* <p><strong>Available :</strong>{doctor.Slots.join(", ")}</p>*/}
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div id="dateSelect">
        {weekDates.map((date) => ( //loops over each date in weekDates
          <button
            key={date.toDateString()} //React requires a unique key when rendering lists.
            onClick={() => handleDateClick(date)}
            style={{
              padding: "10px 15px",
              border: "1px solid #165e98",
              backgroundColor: selectedDate?.toDateString() === date.toDateString() ? "#165e98" : "white",//If selectedDate matches the date of this button Background = Blue (#165e98)
              // Text color = White
              color: selectedDate?.toDateString() === date.toDateString() ? "white" : "#165e98",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })} 
            {/* Tue, Mar 4 */}
          </button>
        ))}
      </div>

      {/* Selected Date and Time Slots */}
      {selectedDate && (  //Checks if selectedDate is not null or undefined
        <div id="selectedDate">
          <h3>Selected Date: {selectedDate.toDateString()}</h3>
          {isAvailable ? (
            <div id="timeselect">
              {filteredSlots.map((slot) => ( //Loops through filteredSlots, which contains the available time slots for the selected date
                <button key={slot._id} onClick={() => handleTimeClick(slot)} className="timeslot" 
                  style={{padding: "10px 15px",
                  border: "1px solid #165e98",
                  backgroundColor: selectedTime?._id === slot._id ? "#165e98" : "white",
                  color: selectedTime?._id === slot._id ? "white" : "#165e98",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",}}>
                  {slot.start}
                </button>
              ))}
            </div>
          ) : (
            <p style={{ color: "red", fontWeight: "bold" }}>Doctor not available on this day.</p>
          )}
        </div>
      )}
        <div id="confirmBut">
          {selectedDate && selectedTime && (<button id="confirm" onClick={handleConfirm}>Confirm</button>)}
      </div>
      <HomeFooter />
    </div>:<div><SignIn/></div>}
    <Routes>
        <Route path='/SignIn' element={<SignIn/>}/>
    </Routes>
    </div>
  );
}

export default Appointments;
