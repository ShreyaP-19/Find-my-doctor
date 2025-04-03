const express = require("express");
const Hospital = require("../model/Hospital"); // Import the Hospital model
const Department=require("../model/Department");
const router = express.Router();
const User=require("../model/User");
const Appointment = require("../model/AppointmentHistory"); 
const Doctor = require("../model/Doctor");
const ImageData = require("../model/ImageData"); // Import Image Schema

router.get("/search", async (req, res) => {
    try {
      const { keyword } = req.query;
      console.log("query is ",req.query);
  
      if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
      }
  
      // Fetch hospital and department IDs matching the keyword
      const hospitals = await Hospital.find({ name: { $regex: keyword, $options: "i" } }).select("_id");
      const departments = await Department.find({ name: { $regex: keyword, $options: "i" } }).select("_id");
  
      // Search doctors by name, location, specialization, and hospital
      const doctors = await Doctor.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } }, // Match doctor name
          { location: { $regex: keyword, $options: "i" } }, // Match location
          { specialization: { $in: departments.map(d => d._id) } }, // Match department
          { hospital: { $in: hospitals.map(h => h._id) } } // Match hospital
        ]
      })
      .populate("specialization", "name") // Populate Department Name
      .populate("hospital", "name location"); // Populate Hospital Name & Location

      const filtered_doctors = doctors.map((doctor) => ({
        id: doctor._id,
        name: doctor.name,
        specialization: doctor.specialization?.name || "N/A",
        hospital: doctor.hospital?.name || "N/A",
        location: doctor.hospital?.location || "Unknown",
        qualification: doctor.qualification || "N/A", // 
        fee: doctor.fee || "Not provided",
        Slots: doctor.Slots,
        availability: doctor.availability,
        timeSlots: doctor.timeSlots
  
      }));
      console.log(filtered_doctors);
  
      res.json(filtered_doctors);
    } catch (error) {
      console.error("Error searching doctors:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });


  router.post("/upload-image", async (req, res) => {
    try {
      const { image, doctorId } = req.body; // Get data from request
  
      if (!image || !doctorId) {
        return res.status(400).json({ message: "Both image and doctorId are required" });
      }
  
      const newImage = new ImageData({
        image, // Base64 string
        doctorId
      });
  
      await newImage.save();
      res.status(201).json({ message: "Image uploaded successfully!" });
  
    } catch (error) {
      console.error("Error uploading image:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  module.exports = router; 