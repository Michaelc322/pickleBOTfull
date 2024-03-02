
import Navbar from "./Components/Navbar.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home.tsx";
import GetStarted from "./Pages/GetStarted.tsx";
import { Helmet } from "react-helmet";
import Footer from "./Components/Footer.tsx";
import Register from "./Pages/Register.tsx";
import LogIn from "./Pages/LogIn.tsx";
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import ForgotPassword from "./Pages/ForgotPassword.tsx";
import ResetPassword from "./Pages/ResetPassword.tsx";


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


export default function App(){
  return(
    <>


        <Helmet>
          <title>pickleBOT | Reserve Courts</title>
          <link rel="icon" type="image/png" href="./images/pickleball.png"/>
        </Helmet>
          <Navbar/>
          <Toaster position='top-center' toastOptions={{duration: 2000,
          style:{
            padding: '16px',
            fontFamily: 'Poppins'
          }}}/>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/getstarted" element={<GetStarted/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password/:token" element={<ResetPassword/>}/>
              </Routes>
          </BrowserRouter>

        <Footer/>
    </>
  )
}
