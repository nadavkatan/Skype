import React, {useEffect} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import {getAllUsers} from '../../features/users/usersSlice';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import SearchResult from '../../components/searchResult/SearchResult';

const SearchPage = () => {

    const {allUsers} = useSelector((state) => state.users);
    const {currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        dispatch(getAllUsers())
    },[])

    useEffect(()=>{
        console.log(allUsers)
    },[allUsers])

    useEffect(()=>{
        console.log("search results: ", searchResults)
    },[searchResults])

  return (
    <div>
        <SearchBar users={allUsers} setSearchResults={setSearchResults} />
        <div>
            {
                searchResults.length > 0 && searchResults.map(contact=>{
                    if(currentUser.friends.some(e=> e.friendId === contact._id)){
                        return <SearchResult key={contact._id} foundUser={contact} areFriends={true}/>
                    }
                    return <SearchResult key={contact._id} foundUser={contact} areFriends={false} />
                })   
            }
        </div>
    </div>
  )
}

export default SearchPage