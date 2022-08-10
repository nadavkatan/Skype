import React from "react";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import VideocamIcon from "@mui/icons-material/Videocam";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Avatar from "../avatar/Avatar";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { useStyles } from "./styles/styles";
import { useMediaQuery } from "@mui/material";
import { setCallInitiator, setOngoingCall } from "../../features/videoCall/videoCallSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatHeader = () => {
  const { currentContact } = useSelector((state) => state.contacts);
  const { currentUser } = useSelector((state) => state.auth);
  const { currentRoom } = useSelector((state) => state.chat);
  const { toggleTabs, socket } = useContext(AppContext);

  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  // Once a user starts a call, socket emits an event to the server and the callInitiator is updated.
  const handleVideoCall = () => {
    dispatch(setCallInitiator(true));
    // dispatch(setOngoinCall(true));
    socket.emit("initiate_call", {
      to: currentContact._id,
      from: currentUser,
      room: currentRoom,
    });
  };

  return (
    <div
      className={
        isSmallScreen
          ? classes.chatHeaderContainer
          : classes.lgScreenChatHeaderContainer
      }
    >
      {isSmallScreen && (
        <ArrowBackIcon onClick={() => toggleTabs("ChatList")} />
      )}
      <div className={classes.chatHeaderUserInfo}>
        <Avatar
          imgSrc={currentContact.avatar.secure_url}
          loggedIn={currentContact.is_logged_in}
        />
        <Typography className={classes.headerFriendName} variant="subtitle1">
          {currentContact.username}
        </Typography>
      </div>
      <Fab size="small" color="secondary">
        <VideocamIcon onClick={() => handleVideoCall()} />
      </Fab>
    </div>
  );
};

export default ChatHeader;
