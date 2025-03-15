const express = require("express");
const Hospital = require("../model/Hospital"); 
const Doctor = require("../model/Doctor"); 
const Appointment = require("../model/AppointmentHistory"); 
const User=require("../model/User");
const Department=require("../model/Department");
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
    console.log("data is ",req.body);
    const { name, specialization, location, qualification, year,Slots, hospital, fee, availability } = req.body;

    // Check if the hospital exists
    const hospitalExists = await Hospital.findOne({ _id: hospital }).populate("departments");;
    if (!hospitalExists) {
      return res.status(400).json({ error: `Hospital '${hospital}' not found. Please register the hospital first.` });
    }

    // Find the department by name (client-side sends department as a name, not ID)
    const departmentExists = hospitalExists.departments.find(dep => dep.name === specialization);
    if (!departmentExists) {
      return res.status(400).json({ error: `Department '${specialization}' not found in this hospital.` });
    }

    // Extract 'Slots' from request and split into 30-min intervals
    const slots = req.body.Slots && req.body.Slots.length > 0 ? req.body.Slots : [];
    const timeSlots = splitTimeSlots(slots);

    // Create new doctor
    const newDoctor = new Doctor({
      name,
      specialization:departmentExists._id,
      location,
      qualification,
      year,
      Slots,
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

router.post("/bookappointment", async (req, res) => {
  try{  // Extract data from the request body
    console.log("data is ",req.body);
    const { patientId, doctor, hospital, appointmentDateTime } = req.body;

    // Validate required fields
    if (!patientId || !appointmentDateTime || !doctor || !hospital) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find the patient by ID
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      patient: patientId, // Correct field name
      doctor, // Ensure doctor ID is passed correctly
      hospital, // Ensure hospital ID is passed correctly
      appointmentDateTime, // Combined Date & Time
    });
    

    // Save the new appointment to the database
    await newAppointment.save();

    // Add the appointment ID to the user's (patient's) appointments array
    patient.appointments.push(newAppointment._id);
    await patient.save(); // Save the updated user document

    // Return a success response with the new appointment details
    res.status(201).json({
      message: "Appointment booked successfully",
      appointmentId: newAppointment._id, // Explicitly sending appointmentId
      appointment: newAppointment,
      patient: patient,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/history",async (req, res) => {
  try {
    const { patientId } = req.query;
    if (!patientId) {
      return res.status(400).json({ message: "Missing patient ID" });
    }

    
    const appointments = await Appointment.find({ patient: patientId })
  .populate("doctor", "name fee location")  // Populate only 'name' and 'fee' from doctor
  .populate("hospital", "name")  // Populate only 'name' from hospital
  .populate("patient", "username") // Populate only 'name' from patient
  .select("appointmentDateTime doctor hospital patient"); // Select only required fields
  if (appointments.length === 0) {
    return res.status(404).json({ message: "No appointments found" });
  }

  const formattedAppointments = appointments.map(app => {
    const appointmentDateTime = new Date(app.appointmentDateTime); // Convert ISO string to Date object
    
    return {
      doctorName: app.doctor.name,
      location:app.doctor.location,
      fee: app.doctor.fee,
      hospitalName: app.hospital.name,
      appointmentDate: appointmentDateTime.toISOString().split("T")[0].split("-").reverse().join("-"), // Extract YYYY-MM-DD
      appointmentTime: appointmentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) // Extract HH:MM AM/PM

    };
  });
  const patientName = appointments.length > 0 ? appointments[0]?.patient?.username : "Unknown";

  //console.log("hi everything is ok");
  console.log(patientName);
  console.log(formattedAppointments[0]);
  
  // Send the formatted response
  res.status(200).json({
    message: "Appointments retrieved successfully",
    appointments: formattedAppointments,
    patientName: patientName,
  });
  } catch (error) {
    res.status(500).json({ error: "Error fetching appointments", error: error.message });
  }




});

router.get("/checkslots", async (req, res) => {
  try {
    console.log("recieved ",req.query);
    let { appointmentDateTime, doctorId } = req.query;

    if (!appointmentDateTime) {
      return res.status(400).json({ message: "Appointment date and time required" });
    }else if (!doctorId) {
      return res.status(400).json({ message: "Doctor ID required" });

      
  
    }
    appointmentDateTime = decodeURIComponent(appointmentDateTime); // Decode URI component
    // Fix: Remove extra spaces and replace incorrect format
    appointmentDateTime = appointmentDateTime.replace(/\s(?=\d{2}:\d{2}$)/, "+"); // Fix timezone formatting

    // Convert appointmentDateTime to a Date object
    const parsedDate = new Date(appointmentDateTime);
    console.log("Parsed Date:", parsedDate);

    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid appointment date format" });
    }

    // Count existing appointments for the requested date & time
    const existingAppointments = await Appointment.countDocuments({ 
      appointmentDateTime: parsedDate, 
      doctor: doctorId 
    });

    const nowUTC = new Date(); // Get current time in UTC
    console.log("current time is", nowUTC.toISOString()); // Example: "2025-03-10T12:34:56.789Z"
    let isSlotAvailable = false;
    if(parsedDate < nowUTC){
      isSlotAvailable=false;
    }else{
      isSlotAvailable = existingAppointments < 5;
    }


  
    

    res.json({ isSlotAvailable, totalBookings: existingAppointments });
  } catch (error) {
    console.error("Error checking slot availability:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }


});


router.post("/submit", async (req, res) => {
  try{
    console.log("recieved data is",req.body);
    const {appointmentId,name,age,symptoms}=req.body;
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }



    appointment.name=name;
    appointment.age=age;
    appointment.symptoms=symptoms;
    await appointment.save();
    res.status(201).json({
      message: "Appointment booked successfully",
    });
  }catch(error){
    res.status(500).json({ error: "Error fetching appointments", error: error.message });
  }

});

module.exports = router;
