const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  name:{
    type:String,
    required:true,
  },
  specialization: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital", // Reference to the Hospital model
    required: true,
  },
  availability: {
    type: [String], // Example: ["Monday", "Wednesday", "Friday"]
    default: [],
  },
  consultationFee: {
    type: Number,
    required: true,
  },
  appointmentHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointmentHistory", // Reference to Appointment History model
    },
  ],
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
