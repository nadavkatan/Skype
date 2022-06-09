import React from "react";
import Avatar from "../avatar/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import {useStyles} from './styles/styles';
// import {sendFriendRequest, storeFriendRequest} from '../../features/users/usersSlice';
import {sendFriendRequest, storeFriendRequest} from '../../features/friendRequests/friendRequestsSlice';
import {useSelector, useDispatch} from 'react-redux';

const SearchResult = ({ foundUser }) => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state) => state.auth)

  const handleSendFriendRequest = ()=>{

    const args = {
      id: currentUser._id,
      friendName: currentUser.username,
      friendId: foundUser._id
    }

    const storeFriendRequestArgs = {
      sender_id:currentUser._id,
      sender_name:currentUser.username,
      receiver_id: foundUser._id,
      receiver_name: foundUser.username
    }

    dispatch(sendFriendRequest(args));
    dispatch(storeFriendRequest(storeFriendRequestArgs))
  }

  return (
    <div className={classes.searchResultContainer}>
      <div className={classes.searchResult}>
        <Avatar />
        <Typography variant="subtitle1" className={classes.searchResultText}>{foundUser.username}</Typography>
      </div>
      <Fab size="small" color="secondary" onClick={handleSendFriendRequest} className={classes.sendFriendRequest}>
        <AddIcon />
      </Fab>
    </div>
  );
};

export default SearchResult;
