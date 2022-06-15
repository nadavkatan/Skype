import React from "react";
import { useStyles } from "./styles/styles";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "../avatar/Avatar";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import {setCallInitiator} from '../../features/videoCall/videoCallSlice';
import { useDispatch, useSelector } from "react-redux";

const ChatHeader = () => {
  const classes = useStyles();
  const { toggleTabs, socket } = useContext(AppContext);
  const {currentContact} = useSelector((state) => state.contacts);
  const {currentUser} = useSelector((state) => state.auth);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(currentContact);
  }, []);

  const handleVideoCall = ()=>{
    dispatch(setCallInitiator(true));
    socket.emit('initiate_call', {to:currentContact.friendId, from: {username: currentUser.username, friendId: currentUser._id, socket_id: currentContact.socket_id, avatar:""}})
  }

  return (
    <div className={ isSmallScreen ? classes.chatHeaderContainer : classes.lgScreenChatHeaderContainer}>
      {isSmallScreen && (
        <ArrowBackIcon onClick={() => toggleTabs("ChatList")} />
      )}
      <div className={classes.chatHeaderUserInfo}>
        <Avatar />
        <Typography className={classes.headerFriendName} variant="subtitle1">
          {currentContact.friendName}
        </Typography>
      </div>
      <Fab size="small" color="secondary">
        <VideocamIcon onClick={()=> handleVideoCall()}/>
      </Fab>
    </div>
  );
};

export default ChatHeader;
