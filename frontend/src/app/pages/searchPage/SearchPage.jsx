import React, {useEffect} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import {getAllUsers} from '../../features/users/usersSlice';
import {useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import SearchResult from '../../components/searchResult/SearchResult';

const SearchPage = () => {

    const {allUsers} = useSelector((state) => state.users);
    const {currentUser} = useSelector((state) => state.auth);
    const {friendRequestsTo} = useSelector((state) => state.friendRequests);
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
                    const friend = currentUser.friends.find(friend => friend.friendId === contact._id)
                    if(friend){
                        return <SearchResult key={contact._id} foundUser={contact} areFriends={true} chatId={friend.chatId}/>
                    }
                    const alreadyRequested = friendRequestsTo.find(friendRequest => friendRequest.friend_id === contact._id);
                    if(alreadyRequested){
                        return <SearchResult key={contact._id} foundUser={contact} areFriends={false} alreadyRequested={true}/>
                    }
                    return <SearchResult key={contact._id} foundUser={contact} areFriends={false} alreadyRequested={false}/>
                })   
            }
        </div>
    </div>
  )
}

export default SearchPage