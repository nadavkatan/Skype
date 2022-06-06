import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../../components/searchResults/SearchResults';
import {useDispatch, useSelector} from 'react-redux';
import { findUser } from '../../features/users/usersSlice';
import { useEffect } from 'react';

const SideBar = () => {

    const {allUsers, foundUser} = useSelector((state) => state.users);


    const dispatch = useDispatch();

    const searchSkype=(username)=>{
        dispatch(findUser(username)); 
     }

     useEffect(()=>{
        console.log(foundUser)
     },[])

  return (
   <>
       <SearchBar searchSkype={searchSkype}/>
       <SearchResults foundUser={foundUser} />
   </>
  )
}

export default SideBar