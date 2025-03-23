import React, { useState ,useEffect} from 'react'
import DoctorHeader from './DoctorHeader'
import './addDr.css'
import { useNavigate,useLocation, Routes, Route,Navigate } from 'react-router-dom'
import HomeFooter from './HomeFooter';
import { useAuth } from "./AuthContext";
import SignIn from './SignIn';
import axios from "axios";
import DeptList from './DeptList';

function AddDr() {
    const { isAuthenticated, userData,setUserData } = useAuth();
    const location = useLocation();
    const selectedDept = location.state?.dept?.name || "";
    const initValues={name:"",specialization:selectedDept,location:"",qualification:"",year:"",Slots:"",fee:"",availability:""}
    const [formErrors, setFormErrors] = useState({});
    const [formValue, setFormValue] = useState(initValues)
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate=useNavigate();

    const [selectedDays, setSelectedDays] = useState([]);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    if(!isAuthenticated){
        return <Navigate to="/SignIn" replace />;

    }



    useEffect(() => {
        setFormValue((prev) => ({ ...prev, dept: selectedDept }));
    }, [selectedDept]);
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        setSelectedDays((prev) => 
            checked ? [...prev, value] : prev.filter((day) => day !== value)
        );
    };

    const handleChange=(e)=>{
        const { name, value } = e.target;
        
        setFormValue({ ...formValue, [name]: value });
        }
    const generatePassword = (name) => {
            if (!name) return "";
          
            const cleanedName = name.replace(/^Dr\s+/g, ""); // Remove all spaces
            const uniqueId = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
          
            return `${cleanedName}@${uniqueId}`;
        };
          
          
    
    function  handleSubmit(e) {
        e.preventDefault();
        const errors=Validate(formValue);
        setFormErrors(errors);
        if (Object.keys(errors).length !== 0) {
          return; // Stop submission if there are validation errors
        }
        
        const firstLocationWord = formValue.location?.split(/[\s,]+/)[0].toLowerCase() || ""; // Ensure location exists
       const cleanedName = formValue.name?.replace(/^Dr\s*/i, "").replace(/\s+/g, "");
       const username = `${cleanedName}@${firstLocationWord}`;
   
    const password =generatePassword(formValue.name);
    

    console.log("Generated Username:", username);
    console.log("Generated Password:", password);

        const formattedSlots = Array.isArray(formValue.Slots) 
        ? formValue.Slots 
        : formValue.Slots.split(",").map(slot => slot.trim());

        const doctorData = {
            ...formValue,
            availability: selectedDays,  // ✅ Send selected days as an array
            Slots: formattedSlots,        // ✅ Already an array
            hospital: userData?.hospitalId,
            username: username,  // ✅ Add username
            password: password   // ✅ Add password
        };
        

        const sendDoctorData = async () => {
            try {
                console.log(doctorData);
                const response = await axios.post("http://localhost:5000/doctor/adddoctor", doctorData);
               alert("Successfully added a doctor!");
                console.log("Server Response:", response.data);
                const newDoctorId = response.data.doctor_id;
               // Updating user data state safely
            setUserData((prevUserData) => {
            const updatedUserData = { ...prevUserData, doctorId: newDoctorId };
           // console.log("Updated user data: ", updatedUserData);
            return updatedUserData;
                });
            navigate("/AddDr");
               
                
            } catch (error) {
                console.error("Error adding doctor:", error.response?.data || error.message);
                alert("Failed to add doctor. Please try again.");
            }
        };
        sendDoctorData(); // ✅ Call the async function
    }
    // ✅ Log userData only when it updates
