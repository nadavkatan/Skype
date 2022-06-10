import React from "react";
import FriendRequest from "../friendRequest/FriendRequest";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useStyles } from "./styles/styles";

const Notifications = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { friendRequestsFrom } = useSelector((state) => state.friendRequests);
  const classes = useStyles();

  useEffect(() => {
    console.log("Notifications: " + currentUser);
  }, []);

  return (
    <div className={classes.notificationsContainer}>
      <Typography className={classes.notificationsHeading} variant="h5">
        Notifications
      </Typography>
      {friendRequestsFrom.length > 0 &&
        friendRequestsFrom.map((friendRequest) => {
          return (
            <FriendRequest
              requestSender={friendRequest}
              key={friendRequest.sender_id}
            />
          );
        })}
    </div>
  );
};

export default Notifications;
