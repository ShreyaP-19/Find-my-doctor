import React from 'react'
import './homeBody.css'
import HomeHeader from './HomeHeader'
import HomeImage from './HomeImage'
import HomeFooter from './HomeFooter'

function HomeBody() {
  return (
    <div>
      <HomeHeader/>
      <HomeImage/>
      <div id="body">
        <div id="speciality">Find by Speciality</div>
        <div id="test">
            <div id="para">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</div>
        </div>
        <div id="test">
            <div id="round1"></div>
            <div id="round2"></div>
            <div id="round3"></div>
            <div id="round4"></div>
            <div id="round5"></div>
            <div id="round6"></div>
        </div>
        <div id="test">
            <div id="text1" style={{marginLeft:"10px"}}>General physician</div>
            <div id="text2"> Gynecologist</div>
            <div id="text3" style={{marginLeft:"10px"}}>Dermatologist</div>
            <div id="text4" style={{marginLeft:"14px"}}>Pediatrician </div>
            <div id="text5" style={{marginLeft:"25px"}}>Neurologist</div>
            <div id="text6" style={{marginLeft:"10px"}}>Gastroenterologist</div>
        </div>
      </div>
      <HomeFooter/>
    </div>
  )
}

export default HomeBody
