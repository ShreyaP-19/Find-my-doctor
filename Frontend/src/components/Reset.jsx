import React, { useState } from 'react'
import Header from './Header'
import './reset.css'
import axios from "axios";


function Reset() {
    const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
        <Header/>
        <h1 style={{textAlign:"center",marginTop:"30px"}}>Reset Your Password</h1>
        <div id="reset-div">
            <p id="reset-para">To reset your password, enter your email below and submit. An email will be sent to you with instructions about how to complete the process.</p>
        </div>
        <form onSubmit={handleSubmit} id="reset-form">
            <div id="reset-form-div">
            <input type="email" placeholder="Enter your email" value={email} id="reset-input" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div id="reset-form-div">
                <button type="submit" id="reset-button">Send Reset Link</button>
            </div>
        </form>
        {message && <p>{message}</p>}
    </div>
  )
}

export default Reset
