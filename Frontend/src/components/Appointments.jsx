import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import "./appointments.css";

function Appointments() {
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

  const handleConfirm=()=>{
    alert("Your appointment has been confirmed!!");
    navigate('/HomeBody')
  }

  const weekDates = generateWeek(today);

  return (
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
    </div>
  );
}

export default Appointments;
