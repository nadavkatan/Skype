import { Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import Avatar from '../avatar/Avatar';
import {useStyles} from './styles/styles';
import { AppContext } from '../../context/Context';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setCurrentContact} from '../../features/contacts/contacsSlice';

const Contact = ({contact}) => {
    
    const {handleJoinRoom, toggleTabs} = useContext(AppContext);
    const {currentUser} = useSelector((state) => state.auth);
    const classes = useStyles();

    const dispatch = useDispatch();

  const openChat = ()=>{
    const currentUserInContactObj = contact.friends.find(friend=> friend.friendId === currentUser._id);
    console.log(currentUserInContactObj)
    const chatId = currentUserInContactObj.chatId;
    console.log('chatId: ' + chatId);
    // handleJoinRoom(chatId, contact.username);
    handleJoinRoom(chatId, contact);
    toggleTabs("Chat")
  }

    // useEffect(() => {
    //     console.log(contact);
    // },[])

  return (
    <div className={classes.contactContainer} onClick={() => dispatch(setCurrentContact(contact))}>
     <Avatar imgSrc={contact.avatar.secure_url} />
    <Typography className={classes.contactName} variant="subtitle1" onClick={()=> openChat()}>{contact.username}</Typography>
    </div>
  )
}

export default Contact