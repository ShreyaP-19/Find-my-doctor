import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Routes, Route } from "react-router-dom";
import findDoc from "../assets/findDoc.png";
import SignIn from "./SignIn";
import Contact from "./Contact";
import About from "./About";
import Service from "./Service";
import "./homeHeader.css";
import { useAuth } from "./AuthContext";
import HomeBody from "./HomeBody";

function HomeHeader() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  const location = useLocation();
  const [active, setActive] = useState("");

  // Update active state based on current location
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const clickEvent = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div>
      <div className="nav">
        <img id="findDoc" src={findDoc} alt="" />
        <div id="findDr" style={{ width: "250px" }}>Find My Dr</div>

        <nav className="newnav">
          <a
            onClick={(e) => {isAuthenticated? clickEvent(e, "/HomeBody"):clickEvent(e,"/")}}
            className={active === "/" || active==="/HomeBody" ? "update" : ""}
          >
            HOME
          </a>
          <a
            onClick={(e) => clickEvent(e, "/About")}
            className={active === "/About" ? "update" : ""}
          >
            ABOUT
          </a>
          <a
            onClick={(e) => clickEvent(e, "/Contact")}
            className={active === "/Contact" ? "update" : ""}
          >
            CONTACT
          </a>
          <a
            onClick={(e) => clickEvent(e, "/Service")}
            className={active === "/Service" ? "update" : ""}
          >
            SERVICE
          </a>
        </nav>

        {/* <button id="user" onClick={() => navigate("/SignIn")}>Log In</button> */}
        {isAuthenticated ? (
        // ✅ Show round div when logged in
        <div id="userIcon" style={{
          width: "50px",
          height: "50px",
          borderRadius: "50%"
        }}></div>
      ) : (
        // Show Log In button if not logged in
        <button id="user" onClick={() => navigate("/SignIn")}>Log In</button>
      )}
      </div>
      <Routes>
        <Route path="/HomeBody" element={<HomeBody/>}/>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/Contact/*" element={<Contact />} />
        <Route path="/About/*" element={<About />} />
        <Route path="/Service/*" element={<Service />} />
      </Routes>
    </div>
  );
}

export default HomeHeader;
