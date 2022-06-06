import React from "react";
import { addFriend } from "../../features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Typography } from "@mui/material";
import Fab from "@mui/material/Fab";
import DoneIcon from '@mui/icons-material/Done';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useStyles} from './styles/styles';

const FriendRequest = ({ requestSender }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const classes = useStyles();

  const confirmFriendRequest = () => {
    const data = {
      id: currentUser._id,
      username: currentUser.username,
      friendId: requestSender.sender_id,
      friendName: requestSender.sender_name,
    };
    dispatch(addFriend(data));
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
