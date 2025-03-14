import React from 'react'
import './homeImage.css'
import Hero from "../hero3.png"

function DoctorImage() {
    return (
      <div>    
        <div className='hero' id="hero">
          <img id="heropic" src={Hero} alt=""  />
          <div style={{ textAlign: "center" }}>
              <p>Let's stay together to save the lives !!!</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "25px", marginTop: "40px" }}>
            </div>
          </div>
        </div>
      </div>
    )
  }

export default DoctorImage
