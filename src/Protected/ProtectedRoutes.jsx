import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router';
import { authContext } from '../Context/authContext';

export default function ProtectedRoutes({ children }) {

    
    let { token } = useContext(authContext)

    return (
        <div>
            {token ? children : <Navigate to={"/login"} />}
        </div>
    );
}

