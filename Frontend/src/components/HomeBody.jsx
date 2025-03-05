import React from 'react'
import './homeBody.css'
import HomeHeader from './HomeHeader'
import HomeImage from './HomeImage'
import HomeFooter from './HomeFooter'
import { useNavigate ,Routes,Route} from 'react-router-dom'
import DoctorList from './DoctorList'
import { useAuth } from './AuthContext'
import SignIn from './SignIn'
import Contact from './Contact'
import FirstAid from './FirstAid'
import AppointmentHistory from './AppointmentHistory.jsx'

function HomeBody() {
  const navigate=useNavigate();
  const { isAuthenticated } = useAuth(); 
  
  return (
    <div>
      {isAuthenticated?<div><HomeHeader/>
      <HomeImage/>
      <div id="body">
        <div id="speciality">Find by Speciality</div>
        <div id="test">
            <div id="para">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</div>
        </div>
        <div id="test">
        <button id="card" onClick={()=>navigate('/DoctorList')}>
            <h2 style={{marginBottom:"17px"}}>Book Appointments</h2>
            <p id="notes">Click here to explore the doctors over the world and own your slot!!</p>
        </button>
        <button id="card" onClick={()=>navigate('/AppointmentHistory')}>
            <h2 style={{marginBottom:"17px"}}>Appointment History</h2>
            <p id="notes">Wanna check your appointments history?Click here!!</p>
        </button>
        <button id="card" onClick={()=>navigate('/FirstAid')}>
            <h2 style={{marginBottom:"17px"}}>First Aid</h2>
            <p id="notes">Swift action can save lives. Quick First Aid Matters!!Explore more hacks!</p>
        </button>
        </div>
      </div>
      <HomeFooter/>
      </div>:<div><SignIn/></div>}
    
      <Routes>
        <Route path='/DoctorList' element={<DoctorList/>}/>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/FirstAid' element={<FirstAid/>}/>
        <Route path='/AppointmentHistory' element={<AppointmentHistory/>}/>
      </Routes>
    </div>
  )
}

export default HomeBody
