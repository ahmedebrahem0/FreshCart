import { Navigate } from "react-router-dom";
import Login from './../pages/Authentication/Login';

export default function ProtectedRoute({children}) {

    if (localStorage.getItem('tkn') == null) {
        
        return <Navigate to='/Login'></Navigate>
    }

    return<>
        {children}
    </>;
}
