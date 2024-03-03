import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Example: Check if user is logged in from localStorage
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            // Set the Authorization header with the token
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            axios.get("/auth/user/", config)
            .then(res=> {
                console.log("User is logged in", res.data)
                setIsLoggedIn(true);
            }).catch(error => {
                console.log("User is not logged in")
                setIsLoggedIn(false);
            
            })
        }
        else{
            console.log("token is missing")
        }
    }, [])
  
  const login = () => {
    // Your login logic here
    setIsLoggedIn(true);
  };

  const logout = () => {
    axios.get('/auth/logout')
    .then(res => {
      console.log(res);
    })
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
