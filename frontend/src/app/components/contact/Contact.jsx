import { Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import Avatar from '../avatar/Avatar';
import {useStyles} from './styles/styles';
import { AppContext } from '../../context/Context';
import { useContext } from 'react';

const Contact = ({contact}) => {
    
    const {handleJoinRoom, toggleTabs} = useContext(AppContext);
    const classes = useStyles();

  const openChat = ()=>{
    handleJoinRoom(contact.chatId, contact.friendName);
    toggleTabs("Chat")
  }

    // useEffect(() => {
    //     console.log(contact);
    // },[])

  return (
    <div className={classes.contactContainer}>
     <Avatar />
    <Typography className={classes.contactName} variant="subtitle1" onClick={()=> openChat()}>{contact.friendName}</Typography>
    </div>
  )
}

export default Contact