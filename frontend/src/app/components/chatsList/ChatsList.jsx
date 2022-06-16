import React from 'react';
import { useContext } from 'react';
import {useSelector} from 'react-redux';
import {AppContext} from '../../context/Context';
import Contact from '../contact/Contact';

const ChatsList = ({contacts}) => {

    const {handleJoinRoom} = useContext(AppContext);
    const {contactsList} = useSelector((state) => state.contacts);
    // onClick={()=>handleJoinRoom(contact.chatId)}
  return (
    <>
    {/* {
     contacts && contacts.map(contact =>{
        return<Contact key={contact.friendName}  contact={contact}/>
      })
    } */}
    {
      contactsList && contactsList.map(contact =>{
        return<Contact key={contact._id}  contact={contact}/>
      })
    }
    </>
  )
}

export default ChatsList