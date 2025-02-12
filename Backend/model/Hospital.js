const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema(
  {
    name: { type: String,
       required: true, 
       unique: true },
    location: { type: String, 
      required: true },
    admin: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Hospital admins
    doctors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }], // Associated doctors
    appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }], // Appointments linked to hospital
  }
);

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital ;
