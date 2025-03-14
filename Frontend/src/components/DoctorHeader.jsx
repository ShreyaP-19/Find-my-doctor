import React from 'react'
import findDoc from "../assets/findDoc.png";
import './doctorHeader.css'

function DoctorHeader() {
  return (
    <div>
      <div className="nav">
              <img id="findDoc" src={findDoc} alt="" />
              <div id="findDr" style={{ width: "250px" }}>Find My Dr</div>
              <div style={{width:"1000px"}}></div>
              <button id="docIcon" style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          marginRight:"14px"
        }} ></button>
        </div>
    </div>
  )
}

export default DoctorHeader
