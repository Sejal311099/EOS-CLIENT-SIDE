import React, { useEffect } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './App.css'
import '../src/Assets/Css/custom.css';
import Header from './Component/Common/Header';
import Signup from './Pages/Signup'
import RegisterAsProfessional from './Pages/RegisterAsProfessional'
import { BrowserRouter as Router, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import ProjectEstimation from './Pages/ProjectEstimation'
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import ChangePassword from './Pages/ChangePassword';
import Footer from './Component/Common/Footer';
import Home from './Pages/Home'
import UserProfile from './Pages/UserProfile';
import ServicesContainer from './Components/ServicesContainer';
import OtpVerification from './Pages/OtpVerification';
import SingleService from './Components/SingleService';
import PageNotFound from './Pages/PageNotFound';
import Search from './Pages/Search';


function App() {

  const navigate = useNavigate();
  // useEffect(() => {
  //   const loggedInUser = sessionStorage.getItem("USEREOS");
  //   if (!loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     navigate("/")
  //   }
  // }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={< Login />} />/
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/register-as-professional" element={<RegisterAsProfessional />} />
        <Route path="/" element={<Home />} />
        <Route exact path="/project-estimation" element={<ProjectEstimation />} />
        <Route exact path="/user-profile" element={<UserProfile />} />
        <Route exact path="/services/:id" element={<ServicesContainer />} />
        <Route exact path="/view-cart" element={<SingleService /> } />
        <Route exact path="*" element={<PageNotFound/>} />
        <Route exact path="/search" element={<Search/>} />

      </Routes>
      <Footer />
    </>

  )
}
export default App;
