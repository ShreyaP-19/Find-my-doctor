import React,{useState,useEffect} from 'react'
import findDoc from "../assets/findDoc.png"
import './homeHeader.css'
import {Routes,Route,useNavigate} from 'react-router-dom'
import SignIn from './SignIn'
import Contact from './Contact'
import About from './About'
import Service from './Service'

function HomeHeader() {
  const navigate=useNavigate();
  const [active, setActive] = useState("home");
  useState(location.pathname); 
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);
  const clickEvent=(e,path)=>{
    e.preventDefault();
    setActive(path);
    navigate(path)  
  };
  return (
    <div>
      <div className="nav">
              <img id="findDoc" src={findDoc} alt=""  />
              <div id="findDr" style={{width:"250px"}}>Find My Dr</div>
              {/* <div style={{width:"1000px"}}></div> */}
              {/* <img id="user" src={User} alt=""  /> */}

              <nav className="newnav">
        <a  onClick={(e) => clickEvent(e, "/")}
            className={active === "/" ? "update" : ""}>HOME</a>
      <a onClick={(e) => clickEvent(e, "/About")} className={active === "/About" ? "update" : ""}>ABOUT</a>
      <a onClick={(e) => clickEvent(e, "/Contact")} className={active === "/Contact" ? "update" : ""}>CONTACT</a>
      <a onClick={(e) => clickEvent(e, "/Service")}  className={active === "/Service" ? "update" : ""}>SERVICE</a>

        </nav>

        <button id="user" onClick={()=>navigate('/SignIn')}>Log In</button>
      </div>
          <Routes>
            <Route path='/SignIn' element={<SignIn/>}/>
            <Route path='/Contact/*' element={<Contact/>}/>
            <Route path='/About/*' element={<About/>}/>
            <Route path='/Service/*' element={<Service/>}/>
          </Routes>
    </div>
  )
}

export default HomeHeader
