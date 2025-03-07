const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    required: true, 
    enum: ['admin', 'hospitalAdmin', 'doctor', 'patient'],  
    default: 'patient' // Default role
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "AppointmentHistory" }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
