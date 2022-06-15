import React from "react";
import FriendRequest from "../friendRequest/FriendRequest";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Typography } from "@mui/material";
import { useStyles } from "./styles/styles";
import {setNotifications} from '../../features/friendRequests/friendRequestsSlice';
import {deleteAllConnectionNotifications} from '../../features/notifications/notificationsSlice';

const Notifications = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { friendRequestsFrom } = useSelector((state) => state.friendRequests);
  const {notifications } = useSelector((state) => state.notifications);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    return ()=>{
      dispatch(deleteAllConnectionNotifications(currentUser._id))
  }
},[])

useEffect(() => {
  console.log(notifications)
},[notifications])


  return (
    <div className={classes.notificationsContainer}>
      {/* <Typography className={classes.notificationsHeading} variant="h5">
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
        })} */}
        {notifications.length > 0 &&
        notifications.map((notification) => {
          if(notification.title === "friend_request"){
            const requestSender = {
              ...notification.content,
              sender_id: notification.sender_id
            }
            return (
            <FriendRequest
              requestSender={requestSender}
              key={notification.sender_id}
            />
          )
          }
          if(notification.title === "connection_confirmation"){
            return (
            <Typography variant="subtitle1" key={notification.content.confirmation_text}>{notification.content.confirmation_text}</Typography>
            )
          }

        })}
    </div>
  );
};

export default Notifications;
