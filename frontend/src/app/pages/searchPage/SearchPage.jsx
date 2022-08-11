import React, {useEffect, useState} from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import {getAllUsers} from '../../features/users/usersSlice';
import SearchResult from '../../components/searchResult/SearchResult';
import {useSelector, useDispatch} from 'react-redux';


const SearchPage = () => {

    const [searchResults, setSearchResults] = useState([]);
    const {allUsers} = useSelector((state) => state.users);
    const {currentUser} = useSelector((state) => state.auth);
    const {friendRequestsTo} = useSelector((state) => state.friendRequests);
    const {contactsList, status} = useSelector((state) => state.contacts);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllUsers())
    },[])

    useEffect(()=>{
        if(allUsers.length){
            setSearchResults(allUsers)
        }
    },[allUsers])

  return (
    <div>
        <SearchBar users={allUsers} setSearchResults={setSearchResults} />
        <div style={{height: '85vh', overflowY: 'scroll'}}>
            {
                searchResults.length > 0 && searchResults.map(contact=>{
                    const friend = contactsList.find(friend => friend._id === contact._id);
                    if(friend){
                        return <SearchResult key={contact._id} foundUser={contact} areFriends={true} chatId={friend.chatId}/>
                    }
                    const alreadyRequested = friendRequestsTo.find(friendRequest => friendRequest.friend_id === contact._id);
                    if(alreadyRequested){
                        return <SearchResult key={contact._id} foundUser={contact} areFriends={false} alreadyRequested={true}/>
                    }
                    if(contact._id !== currentUser._id){
                        return <SearchResult key={contact._id} foundUser={contact} areFriends={false} alreadyRequested={false}/>
                    }
                })   
            }
        </div>
    </div>
  )
}

export default SearchPage