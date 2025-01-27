import {useState,useEffect} from 'react'
import './signUp.css'
import Header from './Header'


function SignUp() { 
    // const navigate=useNavigate();
  const initValues={userName:"",email:"",password:""}
  const [formErrors, setFormErrors] = useState({});
  const [formValue,setFormValue]=useState(initValues)
  const [isSubmit,setIsSubmit]=useState(false)
  const [action,setAction]=useState("Sign Up")
  function handleChange(e){
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormErrors(Validate(formValue))
    setIsSubmit(true);   //attempt to submit the form
  }
      
  function Validate(values){ //mainly to check if there is any error or to find if any empty fields
    const errors={}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //to check if username field is not empty
    if (!values.userName) errors.userName = "Username is required.";
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
            
                <div className="inputs">
                  <div className="email">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="text" onChange={handleChange} name="email" value={formValue.email} placeholder="Email" style={{ borderColor: formErrors.email ? "red" : "" }}></input>
                    <br></br><br></br>
                  </div>
                  <div className="username">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" onChange={handleChange} name="userName" placeholder="UserName" value={formValue.userName} style={{ borderColor: formErrors.userName ? "red" : "" }}></input>
                    <br></br><br></br>
                  </div>
                  <div className="password">
                    <i className="fa-solid fa-lock"></i>
                    <input type="password" name="password" onChange={handleChange} value={formValue.password} placeholder="Password" style={{ borderColor: formErrors.password ? "red" : "" }}></input>
                    <br></br><br></br>
                  </div>
                </div>
                  
                <button id="button" type="submit" onClick={handleSubmit} style={{color:'#165e98'}}>Submit</button>
                <br></br>
              </div>
            </div>
          </div>
    </>
  )
}

export default SignUp;
