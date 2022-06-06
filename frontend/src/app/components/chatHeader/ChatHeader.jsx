import React from 'react';
import {useStyles} from './styles/styles';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Avatar from '../avatar/Avatar';
import {AppContext} from '../../context/Context';
import { useContext } from 'react';
import { useEffect } from 'react';

const ChatHeader = () => {

    const classes = useStyles();
    const {currentContact, toggleTabs} = useContext(AppContext);

    useEffect(()=>{
        console.log(currentContact)
    },[])

  return (
    <div className={classes.chatHeaderContainer}>
    <ArrowBackIcon onClick={()=> toggleTabs("ChatList")}/>
    <Avatar/>
        <Typography className={classes.headerFriendName} variant='subtitle1'>{currentContact}</Typography>
        <Fab size="small" color="secondary">
        <VideocamIcon/>
        </Fab>
    </div>
  )
}

export default ChatHeader