import React from 'react'
import DoctorHeader from './DoctorHeader'
import DoctorImage from './DoctorImage'
import HomeFooter from './HomeFooter'
import { Navigate,useNavigate,Route, Routes } from 'react-router-dom'
import SignIn from './SignIn'
import { useAuth } from './AuthContext';
import ViewHospital from './ViewHospital'

function AdminBody() {
   const navigate=useNavigate();
   const { isAuthenticated } = useAuth(); // Add this inside the component
   if (!isAuthenticated) {
    return <Navigate to="/SignIn" replace />; // ✅ Redirects unauthenticated users
  }
  return (
    <div>
      {isAuthenticated ? (
        <div>
      <DoctorHeader/>
      <DoctorImage/>
      <div id="body">
        <div id="speciality">Admin Dashboard</div>
        <div id="test">
            <div id="para">Effortlessly manage hospital administrators by adding them, ensuring smooth and efficient hospital operations.</div>
        </div>
        <div id="test">
        <button id="card" 
        onClick={()=>navigate('/ViewHospital')}
        >
            <h2 style={{marginBottom:"17px"}}>Add hospital</h2>
            <p id="notes">Want to add the hospital admins? Click here!</p>
        </button>
        </div>
        </div>
      <HomeFooter/>
      </div>):(<div><SignIn /></div> )}
      <Routes>
        <Route path='/ViewHospital' element={<ViewHospital/>}/>
      </Routes>
    </div>
  )
}

export default AdminBody;
