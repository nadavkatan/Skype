import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAllUsers, findUser} from '../../features/users/usersSlice';

const SearchBar = () => {

    const [username, setUsername] = useState("");

    const {allUsers, foundUser} = useSelector((state) => state.users);
    const dispatch = useDispatch();

    const handleCLick=(username)=>{
       dispatch(findUser(username)); 
    }

    useEffect(()=>{
        console.log(foundUser);
    },[foundUser])

  return (
    <label>
        <span>Search contacts</span>
        <input type="text" value={username} onChange={e=> setUsername(e.target.value)} />
        <button onClick={()=>handleCLick(username)}>Search</button>
        <button onClick={()=>console.log(foundUser)}>log user</button>
    </label>
  )
}

export default SearchBar