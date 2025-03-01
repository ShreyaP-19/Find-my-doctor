const express = require("express");
const Hospital = require("../model/Hospital"); // Import the Hospital model
const Doctor = require("../model/Doctor"); // Import the Doctor model
const AppointmentHistory = require("../model/AppointmentHistory"); // Import the AppointmentHistory model
const router = express.Router();

// GET doctors with filtering
router.get("/doctors", async (req, res) => {
  try {
    const { specialization, hospital, experience } = req.query;

    // Create a filter object dynamically based on provided query params
    let filter = {};

    if (specialization) {
      filter.specialization = specialization;
    }
    if (hospital) {
      filter.hospital = hospital;
    }
    if (experience) {
      filter.experience = { $gte: parseInt(experience) }; // Minimum years of experience
    }

    // Fetch doctors based on filters and populate hospital details
    const doctors = await Doctor.find(filter).populate("hospital", "name location");

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found" });
    }

    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: "Error fetching doctors" });
  }
});

//Add doctor
router.post("/adddoctor", async (req, res) => {
  try {
    const { name, specialization,location,qualification, year, hospital,fee } = req.body;

    // Check if the hospital exists
    const hospitalExists = await Hospital.findOne({ name: hospital })
    if (!hospitalExists) {
      return res.status(400).json({ message: "Hospital does not exist" });
    }

    // Create a new doctor
    const newDoctor = new Doctor({
      name,
      specialization,
      location,
      qualification,
      year,
      fee,
      hospital: hospitalExists._id,
    });

    // Save the doctor to the database
    await newDoctor.save();

    res.json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: "Error adding doctor",error});
  }
});

module.exports = router;
