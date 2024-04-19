import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';


export default function PrivateRoutes() {
    const { isLoggedIn } = useAuth() as { isLoggedIn: boolean };
    console.log("isLoggedIn", isLoggedIn)
    return(
        <>
            {isLoggedIn ? <Outlet /> : <Navigate to="/login" /> }
        </>
    )
}