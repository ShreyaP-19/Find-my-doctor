const express = require("express");
const Hospital = require("../model/Hospital"); // Import the Hospital model
const router = express.Router();
// Add a hospital
//not finalized just for reference
router.post("/add", async (req, res) => {
    try {
      const { name, location } = req.body;
  
      const hospital = new Hospital({ name, location });
      await hospital.save();
  
      res.status(201).json({ message: "Hospital added successfully", hospital });
    } catch (error) {
      res.status(500).json({ error: "Error adding hospital" });
    }
  });
  
  // Get all hospitals
  router.get("/", async (req, res) => {
    try {
      const hospitals = await Hospital.find().populate("admin", "name email");
      res.json(hospitals);
    } catch (error) {
      res.status(500).json({ error: "Error fetching hospitals" });
    }
  });
  
  // Get a single hospital by ID
  router.get("/:id", async (req, res) => {
    try {
      const hospital = await Hospital.findById(req.params.id).populate("admin", "name email");
      if (!hospital) return res.status(404).json({ error: "Hospital not found" });
  
      res.json(hospital);
    } catch (error) {
      res.status(500).json({ error: "Error fetching hospital" });
    }
  });
  
  module.exports = router;