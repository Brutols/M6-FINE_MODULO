import {Outlet} from "react-router-dom";
import LoginPage from "../pages/LoginPage";


const useAuth = () => {
    return JSON.parse(localStorage.getItem('auth'));
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()
    return isAuth ? <Outlet /> : <LoginPage />;
}

export default ProtectedRoutes;