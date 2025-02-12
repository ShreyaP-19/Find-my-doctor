const mongoose = require("mongoose");

const appointmentHistorySchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  appointmentDateTime: {
    type: Date, // Stores both date and time
    required: true,
  },
  status: {
    type: String,
    enum: ["completed", "cancelled", "no-show"],
    default: "completed",
  },
  diagnosis: {
    type: String,
    default: "",
  },
  prescription: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AppointmentHistory = mongoose.model("AppointmentHistory", appointmentHistorySchema);
module.exports = AppointmentHistory;
