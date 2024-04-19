import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../../context/AuthProvider';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function PrivateRoutes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    // Example: Check if user is logged in from localStorage
    axios.defaults.withCredentials = true;

    useEffect(() => {
            const getProfile = async () => { 
                try {
                    const {data} = await axios.get('/auth/user/');
                    console.log("data", data)
                    if(data.error){
                        console.log(data.error, "data error private routes");
                        setIsLoggedIn(false);
                    } else {
                        setUserInfo(data.user);
                        setIsLoggedIn(true);
                        console.log(isLoggedIn, "inside if else statement?")
                    }
                }
                catch (error) {
                    console.log(error, "error get profile");
                    setIsLoggedIn(false);
                }
            }

            getProfile();
            console.log(isLoggedIn, userInfo, "inside private routes")


    }, [])
    console.log("isLoggedIn", isLoggedIn)
    return(
        <>
            {isLoggedIn ? <Outlet /> : <Navigate to="/login" /> }
        </>
    )
}