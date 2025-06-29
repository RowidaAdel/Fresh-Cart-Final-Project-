import React, { useContext } from 'react';
import { authContext } from '../Context/authContext';
import { Navigate } from 'react-router';

export default function LoginProtected({ children }) {
    let { token } = useContext(authContext)
    return (
        <>
            {!token ? children : <Navigate to={"/home"} />}
        </>
    );
}
