import {useState,useEffect} from 'react'
import './signUp.css'
import Header from './Header'
import axios from 'axios'
import { Routes,Route, useNavigate } from 'react-router-dom';  // Import useNavigate
import HomeBody from './HomeBody';
import { useAuth } from "./AuthContext"; 
import SignIn from './SignIn';
import DoctorBody from './DoctorBody';
import DrBody from './DrBody';

function SignUp() { 
    // const navigate=useNavigate();
  const initValues={username:"",email:"",password:"",rePassword:""}
  const [formErrors, setFormErrors] = useState({});
  const [formValue,setFormValue]=useState(initValues)
  const [isSubmit,setIsSubmit]=useState(false)
  const [isVisible,setIsVisible]=useState(false)
  const [action,setAction]=useState("Sign Up")
  const navigate = useNavigate();  // Initialize navigate function
  const { setIsAuthenticated } = useAuth(); 
  function handleChange(e){
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const errors = Validate(formValue);  // Validate the form
    setFormErrors(errors);  // Set form errors
    setIsSubmit(true);   //attempt to submit the form
    // Only submit the form if no errors are found
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:5000/auth/signup', formValue)
        .then((response) => {
          console.log('Success:', response.data);
          setIsAuthenticated(true);
          if(response.data.role==='hospitalAdmin'){
            navigate('/DoctorBody')
          }
          else if(response.data.role==='patient'){
            navigate('/SignIn'); // Navigate to the home page
          }
          else if(response.data.role==='doctor'){
            navigate('/DrBody'); // Navigate to the home page
          }
        })
        .catch((error) => {
          if (error.response) {
            // If error response exists, extract the message from backend
            alert(error.response.data.message);
            console.log(error.response.data.message);
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
          // Handle the error (e.g., show an error message)
        });
    }
  }
      
  function Validate(values){ //mainly to check if there is any error or to find if any empty fields
    const errors={}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //to check if username field is not empty
    if (!values.username) errors.username = "Username is required.";
    if(action==='Sign Up'){
      if (!values.email) {   //email is not blank
        errors.email = "Email is required!";
      } 
      else if (!regex.test(values.email)) {   
        errors.email = "This is not a valid email format!";
      }
    }
    if (!values.password) {
      errors.password = "Password is required";
      } 
    else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } 
    else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.rePassword) {
      errors.rePassword = "Please re-enter your password";
    } else if (values.password !== values.rePassword) {
      errors.rePassword = "Passwords do not match!";
    }
    return errors;
  }
    
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {   //no error useeff
      console.log(formValue);
    }
    setFormValue(initValues);
  }, [formErrors]);//dependency array

  return (
    <>
      <Header/>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
        <div>
          <div id="container">
            <div id="box">
              <div className="header">
                <h1 >Sign Up</h1>
                {Object.keys(formErrors).length === 0 && isSubmit ? (
                    <div></div>
                    ) : <div></div>}
                  </div>
                <form onSubmit={handleSubmit}>
            
                <div className="inputs">
                  <div className="email">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="text" onChange={handleChange} name="email" value={formValue.email} placeholder="Email" style={{ borderColor: formErrors.email ? "red" : "" }}></input>
                    <br></br><br></br>
                  </div>
                  <div className="username">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" onChange={handleChange} name="username" placeholder="UserName" value={formValue.username} style={{ borderColor: formErrors.userName ? "red" : "" }}></input>
                    <br></br><br></br>
                  </div>
                  <div className="password">
                    <i className="fa-solid fa-lock"></i>
                    <input type={isVisible ? 'text' : 'password'} name="password" onChange={handleChange} value={formValue.password} placeholder="Password" style={{ borderColor: formErrors.password ? "red" : "" }}></input>
                    <br></br><br></br>
                  </div>
                  <div className="password" style={{marginLeft:"35px"}}>
                    {/* <i className="fa-solid fa-lock"></i> */}
                    <input type={isVisible ? 'text' : 'password'} name="rePassword" onChange={handleChange} value={formValue.rePassword} placeholder="Re-enter Password" style={{ borderColor: formErrors.rePassword ? "red" : "" }}></input>
                    {/* {formErrors.rePassword && <p style={{ color: "red", fontSize: "12px" }}>{formErrors.rePassword}</p>} */}
                    <br></br><br></br>
                  </div>
                  <div className="show-password">
                <label>
                  <input
                    type="checkbox"
                    checked={isVisible}
                    onChange={() => setIsVisible(!isVisible)} // Toggle password visibility
                  />
                  Show Password
                </label>
              </div>
                </div>
                  
                <button id="button" type="submit"  style={{color:'#165e98'}}>Submit</button>
                <div style={{height:"50px"}}></div>
                </form>
              </div>
            </div>
          </div>
          <Routes>
            <Route path="/SignIn" element={<SignIn/>}/>
            <Route path="/DoctorBody" element={<DoctorBody/>}/>
            <Route path="/DrBody" element={<DrBody/>}/>

          </Routes>
    </>
  )
}

export default SignUp;
