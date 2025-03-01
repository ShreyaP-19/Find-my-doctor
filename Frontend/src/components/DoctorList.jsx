import React,{useState,useEffect} from 'react'
import HomeHeader from './HomeHeader';
import './doctorList.css'
import HomeFooter from './HomeFooter';
import { useAuth } from './AuthContext'
import SignIn from './SignIn'
import { useNavigate ,Routes,Route} from 'react-router-dom'
import Appointments from './Appointments';

function DoctorList() {
  const navigate=useNavigate();
  const { isAuthenticated } = useAuth();
  const [doctors,setDoctors]=useState([
    { id: 1, name: "Dr. Ujjal Zaman", specialty: "General Physician", location: "Sylhet, BD",qualification:"MBBS",hospital:'City Hospital',year:'2 years' ,fee:'$150',slot:{start:"10:00 AM",end:"12.00 PM"} ,availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"]},
    { id: 2, name: "Dr. Samantha Hayes", specialty: "Gynecologist", location: "New York, USA",qualification:"MBBS,MS",hospital:'City Hospital',year:'2 years' ,fee:'$150',slot:{start:"10:00 AM",end:"12.00 PM"},availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
    { id: 3, name: "Dr. Shilpa Mrinal", specialty: "Dermatology", location: "Kerala,India",qualification:"MBBS,MD",hospital:'City Hospital',year:'2 years' ,fee:'$150',slot:{start:"10:00 AM",end:"12.00 PM"},availableDays: [ "Wednesday", "Thursday", "Friday"] },
    { id: 4, name: "Dr. Yadheeshan", specialty: "Pediatrician", location: "Kerala,India",qualification:"MBBS,DNB,MD",hospital:'City Hospital',year:'2 years' ,fee:'$150',slot:{start:"10:00 AM",end:"12.00 PM"},availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday","Sunday"] },
    { id: 5, name: "Dr. Yashodha", specialty: "Neurologist", location: "Kerala,India",qualification:"MBBS,DO" ,hospital:'City Hospital',year:'2 years' ,fee:'$150',slot:{start:"10:00 AM",end:"12.00 PM",availableDays: ["Monday", "Tuesday", "Wednesday"]}},
    { id: 6, name: "Dr. Thambi", specialty: "Gastroenterologist", location: "Karnataka,India",qualification:"MBBS,MD",hospital:'City Hospital',year:'2 years' ,fee:'$150',slot:{start:"10:00 AM",end:"12.00 PM"} ,availableDays: ["Monday", "Wednesday", "Friday"]},
  ]);

  return (
    <div>
    {isAuthenticated?
    <div>
      <HomeHeader/>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <h1 id="heading">DOCTORS</h1>
      <div id="container1">
        <div id="filter-box">
            <h2 id="h2" style={{marginTop:"30px",marginBottom:"30px"}}>Doctor Filter:</h2>
            <h3 style={{marginLeft:"20px"}}>Specialization:</h3>
            <form>
            <label htmlFor="Specialization">
                <input type="radio" value ="Specialization" name="Subject" id="checkbox" /><span id="span">  General Physician</span><br/>
                <input type="radio" value ="Specialization" name="Subject" id="checkbox" /><span id="span">  Gynecologist</span><br/>
                <input type="radio" value ="Specialization" name="Subject" id="checkbox" /><span id="span">  Dermatologist</span><br/>
                <input type="radio" value ="Specialization" name="Subject" id="checkbox" /><span id="span">  Pediatician</span><br/>
                <input type="radio" value ="Specialization" name="Subject" id="checkbox" /><span id="span">  Neurologist</span><br/>
                <input type="radio" value ="Specialization" name="Subject" id="checkbox" /><span id="span">  Gastroenterologist</span><br/>
            </label><br/><br/>
            <h3 style={{marginLeft:"20px"}}>Hospital:</h3>
            <label htmlFor="hospital">
                <input type="radio" value ="hospital" name="Subject" id="checkbox" /><span id="span"> City Hospital</span><br/>
                <input type="radio" value ="hospital" name="Subject" id="checkbox" /><span id="span">  Apollo Hospital</span><br/>
                <input type="radio" value ="hospital" name="Subject" id="checkbox" /><span id="span">  MedicoCare</span><br/>
                <input type="radio" value ="hospital" name="Subject" id="checkbox" /><span id="span"> Green Valley Hospital</span><br/>
                <input type="radio" value ="hospital" name="Subject" id="checkbox" /><span id="span">  Indiana Hospital</span><br/>
                <input type="radio" value ="hospital" name="Subject" id="checkbox" /><span id="span">  Aster MIMS</span><br/>
            </label><br/>
            </form>
        </div>
      <div id="list">
        {doctors.map((doctor)=>(
            <div key={doctor.id} id="list1">
                <div id="doctor1"></div>
                <div className="doctor-info" style={{marginRight:"30px",marginLeft:"20px"}}>
                    <h2>{doctor.name}</h2>
                    <p><strong><i className="fa-solid fa-user-doctor"></i></strong> {doctor.specialty}</p>
                    <p><strong><i className="fa-solid fa-user-graduate"></i></strong> {doctor.qualification}</p>
                    <p><strong><i className="fa-solid fa-location-dot"></i></strong> {doctor.location}</p>
                </div>
                <div className="doctor-info">
                    <p style={{marginTop:"53px"}}><strong><i className="fa-solid fa-hospital"></i></strong> {doctor.hospital}</p>
                    {/* <p><strong>Year of Experience:</strong> {doctor.year}</p> */}
                    <p style={{marginLeft:"12px"}}><strong><i className="fa-solid fa-dollar-sign"></i></strong> {doctor.fee}</p>
                    <button id="userbut" onClick={()=>navigate('/Appointments',{state:{doctor}})}> Book Appointment</button>
                </div>
            </div>
        ))}
        
      </div>
      </div>
        <HomeFooter/>
    </div>:<div><SignIn/></div>}
    
    <Routes>
      <Route path='/Appointments' element={<Appointments/>}/>
      <Route path='/SignIn' element={<SignIn/>}/>
    </Routes>
    </div>
  )
}

export default DoctorList
