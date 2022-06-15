import React from 'react'
import { useState,useEffect } from 'react';
import {getCurrentUser} from '../../features/users/usersSlice';
import {useSelector, useDispatch} from 'react-redux';
import {AppContext} from '../../context/Context';
import { useContext } from 'react';
import {setCurrentRoom} from '../../features/chat/chatSlice';
import {setShowChat} from '../../features/chat/chatSlice';
import Contact from '../contact/Contact';
import {addContact, initializeContacts} from '../../features/contacts/contacsSlice';

const ContactsList = ({contacts}) => {

  const {currentUser}= useSelector((state) => state.auth);
  const {currentContact} = useSelector((state) => state.contacts);
  const {handleJoinRoom} = useContext(AppContext);


  const dispatch = useDispatch();

    // useEffect(()=>{
    //   console.log('mount')
    //   console.log(contacts);
    //   console.log(currentUser)
    // },[])

    // useEffect(()=>{
    //   console.log('users friends', currentUser.friends)
    //   dispatch(initializeContacts(currentUser.friends))
    // },[])

    useEffect(()=>{
      console.log(currentContact);
    },[currentContact])

  return (
    <>
    {/* <h1>Contacts</h1> */}
    {/* {
     contacts && contacts.map(contact =>{
        return <Contact key={contact.friendName} contact={contact}/>
      })
    } */}
    {
     currentUser && currentUser.friends.length > 0 && currentUser.friends.map(friend => {
        return <Contact key={friend.friendId} contact={friend}/>
      })
    }
    {/* {
      contactsList.length > 0 && contactsList.map(friend => {
        return <Contact key={friend.friendId} contact={friend}/>
      })
    } */}
    </>
  )
}

export default ContactsList