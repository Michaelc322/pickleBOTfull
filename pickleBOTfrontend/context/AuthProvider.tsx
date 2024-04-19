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
const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            const getProfile = async () => { 
                try {
                    const {data} = await axios.get('/auth/user/');
                    console.log("data", data)
                    if(data.error){
                        console.log(data.error, "data error get profile");
                        setIsLoading(false);
                        setIsLoggedIn(false);
                    } else {
                        setIsLoading(false);
                        setUserInfo(data.user);
                        setIsLoggedIn(true);
                        console.log(isLoggedIn, "inside if else statement?")
                    }
                }
                catch (error) {
                    console.log(error, "error get profile");
                    setIsLoggedIn(false);
                    setIsLoading(false);
                }
            }
            console.log(isLoggedIn, "is logged in from context")
            getProfile();
    }, [])

    const login = () => {
      // Logic to handle login
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      console.log("Logging out")
      axios.get('/auth/logout').then(response => {
          console.log(response);
      }).catch(error => {
          console.log(error);
      })
      setIsLoggedIn(false);
    };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo, setUserInfo, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