useEffect(() => {
    if (userData.doctorId) {
        console.log("Now user data is:", userData);
        setIsSubmit(true);
    }
}, [userData]);

    function Validate(values){ //mainly to check if there is any error or to find if any empty fields
        const errors={}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //to check if username field is not empty
        if (!values.name) errors.name = "Name is required.";
    
        if (!values.fee) {
          errors.fee = "fee is required";
        }
        else if (!/^\d+$/.test(values.fee)) 
            errors.fee = "fee must be a number.";
        if (!values.year) {
            errors.year = "year is required";
        }
        else if (!/^\d+$/.test(values.year)) 
                  errors.year = "year must be a number.";
        if (!values.specialization) {
          errors.dept = "Department is required";
        }
        if (!values.location) {
            errors.location = "Location is required";
        }
        if (!values.qualification) {
            errors.qualification = "Qualification is required";
        }
        if (!values.Slots || values.Slots.length === 0) {
            errors.Slots = "At least one slot is required";
        }
        
          if (selectedDays.length===0) {
            errors.availability = "Atleast one day must be selected";
          }
          if (!values.email) {   //email is not blank
            errors.email = "Email is required!";
          } 
          else if (!regex.test(values.email)) {   
            errors.email = "This is not a valid email format!";
          }
        return errors;
      }
    
      useEffect(() => {
        console.log(formErrors);
        setFormValue(initValues);
      }, [formErrors]);//dependency array  

  return (
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        
      <DoctorHeader/>
      {/* <div id="back-button" style={{fontSize:"20px"}}onClick={()=>navigate('/DeptList')}>
        <button style={{backgroundColor:"white",border:"1px solid #165e98",borderRadius:"3px",color:"#165e98"}}>Prev</button>
      </div> */}
      <h1 id="edit-head" style={{marginTop:"70px"}}>Add a doctor</h1>
      <form id="form" onSubmit={handleSubmit}>
            <div id="middle">
            <div className="name">
                <input type="text" 
                onChange={handleChange} 
                name="name" placeholder="Name" 
                value={formValue.name} style={{ borderColor: formErrors.name ? "red" : "" }}
                ></input>
                <br></br><br></br>
            </div>
            <br></br>
            <div className="name">
                <input type="text" 
                onChange={handleChange} 
                name="email" placeholder="Email" 
                value={formValue.email} style={{ borderColor: formErrors.email ? "red" : "" }}
                ></input>
                <br></br><br></br>
            </div>
            <br></br>
            <div className="name">
                <input type="text" name="specialization" value={formValue.specialization} readOnly /> 
            </div>
            <br></br>
            <div className="name">
                <input type="text" 
                onChange={handleChange} 
                name="location" placeholder="Location" 
                value={formValue.location} style={{ borderColor: formErrors.location ? "red" : "" }}
                ></input>
                <br></br><br></br>
            </div>
            <br></br>
            <div className="name">
                <input type="text" 
                onChange={handleChange} 
                name="qualification" placeholder="Qualification" 
                value={formValue.qualification} style={{ borderColor: formErrors.qualification ? "red" : "" }}
                ></input>
                <br></br><br></br>
            </div>
            <br></br>
            <div className="name">
                <input type="text" 
                onChange={handleChange} 
                name="fee" placeholder="Fees" 
                value={formValue.fee} style={{ borderColor: formErrors.fee ? "red" : "" }}
                ></input>
                <br></br><br></br>
            </div>
            <br></br>
            <div className="name">
                <input type="text" 
                onChange={handleChange} 
                name="year" placeholder="Year of Experience" 
                value={formValue.year} style={{ borderColor: formErrors.year ? "red" : "" }}
                ></input>
                <br></br><br></br>
            </div>
            <br></br>
            <div className="name">
                <input type="text" 
                onChange={handleChange} 
                name="Slots" placeholder="Slot.Eg:9:00 AM-11:00 AM" 
                value={formValue.Slots}
 
                style={{ borderColor: formErrors.Slots ? "red" : "" }}
                ></input>
                <br></br><br></br>
            </div>
            <br></br>
            <div id="avail-box">
            <div className="name" id="checkdiv">
                <p style={{fontSize:"larger",color:"#165e98"}}>Availability:</p>
                {days.map((day) => (
                    <label key={day} style={{ marginRight: "10px" }} id="checkbox-label ">
                        <input type="checkbox" value={day} 
                        checked={selectedDays.includes(day)} id="daycheck" style={{marginRight:"5px"}}
                        onChange={handleCheckboxChange}/>
                          {day}
                    </label>
                ))}
                {formErrors.availability && <p style={{ color: "red" }}>{formErrors.availability}</p>}
            </div>
            </div>

            <br></br>
            <button id="sub-but" type="submit" style={{ backgroundColor: '#165e98',marginLeft:"55px",border:"none",color:"white" }}>Submit</button>
            </div>
        </form>
        <HomeFooter/>
    <Routes>
        <Route path="/DeptList" element={<DeptList/>}/>
    </Routes>
    </div>
  )
}

export default AddDr