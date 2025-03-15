import React,{useState} from 'react'
import findDoc from "../assets/findDoc.png";
import './doctorHeader.css'
import { useNavigate,Routes, Route} from 'react-router-dom';
import dr from '../Unwanted/doctor.jpg';
import { useAuth } from "./AuthContext";


function DoctorHeader() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useAuth();
  const [active, setActive] = useState("");
  const [open,setOpen]=useState(false);
  const handleclick=()=>{
    setOpen(!open);
  }

  const handleLogout = () => {
    setIsAuthenticated(false); // Update global auth state
    setOpen(false); // Close profile box
    setUserData(null); // Clear user data
    navigate("/");
  };
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
        }} onClick={handleclick} ></button>
        </div>
      {open && (
          <div id="prof-box">
            <div id="user-image-box">
            <img src={dr} id="user-img"></img>
            </div>
            <div id="details-prof">
              <p>{userData?.role === "doctor" ? `Dr. ${userData?.username || "Username"}` : userData?.username || "Username"}</p>
              <p>{userData?.role === "doctor" ? <p>Hospital name</p> : userData?.email || "Email"}</p>
              <button id="logout"onClick={handleLogout } >Logout</button>
            </div>
          </div>
      )}
      </div>
  )
}

export default DoctorHeader
