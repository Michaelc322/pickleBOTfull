import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {



  // FIRST ONE 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
    // Example: Check if user is logged in from localStorage
    axios.defaults.withCredentials = true;
    useEffect(() => {
            axios.get("/auth/user/")
            .then(res=> {
                setUserInfo(res.data.user);
                setIsLoggedIn(true);
                console.log("setting log in to true")
            }).catch(error => {
                console.log("User is not logged in; log in is false")
                setIsLoggedIn(false);
            
            })
    }, [])

    const login = () => {
      // Logic to handle login
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      console.log("Logging out")
      axios.post('/auth/logout').then(response => {
          console.log(response);
      }).catch(error => {
          console.log(error);
      })
      setIsLoggedIn(false);
    };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
