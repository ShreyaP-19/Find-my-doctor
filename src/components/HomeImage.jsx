import React,{useState} from 'react'
import './homeImage.css'
import Hero from "../hero3.png"
import {Routes,Route,useNavigate} from 'react-router-dom'
import SignIn from './SignIn'
import Contact from './Contact'
import FirstAid from './FirstAid'

function HomeImage() {
  
  const navigate=useNavigate();
  return (
    <div>   
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      /> 
      <div className='hero' id="hero">
        <img id="heropic" src={Hero} alt=""  />
        <div style={{ textAlign: "center" }}>
            <p>We are Here to Find the Best Healthcare Near You!!!</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "25px", marginTop: "40px" }}>
            <div className="btn-one" onClick={()=>navigate('/SignIn')} ><p>Get Started</p></div>
            {/* <div className="btn-two" onClick={()=>navigate('/FirstAid')}><p style={{paddingTop:"25px",fontSize:"25px"}}>First Aid</p><i className='fa-solid fa-briefcase-medical'style={{marginTop:"15px",fontSize:"40px"}} ></i></div> */}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "25px", marginTop: "40px" }}>
            <div className="btn-two" onClick={()=>navigate('/FirstAid')}><p style={{paddingTop:"25px"}}>First Aid</p><i className='fa-solid fa-briefcase-medical'style={{marginTop:"15px",fontSize:"30px"}} ></i></div>
            <div className="btn-two" onClick={()=>navigate('/FirstAid')}><p style={{paddingTop:"25px"}}>First Aid</p><i className='fa-solid fa-briefcase-medical'style={{marginTop:"15px",fontSize:"30px"}} ></i></div>
            <div className="btn-two" onClick={()=>navigate('/FirstAid')}><p style={{paddingTop:"25px"}}>First Aid</p><i className='fa-solid fa-briefcase-medical'style={{marginTop:"15px",fontSize:"30px"}} ></i></div>
          </div>
        </div>
      </div>         

            <Routes>
            <Route path='/SignIn' element={<SignIn/>}/>
            <Route path='/Contact' element={<Contact/>}/>
            <Route path='/FirstAid' element={<FirstAid/>}/>
          </Routes>
    </div>
  )
}

export default HomeImage
