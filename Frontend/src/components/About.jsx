import React from 'react'
import HomeHeader from './HomeHeader'
import './about.css'
import HomeFooter from './HomeFooter'

function About() {
  return (
    <div>
        <HomeHeader/>
      <h1 id="about">About Us</h1>
      <p id="paragraph">Welcome to Find My Dr, an innovative healthcare appointment management system designed to streamline the way patients connect with doctors across multiple hospitals. Traditional appointment booking methods often lead to inefficiencies such as double bookings, long waiting times, and communication gaps. Our platform eliminates these issues by offering a centralized, user-friendly solution where patients can search for doctors based on specialization, hospital, and availability, ensuring a seamless booking experience.

With an intuitive interface, Find My Dr empowers users with real-time updates on doctor availability, secure authentication, and role-based access for patients, doctors, and hospital administrators. Our system ensures that managing appointments becomes effortless, allowing healthcare providers to focus on what matters most—patient care.</p>
  <h1 id="about" style={{marginTop:"40px",marginBottom:"50px"}}>Why Choose Us</h1>
  <div id="boxes">
    <div id="box1"><br/><br/><br/><h2 style={{color:"#255984"}}>Centralized Multi-Hospital Search:</h2><p style={{margin:"20px",color:"#165e98"}}>Unlike fragmented online platforms, our system consolidates doctor information from multiple hospitals in one place for easy access.</p></div>
    <div id="box1"><br/><br/><br/><h2 style={{color:"#255984"}}>Personalized Patient Experience:</h2><p style={{margin:"20px",color:"#165e98"}}>View detailed doctor profiles, including qualifications, experience, and consultation fees, to make informed choices.</p></div>
    <div id="box1"><br/><br/><br/><h2 style={{color:"#255984"}}>Enhanced Efficiency: </h2><p style={{margin:"20px",color:"#165e98"}}>Our automated system reduces administrative burdens, allowing hospitals to optimize resources while ensuring quicker appointment booking.</p></div>
    <div id="box1"><br/><br/><br/><h2 style={{color:"#255984"}}>Accessibility & Convenience:</h2><p style={{margin:"20px",color:"#165e98"}}>Patients can book, modify, or cancel appointments anytime, anywhere, reducing the hassle of manual scheduling.</p></div>
  </div>
  
    <HomeFooter/>
    </div>
  )
}

export default About
