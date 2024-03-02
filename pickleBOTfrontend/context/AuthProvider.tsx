import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
import React from 'react';


const AuthContext = createContext({});


export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [auth, setAuth] = useState({});
    // useEffect(() => {
    //     if(!user){
    //         axios.get('/verify').then(({data}) => {
    //             setUser(data);
    //         })
    //     }
    // }, [])
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;