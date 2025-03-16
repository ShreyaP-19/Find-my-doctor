const express = require("express");
const Hospital = require("../model/Hospital"); // Import the Hospital model
const Department=require("../model/Department");
const router = express.Router();
const User=require("../model/User");
const Appointment = require("../model/AppointmentHistory"); 
const Doctor = require("../model/Doctor");
const moment = require("moment");
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

  router.post("/add-department", async (req, res) => {
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

  router.post("/register-hospital-admin", async (req, res) => {
    try {
      const { email, username, password, hospitalId } = req.body;
  
      // Check if the hospital exists
      const hospitalExists = await Hospital.findById(hospitalId);
      if (!hospitalExists) {
        return res.status(400).json({ error: "Hospital not found" });
      }
  
      // Check if the hospital already has an admin
      if (hospitalExists.admin) {
        return res.status(400).json({ error: "This hospital already has an admin." });
      }
  
      // Create hospital admin user
      const newAdmin = new User({
        email,
        username,
        password,
        role: "hospitalAdmin",
        hospital: hospitalId
      });
  
      await newAdmin.save();
  
      // Assign the admin to the hospital
      hospitalExists.admin = newAdmin._id;
      await hospitalExists.save();
  
      res.status(201).json(newAdmin);
    } catch (error) {
      res.status(500).json({ error: "Error creating hospital admin", details: error.message });
    }
  });

  router.get("/departments/:hospitalId", async (req, res) => {
    try{
      const { hospitalId } = req.params;
      // Check if hospital exists
    const hospitalExists = await Hospital.findById(hospitalId);
    if (!hospitalExists) {
      return res.status(404).json({ error: "Hospital not found" });
    }

    // Fetch departments for the hospital
    const departments = await Department.find({ hospital: hospitalId });

    res.status(200).json(departments);
  }catch (error) {
      res.status(500).json({ error: "Error fetching departments", details: error.message });
    }


  });

  router.get("/appointment-list/:hospitalId", async (req, res) => {

    try{
      const { hospitalId } = req.params;
      // Check if hospital exists
    const hospitalExists = await Hospital.findById(hospitalId);
    if (!hospitalExists) {
      return res.status(404).json({ error: "Hospital not found" });
    
    }

    // ✅ Get today's date at 00:00:00
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time part for accurate filtering


    // ✅ Fetch appointments for the hospital
    let appointments = await Appointment.find({ hospital: hospitalId, appointmentDateTime: { $gte: today } })
    .populate("doctor", "name specialization") // ✅ Corrected syntax
    .populate({
      path: "doctor",
      populate: { path: "specialization", model: "Department", select: "name" } // ✅ Fetch department name
    }) // ✅ Properly closed `.populate`
    .populate("patient", "username email") // ✅ Fetch patient details
    .sort({ appointmentDateTime: 1 }); // ✅ Sort by upcoming appointments

    // Fetch appointments for the hospital

    appointments = appointments.filter(appointment => appointment.doctor && appointment.doctor.name && appointment.name);

    // ✅ Transform data to return only required fields
    const formattedAppointments = appointments.map(appointment => {
      const appointmentDate = new Date(appointment.appointmentDateTime);
      
      return {
        patientName: appointment.name || "Unknown",
        age: appointment.age || "N/A",
        doctorName: appointment.doctor?.name || "Unknown",
        department: appointment.doctor?.specialization?.name || "N/A",
        appointmentDate: appointmentDate.toISOString().split("T")[0], // Extracts YYYY-MM-DD
        appointmentTime: appointmentDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true
        }) // Extracts HH:MM AM/PM
      };
    });


    if (formattedAppointments.length === 0) {
      return res.status(404).json({ message: "No appointments found for this hospital." });
    }

    res.status(200).json(formattedAppointments);

  }catch (error) {
      res.status(500).json({ error: "Error fetching appointments", details: error.message });
    }

  });

  

  router.post("/register-doctor-username", async (req, res) => {
    try {
      const { email, username, password, hospitalId,doctorId } = req.body;

      // Check if the hospital exists
      const hospitalExists = await Hospital.findById(hospitalId);
      if (!hospitalExists) {
        return res.status(400).json({ error: "Hospital not found" });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already taken. Choose another username." });
            }


      // Create doctor user
      const newDoctor = new User({
        username,
        password,
        role: "doctor",
        hospital: hospitalId,
        doctor:doctorId,
      });

      await newDoctor.save();

      // Add doctor to the hospital
      hospitalExists.doctors.push(newDoctor._id);
      await hospitalExists.save();

      res.status(201).json(newDoctor);
    } catch (error) {
      res.status(500).json({ error: "Error creating doctor", details: error.message });
    }
  });

  router.get("/doctor-hospital-admin/:hospital/:specialization",async (req,res) =>{
    try{
    const { specialization, hospital } = req.params;
     // Ensure specialization is provided
     if (!specialization) {
      return res.status(400).json({ error: "Specialization is required." });
    }

    // ✅ Check if the hospital exists
    const hospitalExists = await Hospital.findById(hospital).populate("departments");
    if (!hospitalExists) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const departmentExists = hospitalExists.departments.find(dep => dep.name === specialization);
    if (!departmentExists) {
      return res.status(404).json({ message: `Department '${specialization}' not found in this hospital.` });
    }
    
    const filter = {
      specialization: departmentExists._id,
      hospital: hospital
    };

    // ✅ Find doctors only in the given department and hospital
    const doctors = await Doctor.find(filter)
      .populate("specialization", "name") // Fetch department name
      .populate("hospital", "name location"); // Fetch hospital details

    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found for this department in this hospital." });
    }

    const filteredDoctors = doctors.map(doctor => {
      return {
        id:doctor._id,
        name: doctor.name,
        qualification:doctor.qualification,
        specialization: doctor.specialization.name,
        location: doctor.location,
        Slots: doctor.Slots,
        availability: doctor.availability
      };
    });

    res.json(filteredDoctors);

    }catch(error){
      res.status(500).json({ error: "Error fetching doctors", details: error.message });
    }



  });
  

  
  
  module.exports = router;