
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
import BotStart from "./Pages/BotStart.tsx";
import PrivateRoutes from "./Components/PrivateRoutes.tsx";
import { useAuth } from "../context/AuthProvider.tsx";
import PageNotFound from "./Pages/PageNotFound.tsx";

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;


export default function App(){
  const {userInfo} = useAuth() as {userInfo: any};
  return (
    <>
        <Helmet>
          <title>pickleBOT | Reserve Courts</title>
          <link rel="icon" type="image/png" href="./images/pickleball.png"/>
        </Helmet>
          <Navbar/>
          <Toaster position='top-center' toastOptions={{duration: 2000,
          style:{
            padding: '16px',
            fontFamily: 'Poppins',
            fontWeight: 700,
          }}}/>
          <> 
          { userInfo.loggedIn === null ? <div><h1>LOADING</h1></div> : (         
          <BrowserRouter>
              <Routes>
                <Route element={<PrivateRoutes/>}>
                  <Route path="/reserve-courts" element={<BotStart/>}/>
                  <Route path="/getstarted" element={<GetStarted/>}/>
                </Route>
                <Route path="/" element={<Home/>}/>
                {/* <Route path="/getstarted" element={<GetStarted/>}/> */}
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password/:token" element={<ResetPassword/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                {/* <Route path="/reserve-courts" element = {<BotStart/>}/> */}
              </Routes>
          </BrowserRouter> 
          )}
          </>


        <Footer/>
    </>
  )
}
