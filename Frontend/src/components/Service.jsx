import React from 'react'
import HomeHeader from './HomeHeader'
import './service.css'
import HomeFooter from './HomeFooter'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomeBody from './HomeBody'
import FirstAid from './FirstAid'

function Service() {
  const navigate=useNavigate();
  return (
    <div>
        <HomeHeader/>
      <h1 id="service">Service</h1>
      <p id="paragraph">Find My Dr is a comprehensive online platform designed to streamline doctor appointment scheduling across multiple hospitals. Our service allows patients to search for doctors based on specialization, hospital affiliation, and availability, ensuring seamless appointment booking. We provide real-time updates on doctor schedules, eliminating double bookings and long wait times. Our user-friendly interface enhances the experience for patients, hospital administrators, and doctors alike, offering an efficient and centralized solution for healthcare management. With secure authentication and a well-integrated database, we ensure that all interactions remain safe and reliable. Whether you need to book, modify, or cancel an appointment, Find My Dr makes the process hassle-free and accessible anytime, anywhere.</p>
      <div id="service-button">
        <button id="but" onClick={()=>navigate('/HomeBody')}>Get Started With Us</button>
        <button id="but" onClick={()=>navigate('/FirstAid')}>Explore the First Aid methods</button>
      </div>
      <HomeFooter/>
      <Routes>
        <Route path='/HomeBody' element={<HomeBody/>}/>
        <Route path='/FirstAid' element={<FirstAid/>}/>
      </Routes>
    </div>
  )
}

export default Service
