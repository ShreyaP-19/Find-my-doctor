import React,{useState,useEffect} from 'react'
import HomeHeader from './HomeHeader';
import './doctorList.css'
import HomeFooter from './HomeFooter';

function DoctorList() {
  const [doctors,setDoctors]=useState([
    { id: 1, name: "Dr. Ujjal Zaman", specialty: "General Physician", location: "Sylhet, BD",qualification:"MBBS"  },
    { id: 2, name: "Dr. Samantha Hayes", specialty: "Gynecologist", location: "New York, USA",qualification:"MBBS,MS" },
    { id: 3, name: "Dr. Shilpa Mrinal", specialty: "Dermatology", location: "Kerala,India",qualification:"MBBS,MD" },
    { id: 4, name: "Dr. Yadheeshan", specialty: "Pediatrician", location: "Kerala,India",qualification:"MBBS,DNB,MD" },
    { id: 5, name: "Dr. Yashodha", specialty: "Neurologist", location: "Kerala,India",qualification:"MBBS,DO" },
    { id: 6, name: "Dr. Thambi", specialty: "Gastroenterologist", location: "Karnataka,India",qualification:"MBBS,MD" },
  ]);

  return (
    <div>
      <HomeHeader/>
      <h1 id="heading">DOCTORS</h1>
      <div id="container1">
        <div id="filter-box">
            <h2 id="h2" style={{marginTop:"40px"}}>Filter by:</h2>
            <form>
            <label for="maths">
                <input type="radio" value ="Maths" name="Subject" id="checkbox" /><span id="span">  General Physician</span><br/>
                <input type="radio" value ="Maths" name="Subject" id="checkbox" /><span id="span">  Gynecologist</span><br/>
                <input type="radio" value ="Maths" name="Subject" id="checkbox" /><span id="span">  Dermatologist</span><br/>
                <input type="radio" value ="Maths" name="Subject" id="checkbox" /><span id="span">  Pediatician</span><br/>
                <input type="radio" value ="Maths" name="Subject" id="checkbox" /><span id="span">  Neurologist</span><br/>
                <input type="radio" value ="Maths" name="Subject" id="checkbox" /><span id="span">  Gastroenterologist</span><br/>
            </label><br/>
            </form>
        </div>
      <div id="list">
        {doctors.map((doctor)=>(
            <div key={doctor.id} id="list1">
                <div id="doctor1"></div>
                <div className="doctor-info">
                    <h2>{doctor.name}</h2>
                    <p><strong>Profession:</strong> {doctor.specialty}</p>
                    <p><strong>Qualification:</strong> {doctor.qualification}</p>
                    <p><strong>Location:</strong> {doctor.location}</p>
                </div>
            </div>
        ))}
        
      </div>
      </div>
        <HomeFooter/>
    </div>
  )
}

export default DoctorList
