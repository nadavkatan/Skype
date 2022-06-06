import { Typography } from "@mui/material";
import React from "react";
import Avatar from "../avatar/Avatar";
import { useStyles } from "./styles/styles";

const MessageFriend = ({ message }) => {
  const classes = useStyles();

  return (
    <div className={classes.messageWrapper}>
      <div className={classes.avatarContainer}>
        <Avatar/>
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
