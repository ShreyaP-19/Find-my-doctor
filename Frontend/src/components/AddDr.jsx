import React, { useState ,useEffect} from 'react'
import DoctorHeader from './DoctorHeader'
import './addDr.css'
import { useNavigate,useLocation } from 'react-router-dom'
import HomeFooter from './HomeFooter';


function AddDr() {
    const location = useLocation();
    const selectedDept = location.state?.dept?.name || "";
    const initValues={name:"",dept:selectedDept,loc:"",qualification:"",year:"",slot:"",fee:"",availability:""}
    const [formErrors, setFormErrors] = useState({});
    const [formValue, setFormValue] = useState(initValues)
    const [isSubmit, setIsSubmit] = useState(false)
    const navigate=useNavigate();

    const [selectedDays, setSelectedDays] = useState([]);
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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
    function  handleSubmit(e) {
        e.preventDefault();
        const errors=Validate(formValue);
        setFormErrors(errors);
        if (Object.keys(errors).length !== 0) {
          return; // Stop submission if there are validation errors
        }
        setIsSubmit(true);
        alert("Successfully added a doctor");
        console.log("confirmed");
    }

    function Validate(values){ //mainly to check if there is any error or to find if any empty fields
        const errors={}
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
        if (!values.dept) {
          errors.dept = "Department is required";
        }
        if (!values.loc) {
            errors.loc = "Location is required";
        }
        if (!values.qualification) {
            errors.qualification = "Qualification is required";
        }
        if (!values.slot) {
            errors.slot = "Slot is required";
        }
          if (selectedDays.length===0) {
            errors.availability = "Atleast one day must be selected";
          }
        return errors;
      }
    
      useEffect(() => {
        console.log(formErrors);
        setFormValue(initValues);
      }, [formErrors]);//dependency array  

  return (
    <div>
      <DoctorHeader/>
      <h1 id="edit-head">Add a doctor</h1>
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
                <input type="text" name="dept" value={formValue.dept} readOnly /> 
            </div>
            <br></br>
            <div className="name">
                <input type="text" 
                onChange={handleChange} 
                name="loc" placeholder="Location" 
                value={formValue.loc} style={{ borderColor: formErrors.loc ? "red" : "" }}
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
                name="slot" placeholder="Slot" 
                value={formValue.slot} style={{ borderColor: formErrors.slot ? "red" : "" }}
                ></input>
                <br></br><br></br>
            </div>
            <br></br>
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

            <br></br>
            <button id="sub-but" type="submit" style={{ backgroundColor: '#165e98',marginLeft:"55px",border:"none",color:"white" }}>Submit</button>
            </div>
        </form>
        <HomeFooter/>
    </div>
  )
}

export default AddDr