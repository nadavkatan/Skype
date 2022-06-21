import React from "react";
import Avatar from "../avatar/Avatar";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useStyles } from "./styles/styles";

const MessageFriend = ({ message }) => {
  const {currentContact} = useSelector((state) => state.contacts);

  const classes = useStyles();

  return (
    <div className={classes.messageWrapper}>
      <div className={classes.avatarContainer}>
        <Avatar imgSrc={currentContact.avatar.secure_url} loggedIn={currentContact.is_logged_in}/>
      </div>
      <div className={classes.messageContainer}>
        <Typography className={classes.messageTime} variant="subtitle1">
          {message.author}, {message.time}
        </Typography>
        <div className={classes.message}>
          <Typography variant="subtitle2">{message.message}</Typography>
        </div>
      </div>
    </div>
  );
};

export default MessageFriend;
