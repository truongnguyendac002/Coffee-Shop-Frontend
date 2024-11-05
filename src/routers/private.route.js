import React from 'react';
import { Navigate } from 'react-router-dom';
import {  useSelector } from "react-redux";
const PrivateRoute = (props) => {
    
    const user = useSelector((state) => state?.user?.user);
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