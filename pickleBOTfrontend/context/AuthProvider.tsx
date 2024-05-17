import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import { useEffect } from 'react';
const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {



  // FIRST ONE 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({loggedIn: null});
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
                        if(isLoggedIn){
                          setIsLoggedIn(false);
                        }
                        setIsLoading(false);

                    } else {
                        setUserInfo(data.user);
                        setIsLoggedIn(true);
                        setIsLoading(false);
                    }
                }
                catch (error) {
                    console.log(error, "error get profile");
                    setIsLoggedIn(false);
                    setIsLoading(false);

                }
                finally {
                    setIsLoading(false);
                }
            }

            console.log("is logged in", isLoggedIn)
            getProfile();

    }, [])

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
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo, setUserInfo, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
