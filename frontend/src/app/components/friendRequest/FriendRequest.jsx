import React from "react";
import { addFriend } from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useStyles} from './styles/styles';
// import {deleteFriendRequest} from '../../features/users/usersSlice';
import {deleteFriendRequest} from '../../features/friendRequests/friendRequestsSlice';
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import {setFriendRequestsFrom} from '../../features/friendRequests/friendRequestsSlice';

const FriendRequest = ({ requestSender }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const {friendRequestsFrom} =useSelector((state) => state.friendRequests);
  const classes = useStyles();

  const confirmFriendRequest = () => {
    const data = {
      id: currentUser._id,
      username: currentUser.username,
      friendId: requestSender.sender_id,
      friendName: requestSender.sender_name,
    };
    dispatch(addFriend(data));

    const deleteFriendRequestData={
      sender_id: requestSender.sender_id,
      receiver_id: requestSender.receiver_id
    }
    
    dispatch(deleteFriendRequest(deleteFriendRequestData))
    setFriendRequestsFrom(friendRequestsFrom.filter(friendRequest => {
      return friendRequest.sender_id !== requestSender.sender_id && friendRequest.receiver_id !== requestSender.receiver_id
    }));

    //delete friend request from user document
  };

  return (
    // <div>
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
        <Fab size="small" color="error">
    <DeleteForeverIcon/>
        </Fab>
          {/* <Button
           variant="contained" color="primary"
            onClick={confirmFriendRequest}
          >
            Confirm
          </Button>
          <Button variant="contained" color="error" >Decline</Button> */}
        </Grid>
      </Grid>
    // </div>
  );
};

export default FriendRequest;