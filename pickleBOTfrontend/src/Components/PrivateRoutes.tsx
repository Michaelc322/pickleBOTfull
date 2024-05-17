import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';


export default function PrivateRoutes() {
    const { isLoggedIn, isLoading } = useAuth() as {isLoggedIn: boolean, isLoading: boolean};
    console.log("isLoggedIn PRIVCATE", isLoggedIn)


    return isLoading ? ( <h1>Loading</h1>) : (
        <>
            {isLoggedIn ? <Outlet /> : <Navigate to="/login" /> }
        </>
    )
}