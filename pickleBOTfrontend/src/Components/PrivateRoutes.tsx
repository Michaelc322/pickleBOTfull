import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';
import LoadingPage from '../Pages/LoadingPage';


export default function PrivateRoutes() {
    const { isLoggedIn, isLoading } = useAuth() as {isLoggedIn: boolean, isLoading: boolean};
    console.log("isLoggedIn PRIVCATE", isLoggedIn)


    return isLoading ? ( <LoadingPage/>) : (
        <>
            {isLoggedIn ? <Outlet /> : <Navigate to="/login" /> }
        </>
    )
}