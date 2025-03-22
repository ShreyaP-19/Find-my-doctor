import React,{useState,useEffect} from 'react'
import HomeHeader from './HomeHeader';
//import { Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import SignIn from "./SignIn"; 
import './doctorList.css'
import HomeFooter from './HomeFooter';
//import { useAuth } from './AuthContext'
import { useNavigate ,Routes,Route} from 'react-router-dom'
import Appointments from './Appointments';
import axios from "axios";
import HomeBody from './HomeBody';



function DoctorList() {

  const navigate=useNavigate();
  const [selectedSpecialization,setSpecialization]=useState("");
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuth();

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    fetchDoctors(); // ✅ Fetches doctors when specialization changes
  }, [selectedSpecialization]); // ✅ Fetch doctors when selectedSpecialization changes

  const fetchDoctors = () => {
    const url = selectedSpecialization 
      ? `http://localhost:5000/doctor/doctors/${selectedSpecialization}` 
      : "http://localhost:5000/doctor/doctors";

    axios
      .get(url)
      .then((response) => {
        console.log("API response:", response.data);
        if (Array.isArray(response.data) && response.data.length === 0) {
          setDoctors([]);
          setError("No doctors found.");  // ✅ Set error state when no doctors exist
        } else {
          setDoctors(response.data);
          setError(null);  // ✅ Clear error if doctors are found
      }

      })
      .catch((error) =>{
        console.error("Error fetching doctors:", error);
        setDoctors([]);  // ✅ Ensure doctors list is cleared on error
        setError("Failed to fetch doctors. Please try again."); 
     });


};

const handleSubmit = (e) => {
  e.preventDefault(); // Prevents page reload
  console.log("Filtering by specialization:", selectedSpecialization);
  };
  

  const handleClear = () => {
    setSpecialization("");
  };

  

  return (

    <div>
      {isAuthenticated?

    

    <div>

      <HomeHeader/>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />

      <h1 id="heading" style={{marginTop:"80px",marginBottom:"30px"}}>DOCTORS</h1>
      <div id="back-button" style={{fontSize:"20px"}}onClick={()=>navigate('/HomeBody')}>
        <button style={{backgroundColor:"white",border:"1px solid #165e98",borderRadius:"3px",color:"#165e98"}}>Prev</button>
      </div>

      <div id="container1">

        <div id="filter-box">

            <h2 id="h2" style={{marginTop:"30px",marginBottom:"30px"}}>Doctor Filter:</h2>

            <h3 style={{marginLeft:"20px"}}>Specialization:</h3>

            <form onSubmit={handleSubmit}>

            <label htmlFor="Specialization">

                <input type="radio" value ="General Physician" name="Subject" id="checkbox"
                checked={selectedSpecialization === "General Physician"}
                 onChange={(e) => setSpecialization(e.target.value)} /><span id="span">  General Physician</span><br/>

                <input type="radio" value ="Gynecologist" name="Subject" id="checkbox" 
                checked={selectedSpecialization === "Gynecologist"}
                onChange={(e) => setSpecialization(e.target.value)} /><span id="span">  Gynecologist</span><br/>

                <input type="radio" value ="Dermatologist" name="Subject" id="checkbox" 
                checked={selectedSpecialization === "Dermatologist"}
                onChange={(e) => setSpecialization(e.target.value)} /><span id="span">  Dermatologist</span><br/>

                <input type="radio" value ="Pediatrician" name="Subject" id="checkbox" 
                checked={selectedSpecialization === "Pediatrician"}
                onChange={(e) => setSpecialization(e.target.value)}/><span id="span">  Pediatrician</span><br/>

                <input type="radio" value ="Neurologist" name="Subject" id="checkbox" 
                checked={selectedSpecialization === "Neurologist"}
                onChange={(e) => setSpecialization(e.target.value)} /><span id="span">  Neurologist</span><br/>

                <input type="radio" value ="Gastroenterologist" name="Subject" id="checkbox"
                checked={selectedSpecialization === "Gastroenterologist"}
                onChange={(e) => setSpecialization(e.target.value)} /><span id="span">  Gastroenterologist</span><br/>
                </label><br/>

            <div id="done-clr">
                <button id="clr"  onClick={()=>handleClear()} >Clear</button>
            </div>
            </form>

</div>

<div id="list">
{/* ✅ Handle No Doctors Found */}
  {error ? (
      <p style={{ color: "red", fontSize: "28px", textAlign: "center" ,marginLeft:"170px"}}>No doctors found...</p>
    ) : doctors.length === 0 ? (
    <p style={{ color: "red", fontSize: "28px", textAlign: "center" ,marginLeft:"170px"}}>No doctors found...</p>
    ) : (
    doctors.map((doctor) => (
    <div key={doctor._id} id="list1">
       <div id="doctor1"></div>

     <div className="doctor-info" style={{ marginRight: "30px",marginLeft:'20px' }}>
        <h2>{doctor.name}</h2>
         <p><strong><i className="fa-solid fa-user-doctor"></i></strong> {doctor.specialization}</p>
         <p><strong><i className="fa-solid fa-user-graduate"></i></strong> {doctor.qualification}</p>
         <p><strong><i className="fa-solid fa-location-dot"></i></strong> {doctor.location}</p>
     </div>

     <div className="doctor-info">
       <p style={{ marginTop: "53px" }}>
         <strong><i className="fa-solid fa-hospital"></i></strong> {doctor.hospital}
       </p>
       <p style={{ marginLeft: "12px" }}>
         <strong><i className="fa-solid fa-dollar-sign"></i></strong> {doctor.fee}
       </p>

       <button id="userbut" onClick={() => navigate("/Appointments", { state: { doctor } })}>
         Book Appointment
       </button>
     </div>
   </div>
 ))
)}
</div>

</div>

<HomeFooter/>

</div>:<div><SignIn/></div>}
<Routes>
  <Route path="/Appointments" element={<Appointments/>}/>
  <Route path='/SignIn' element={<SignIn/>}/>
  <Route path='/HomeBody' element={<HomeBody/>}/>
</Routes>

</div>

)

}



export default DoctorList