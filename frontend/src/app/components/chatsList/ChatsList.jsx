import React from 'react';
import { useContext } from 'react';
import {useSelector} from 'react-redux';
import {AppContext} from '../../context/Context';
import Contact from '../contact/Contact';

const ChatsList = ({contacts}) => {

    const {handleJoinRoom} = useContext(AppContext);

  return (
    <>
    {
     contacts && contacts.map(contact =>{
        return<Contact key={contact.friendName} onClick={()=>handleJoinRoom(contact.chatId)} contact={contact}/>
      })
    }
    </>
  )
}

export default ChatsList