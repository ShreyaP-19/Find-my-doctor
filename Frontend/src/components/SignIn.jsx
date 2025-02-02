import {useState,useEffect} from 'react'
import './signIn.css'
import Header from './Header';
import { Routes,Route,useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import axios from 'axios';

function SignIn(){
  const navigate=useNavigate();
  const initValues={username:"",password:""}
  const [formErrors, setFormErrors] = useState({});
  const [formValue,setFormValue]=useState(initValues)
  const [isSubmit,setIsSubmit]=useState(false)
   
  //for handling multiple inputs
  function handleChange(e){
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(Validate(formValue))
    console.log(formValue)

    setIsSubmit(true);   //attempt to submit the form
    if (Object.keys(formErrors).length === 0) {
      axios.post('http://localhost:5000/login', formValue)
        .then((response) => {
          console.log('Success:', response.data);
          if(response.data.role==='hospitalAdmin'){
            navigate('/service')
          }
          else if(response.data.role==='patient'){
            navigate('/home'); // Navigate to the home page
          }
         
          
        })
        .catch((error) => {
          if (error.response) {
            // If error response exists, extract the message from backend
            alert(error.response.data.message);
          } else {
            setErrorMessage("An error occurred. Please try again.");
          }
          // Handle the error (e.g., show an error message)
        });
    }
  }
      
  function Validate(values){ //mainly to check if there is any error or to find if any empty fields
    const errors={}
    //to check if username field is not empty
    if (!values.username) errors.username = "Username is required.";

    if (!values.password) {
      errors.password = "Password is required";
      } 
    else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } 
    else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
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
        <form onSubmit={handleSubmit}>
          <div id="container">
            <div id="box">
               <div className="header">
                  <h1 >Sign In</h1>
                </div>
                <div className="inputs">
                  <div className="username">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" onChange={handleChange} name="username" placeholder="UserName" value={formValue.username} style={{ borderColor: formErrors.username ? "red" : "" }}></input>
                    <br></br><br></br>
                  </div>
            
                  <div className="password">
                    <i className="fa-solid fa-lock"></i>
                      <input type="password" name="password" onChange={handleChange} value={formValue.password} placeholder="Password" style={{ borderColor: formErrors.password ? "red" : "" }}></input>
                      <br></br><br></br>
                  </div>
                </div>

                <button id="button" type="submit"  style={{color:'#165e98'}}>Submit</button>
                  <br></br>
                  <p>Already have an account?<span onClick={()=>navigate('/SignUp')}>Click here!</span></p>
            </div>
          </div>
          </form>

          <Routes>
            <Route path='/SignUp' element={<SignUp/>}/>
          </Routes>
        </>
  )

}

export default SignIn
