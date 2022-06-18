import { Typography } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Avatar from '../avatar/Avatar';
import {useStyles} from './styles/styles';
import { AppContext } from '../../context/Context';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentContact} from '../../features/contacts/contacsSlice';
import Badge from '@mui/material/Badge';


const Contact = ({contact}) => {
    
    const {handleJoinRoom, toggleTabs} = useContext(AppContext);
    const {currentUser} = useSelector((state) => state.auth);
    const {unreadMessages} = useSelector((state) => state.chat);
    const [relevantUnreadMessages, setRelevantUnreadMessages] = useState([]);
    const classes = useStyles();

    const dispatch = useDispatch();

  const openChat = ()=>{
    const currentUserInContactObj = contact.friends.find(friend=> friend.friendId === currentUser._id);
    console.log(currentUserInContactObj)
    const chatId = currentUserInContactObj.chatId;
    console.log('chatId: ' + chatId);
    handleJoinRoom(chatId, contact);
    toggleTabs("Chat")
  }

    useEffect(() => {
        if(unreadMessages){
          setRelevantUnreadMessages(
            unreadMessages.filter(unreadMessage => unreadMessage.senderId === contact._id)
          )
        }
    },[unreadMessages]);


  return (
    <div className={classes.contactContainer} onClick={() => dispatch(setCurrentContact(contact))}>
    {relevantUnreadMessages.length > 0 && <Badge badgeContent={relevantUnreadMessages.length} color="primary"/>}
     <Avatar imgSrc={contact.avatar.secure_url} />
    <Typography className={classes.contactName} variant="subtitle1" onClick={()=> openChat()}>{contact.username}</Typography>
    </div>
  )
}

export default Contact