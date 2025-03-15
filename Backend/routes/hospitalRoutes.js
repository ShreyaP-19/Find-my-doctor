const express = require("express");
const Hospital = require("../model/Hospital"); // Import the Hospital model
const Department=require("../model/Department");
const router = express.Router();
// Add a hospital
//not finalized just for reference
router.post("/addhospital", async (req, res) => {
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


  //add department

  router.post("/adddepartment", async (req, res) => {
    try{
      const { hospital, name } = req.body; // hospital = hospital ID, name = department name
      // Check if the hospital exists
    const hospitalExists = await Hospital.findOne({ _id: hospital }).populate("departments");
    if (!hospitalExists) {
      return res.status(400).json({ error: `Hospital not found. Please register the hospital first.` });
    }
    // Check if the department already exists in this hospital
    const departmentExists = hospitalExists.departments.find(dep => dep.name === name);
    if (departmentExists) {
      return res.status(400).json({ error: `Department '${name}' already exists in this hospital.` });
    }
    // Create the department
    // Create a new department
    const newDepartment = new Department({
      name,
      hospital: hospitalExists._id
    });

    await newDepartment.save();

    // Add department reference to hospital
    hospitalExists.departments.push(newDepartment._id);
    await hospitalExists.save();

    res.status(201).json(newDepartment);

    }catch(error){
      res.status(500).json({ error: "Error adding department", details: error.message });
    }


  });
  
  module.exports = router;