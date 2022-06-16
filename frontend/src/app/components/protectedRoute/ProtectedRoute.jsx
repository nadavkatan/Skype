import React from 'react';
import {useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

    const {status, isAuth} = useSelector((state) => state.auth);
    
    
    if(status === 'loading' || isAuth === "undefined") return <div>Loading...</div>;
    if(isAuth===false) return <Navigate to='/login' replace />

  return children
}

export default ProtectedRoute