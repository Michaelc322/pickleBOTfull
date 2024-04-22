import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';


export default function PrivateRoutes() {
    const { isLoggedIn, isLoading } = useAuth() as {isLoggedIn: boolean, isLoading: boolean};
    console.log("isLoggedIn PRIVCATE", isLoggedIn)

    if (isLoading) {
        return <div><h1>LOADING</h1></div>;
    }

    return(
        <>
            {isLoggedIn ? <Outlet /> : <Navigate to="/login" /> }
        </>
    )
}