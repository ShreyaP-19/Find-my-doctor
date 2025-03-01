const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  id:{

    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
  name:{
    type:String,
    required:true,
  },
  specialization: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  location:{
    type:String,
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
  fee: {
    type: Number,
    required: true,
  },
  qualification:{
    type: String,
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
