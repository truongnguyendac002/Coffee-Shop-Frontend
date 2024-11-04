import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/context/auth.context';
const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    if (!user || !user.id) {
        return (
            <Navigate to="/login" replace />
        );
    }
    return (
        <>
            {props.children}
        </>
    )
}
export default PrivateRoute;