const express = require('express');
const mongoose = require('mongoose');
const User = require('./model/User'); // Import User model
const cors = require('cors');
const bodyParser = require('body-parser');



const connectDB = require("./db");

require("dotenv").config(); // Load environment variables
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

connectDB();


// signup route
app.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);

  // Check if the username already exists in the database
  const existingUser = await User.findOne({ username });

  if (existingUser) {
    // If username exists, return an error
    return res.status(400).json({ message: 'Username already exists' });
  }

  const role = (email) => {
    // Check if the email domain indicates a hospital admin
    const hospitalDomain = '@hospital.com'; // Define your hospital's domain
  
    if (email.endsWith(hospitalDomain)) {
      return 'hospitalAdmin';  // Email belongs to a hospital admin
    }
  
    return 'patient';  // Email does not belong to a hospital admin
  };

  // Create a new user and save to the database
  const newUser = new User({ email, username, password,role:role(email)});

  try {
    await newUser.save(); // Save the user to the database
    console.log(newUser);
    res.status(201).json({ message: 'Signup successful!',role:newUser.role });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ message: 'Error saving user, please try again.' });
  }
});



//login rute
app.post('/login',async(req,res)=>{
  const { username, password } = req.body;

   // Check if the username already exists in the database
   const existingUser = await User.findOne({ username });
   console.log(existingUser);

   if (!existingUser) {
    return res.status(400).json({ message: 'no user found' });
   }
   if (password !== existingUser.password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

   res.status(201).json({ message: 'login successful!',role:existingUser.role});
   


})


// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
