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
                        setIsLoggedIn(false);
                    } else {
                        setUserInfo(data.user);
                        setIsLoggedIn(true);
                    }
                }
                catch (error) {
                    console.log(error, "error get profile");
                    setIsLoggedIn(false);
                }
                finally {
                    setIsLoading(false);
                }
            }

            console.log("is logged in", isLoggedIn)
            getProfile();

    }, [setIsLoggedIn, isLoggedIn])

    const login = () => {
      // Logic to handle login
      setIsLoggedIn(true);
    };
  
    const logout = () => {
      // console.log("Logging out")
      // axios.post('/auth/logout').then(response => {
      //     console.log(response);
      // }).catch(error => {
      //     console.log(error);
      // })
      setIsLoggedIn(false);
    };
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo, setUserInfo, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
