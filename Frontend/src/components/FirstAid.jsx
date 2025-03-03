import React from 'react'
import HomeHeader from './HomeHeader'
import './firstaid.css'
import HomeFooter from './HomeFooter'

function FirstAid() {
  return (
    <div>
      <HomeHeader/>
      <h1 id="head">First Aid</h1>
      <div id="paragraph">
      <div id="quote">Empower yourself with first-aid knowledge and make a difference when it matters the most</div>
      </div>
      <div id="wholeAid">
        <div id="aidbox">
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Cuts and Wounds </h2><br></br>
              <ul>
              <li>Clean the wound with clean water. </li> 
              <li>Apply gentle pressure with a sterile cloth to stop bleeding. </li>
              <li>Cover with a clean bandage. </li>
              <li> Seek medical attention if the wound is deep or bleeding persists.</li>
              </ul>
          </div>
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Burns</h2><br></br> 
              <ul>
              <li>Cool the burn under running water for at least 10 minutes. </li>
              <li>Do not apply ice or ointments.</li> 
              <li>Cover with a non-stick dressing.</li>
              <li>Seek medical help for severe burns or burns on the face, hands, or joints.</li>
              </ul>
          </div>
          <div id="firstaidBox">
            <h2 style={{marginTop:"40px"}}>Choking</h2><br></br> 
            <ul>
            <li> Encourage the person to cough</li> 
            <li> Perform the Heimlich maneuver if they cannot breathe</li>
            <li>For infants,use backblows and chest thrusts</li> 
            <li>Call emergency services if in need.</li>
            </ul>
          </div>
        </div><br></br>
        <div id="aidbox">
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Fractures and Sprains</h2> <br></br>
              <ul>
              <li>Immobilize the affected area using a splint or bandage.</li> 
              <li>Apply ice packs to reduce swelling. </li>
              <li>Avoid moving the injured limb until medical help arrives. </li>
              </ul>
          </div>
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Heart Attack</h2> <br></br>
              <ul>
              <li>Call emergency services asap. </li>
              <li>Keep the person calm and seated. </li>
              <li>Loosen tight clothing and provide aspirin (if not allergic). </li>
              <li>Monitor breathing and be ready to perform CPR if needed.</li>
              </ul> 
          </div>
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Stroke</h2><br></br>
              <ul>
              <li>Recognize symptoms using FAST (Face drooping, Arm weakness, Speech difficulty, Time to call emergency services).</li> 
              <li>Keep the person in a comfortable position. </li>
              <li>Do not give anything to eat or drink </li>
              </ul>
          </div>
        </div><br></br>
        <div id="aidbox">
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Allergic Reactions</h2> <br></br>
              <ul>
              <li>Identify signs like swelling, difficulty breathing, or rash.</li> 
              <li>Administer an epinephrine auto-injector if available. </li>
              <li>Call emergency services asap.</li>
              </ul> 
          </div>
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Poisoning</h2> <br></br>
              <ul>
              <li>Identify the substance ingested.</li>
              <li>Do not induce vomiting unless instructed by a medical professional.</li> 
              <li>Call a poison control center or emergency services asap.</li>
              </ul> 
          </div>
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Fainting</h2> <br></br>
              <ul>
              <li>Lay the person flat on their back and elevate their legs. </li>
              <li>Loosen tight clothing and provide space. </li>
              <li>If unconscious for more than a minute, call emergency services.</li>
              </ul>
          </div>
        </div><br></br>
        <div id="aidbox"> 
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Seizures</h2> <br></br>
              <ul>
              <li>Protect the person from injury by clearing nearby objects.</li> 
              <li>Do not put anything in their mouth. </li>
              <li>Turn them onto their side to keep the airway clear. </li>
              <li> Seek medical attention soon.</li>
              </ul> 
          </div>
          <div id="firstaidBox"> 
              <h2 style={{marginTop:"40px"}}>Drowning</h2> <br></br>
              <ul>
              <li> Remove the person from the water as quickly as possible. </li>
              <li> Check for breathing and pulse.</li> 
              <li>If the person is not breathing, begin CPR immediately. </li>
              <li>Call emergency services for further assistance.</li>
              </ul>
          </div>
          <div id="firstaidBox">
              <h2 style={{marginTop:"40px"}}>Animal Bites</h2> <br></br>
              <ul>
              <li>Wash the wound thoroughly with soap and water. </li>
              <li>Apply an antiseptic and cover with a clean bandage. </li>
              <li>Seek medical attention to assess the risk of infection or rabies.</li>
              </ul>
          </div>
        </div>
      </div>
      <HomeFooter/>
    </div>
  )
}

export default FirstAid
