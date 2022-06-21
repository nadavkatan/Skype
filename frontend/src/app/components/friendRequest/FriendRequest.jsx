import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { addFriend } from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import {useStyles} from './styles/styles';
import { createNotification, deleteNotification, deleteNotificationFromState, convertNotification} from "../../features/notifications/notificationsSlice";
import "react-toastify/dist/ReactToastify.css";

const FriendRequest = ({ requestSender }) => {
  
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const classes = useStyles();

  const confirmFriendRequest = () => {
    // Check that the request sender is not already an existing friend of the current user
    if(!currentUser.friends.some(e=> e.friendId === requestSender.sender_id)){
      const data = {
        id: currentUser._id,
        username: currentUser.username,
        friendId: requestSender.sender_id,
        friendName: requestSender.sender_name,
      };

      //add the friend to database
      dispatch(addFriend(data));
      //convert notification from friendRequest to connection confirmation
      dispatch(convertNotification({title:"friend_request", sender_id:requestSender.sender_id, newNotification: {user_id:currentUser._id, title:"connection_confirmation", content:{confirmation_text:`You are now connected with ${requestSender.sender_name}`}}}))
      //Delete friend Request from database
      dispatch(deleteNotification({user_id:currentUser._id, sender_id:requestSender.sender_id}))
      //create notification of connection confirmation for the friend request sender
      dispatch(createNotification({user_id:requestSender.sender_id, title:"connection_confirmation", content:{confirmation_text:`You are now connected with ${currentUser.username}`}}))
    }
  };

  const declineFriendRequest = ()=>{
    dispatch(deleteNotification({user_id:currentUser._id, sender_id:requestSender.sender_id}))
    dispatch(deleteNotificationFromState({title:"friend_request", sender_id:requestSender.sender_id}))

  }

  return (
      <Grid container spacing={2} className={classes.friendRequestContainer}>
        <Grid item xs={8} className={classes.friendRequestTextContainer}>
          <Typography variant="subtitle2" className={classes.friendRequestText}>
            Youv'e got a friend request from {requestSender.sender_name}
          </Typography>
        </Grid>
        <Grid item xs={4} className={classes.friendRequestFabsContainer}>
        <Fab color="primary" size="small" className={classes.friendRequestFab} onClick={confirmFriendRequest}>
    <DoneIcon/>
        </Fab>
        <Fab size="small" color="error" onClick={declineFriendRequest}>
    <DeleteForeverIcon/>
        </Fab>
        </Grid>
      </Grid>
  );
};

export default FriendRequest;
