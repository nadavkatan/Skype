import React from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { Navigate } from 'react-router-dom';
import {checkAuth} from '../../features/auth/authSlice';

const ProtectedRoute = ({children}) => {

    const {status, isAuth} = useSelector((state) => state.auth);
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log("isAuth is: " + isAuth);
        console.log(state)
    },[isAuth])
    
    // useEffect(()=>{
    //     dispatch(checkAuth());
    // },[])
    
    if(status === 'loading' || isAuth === "undefined") return <div>Loading...</div>;
    // if(!isAuth) return <Navigate to='/login' replace />
    if(isAuth===false) return <Navigate to='/login' replace />

  return children
// return <div>ProtectedRoute</div>
}

export default ProtectedRoute