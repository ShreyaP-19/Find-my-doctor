import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";
import "./appointments.css";

function Appointments() {
  const location = useLocation();
  const doctor = location.state?.doctor;
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  // console.log("Doctor Data:", doctor);

  // Generate weekdays (Monday to Friday)
  const generateWeek = (startDate) => {
    const week = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      week.push(date);
    }
    return week;
  };

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date.toDateString());
  };

  
  const weekDates = generateWeek(today);

  return (
    <div>
      <HomeHeader />
      <h2 id="bookAppmt">Book an Appointment</h2>
      
      <div id="container">
        {doctor && doctor.name && (
          <div id="doc">
            <h2 style={{marginBottom:"10px"}}>{doctor.name}</h2>
            <p><strong>Specialty:</strong> {doctor.specialization}</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Location:</strong> {doctor.location}</p>
            <p><strong>Hospital:</strong> {doctor.hospital?.name}</p>
            <p><strong>Fee:</strong> {doctor.fee}</p>
            <p><strong>Available Days:</strong> {doctor.availability.join(", ")}</p>
            {/* <p><strong>Slot:</strong> {doctor.slot.start} - {doctor.slot.end}</p> */}
          </div>
        )}
      </div>

      {/* Date Selection */}
      <div id="dateSelect">
        {weekDates.map((date) => (
          <button
            key={date.toDateString()}
            onClick={() => handleDateClick(date)}
            style={{
              padding: "10px 15px",
              border: "1px solid #165e98",
              backgroundColor: selectedDate?.toDateString() === date.toDateString() ? "#165e98" : "white",
              color: selectedDate?.toDateString() === date.toDateString() ? "white" : "#165e98",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {date.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}
          </button>
        ))}
      </div>

      {/* Selected Date and Time Slots */}
      {selectedDate && (
        <div id="selectedDate">
          <h3>Selected Date: {selectedDate.toDateString()}</h3><br></br>
        </div>
      )}

      <HomeFooter />
    </div>
  );
}

export default Appointments;
