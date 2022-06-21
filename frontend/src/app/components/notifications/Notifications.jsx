import React, { useEffect } from "react";
import FriendRequest from "../friendRequest/FriendRequest";
import Typography from "@mui/material/Typography";
import {deleteAllConnectionNotifications} from '../../features/notifications/notificationsSlice';
import { useSelector, useDispatch } from "react-redux";
import { useStyles } from "./styles/styles";

const Notifications = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const {notifications } = useSelector((state) => state.notifications);

  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    return ()=>{
      dispatch(deleteAllConnectionNotifications(currentUser._id))
  }
},[])

  return (
    <div className={classes.notificationsContainer}>
        {notifications.length > 0 ?
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

        })
        : <Typography variant="subtitle2" sx={{textAlign:'center'}}>No new notifications</Typography>
        }
    </div>
  );
};

export default Notifications;
