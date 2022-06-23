import React, { useEffect } from "react";
import FriendRequest from "../friendRequest/FriendRequest";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
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
              <Box key={notification.content.confirmation_text} className={classes.connectionConfirmationContainer}>
              <Typography variant="subtitle1" className={classes.connectionConfirmationText}>{notification.content.confirmation_text}</Typography>
              </Box>
            )
          }

        })
        : <Typography variant="subtitle1" sx={{textAlign:'center', marginTop:'0.5em'}}>No new notifications</Typography>
        }
    </div>
  );
};

export default Notifications;
