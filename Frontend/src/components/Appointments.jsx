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

  // console.log("Doctor Data:", doctor?.availableDays);

  // Function to generate time slots based on doctor's available time
  function generateTimeSlots(selectedDate, start, end) {
    let dateStr = selectedDate.toISOString().split("T")[0]; // Ensure it's YYYY-MM-DD
    let current = new Date(`${dateStr}T${start}:00`);
    let endTime = new Date(`${dateStr}T${end}:00`);
    
    let slots = [];
    while (current < endTime) {
      slots.push(current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      current.setMinutes(current.getMinutes() + 30);
    }
    return slots;
  }
  
  

  // Convert 12-hour AM/PM format to 24-hour format
  // const convertTo24Hour = (time) => {
  //   let [hours, minutes] = time.split(/[: ]/);
  //   if (time.includes("PM") && hours !== "12") {
  //     hours = String(parseInt(hours) + 12);
  //   }
  //   if (time.includes("AM") && hours === "12") {
  //     hours = "00";
  //   }
  //   return `${hours}:${minutes}:00`;
  // };

  // Format time to 12-hour format with AM/PM
  // const formatTime = (date) => {
  //   return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  // };

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

  // Check if doctor is available on the selected date
  const isDoctorAvailable = (date) => {
    if (!doctor || !doctor.availableDays) return false;
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" }).trim();
    return doctor.availableDays.some(day => day.trim().toLowerCase() === dayName.toLowerCase());
  };
  

  // Handle date selection
  const handleDateClick = (date) => {
    setSelectedDate(date);
    console.log("Selected Date:", date.toDateString());
    console.log("Doctor Available Days:", doctor.availableDays);
    console.log("Is Doctor Available?:", doctor.availableDays.includes(date.toLocaleDateString("en-US", { weekday: "long" })));
  
    if (isDoctorAvailable(date) && doctor?.slot?.start && doctor?.slot?.end) {
      setTimeSlots(generateTimeSlots(date, doctor.slot.start, doctor.slot.end));

    } else {
      setTimeSlots([]);
    }
  };

  
  const weekDates = generateWeek(today);

  return (
    <div>
      <HomeHeader />
      <h2 id="bookAppmt">Book an Appointment</h2>
      
      <div id="container">
        {doctor && (
          <div id="doc">
            <h2>{doctor.name}</h2>
            <p><strong>Specialty:</strong> {doctor.specialty}</p>
            <p><strong>Qualification:</strong> {doctor.qualification}</p>
            <p><strong>Location:</strong> {doctor.location}</p>
            <p><strong>Hospital:</strong> {doctor.hospital}</p>
            <p><strong>Fee:</strong> {doctor.fee}</p>
            <p><strong>Available Days:</strong> {doctor.availableDays.join(", ")}</p>
            <p><strong>Slot:</strong> {doctor.slot.start} - {doctor.slot.end}</p>
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
          <h3>Available Time Slots</h3>

          <div id="timeSlots">
            {timeSlots.length > 0 ? (
              timeSlots.map((slot, index) => (
                <button key={index} className="slotButton">
                  {slot.time} - {slot.endTime}
                </button>
              ))
            ) : (
              <p>No available slots</p>
            )}
          </div>
        </div>
      )}

      <HomeFooter />
    </div>
  );
}

export default Appointments;
