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

const ChatHeader = () => {
  const classes = useStyles();
  const { currentContact, toggleTabs } = useContext(AppContext);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    console.log(currentContact);
  }, []);

  return (
    <div className={ isSmallScreen ? classes.chatHeaderContainer : classes.lgScreenChatHeaderContainer}>
      {isSmallScreen && (
        <ArrowBackIcon onClick={() => toggleTabs("ChatList")} />
      )}
      <div className={classes.chatHeaderUserInfo}>
        <Avatar />
        <Typography className={classes.headerFriendName} variant="subtitle1">
          {currentContact}
        </Typography>
      </div>
      <Fab size="small" color="secondary">
        <VideocamIcon />
      </Fab>
    </div>
  );
};

export default ChatHeader;
