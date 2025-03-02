const express = require("express");
const Hospital = require("../model/Hospital"); 
const Doctor = require("../model/Doctor"); 
const AppointmentHistory = require("../model/AppointmentHistory"); 
const router = express.Router();

// Function to split time slots into 30-minute intervals
function splitTimeSlots(slots, interval = 30) {
  const allSlots = [];

  slots.forEach(slot => {
      const [startTime, endTime] = slot.split(" - ").map(time => time.trim());
      allSlots.push(...generateTimeSlots(startTime, endTime, interval));
  });

  return allSlots;
}

function generateTimeSlots(startTime, endTime, interval) {
  const slots = [];
  let current = new Date(`1970-01-01T${convertTo24Hour(startTime)}`);
  const end = new Date(`1970-01-01T${convertTo24Hour(endTime)}`);

  while (current < end) {
      let next = new Date(current);
      next.setMinutes(current.getMinutes() + interval);

      slots.push({ start: formatTime(current), end: formatTime(next) });

      current = next;
  }
  return slots;
}

// Convert 12-hour format (AM/PM) to 24-hour format
function convertTo24Hour(time) {
  let [hour, minute = "00"] = time.match(/\d+/g); // Default to "00" if minutes are missing
  let ampm = time.includes("PM") ? "PM" : "AM";
  hour = parseInt(hour);
  if (ampm === "PM" && hour !== 12) hour += 12;
  if (ampm === "AM" && hour === 12) hour = 0;
  return `${hour.toString().padStart(2, "0")}:${minute.padStart(2, "0")}`;
}

// Format time to 12-hour format
function formatTime(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
}

// GET doctors with filtering
router.get("/doctors", async (req, res) => {
  try {
    const { specialization, hospital, experience } = req.query;

    let filter = {};
    if (specialization) filter.specialization = specialization;
    if (hospital) filter.hospital = hospital;
    if (experience) filter.year = { $gte: parseInt(experience) }; // Fixed from experience to year

    const doctors = await Doctor.find(filter).populate("hospital", "name location");

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors" });
  }
});

// Add doctor
router.post("/adddoctor", async (req, res) => {
  try {
    const { name, specialization, location, qualification, year, hospital, fee, availability } = req.body;

    // Check if the hospital exists
    const hospitalExists = await Hospital.findOne({ name: hospital });
    if (!hospitalExists) {
      return res.status(400).json({ error: `Hospital '${hospital}' not found. Please register the hospital first.` });
    }

    // Extract 'Slots' from request and split into 30-min intervals
    const slots = req.body.Slots && req.body.Slots.length > 0 ? req.body.Slots : [];
    const timeSlots = splitTimeSlots(slots);

    // Create new doctor
    const newDoctor = new Doctor({
      name,
      specialization,
      location,
      qualification,
      year,
      fee,
      hospital: hospitalExists._id,
      availability,
      timeSlots
    });

    await newDoctor.save();

    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: "Error adding doctor", details: error.message });
  }
});

module.exports = router;
