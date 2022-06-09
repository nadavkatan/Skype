import React from 'react';
import FriendRequest from '../friendRequest/FriendRequest';
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { Typography } from '@mui/material';
import {useStyles} from './styles/styles';
import {getUpdatedCurrentUser} from '../../features/auth/authSlice';
import {AppContext} from '../../context/Context';
import { useContext } from 'react';

const Notifications = () => {

    const {currentUser} = useSelector((state) => state.auth);
    const {friendRequests} = useContext(AppContext);
    const {friendRequestsFrom} = useSelector((state) => state.friendRequests)
    const classes = useStyles();
    const dispatch= useDispatch();

    const test=()=>{
      dispatch(getUpdatedCurrentUser(currentUser._id));
    }

    useEffect(()=>{
        console.log('Notifications: ' + currentUser)
        // if(currentUser){
        //   dispatch(getUpdatedCurrentUser(currentUser._id));
        // }
    },[])

  return (
      <div className={classes.notificationsContainer}>
      {/* <button onClick={()=>test()}>get updated user</button> */}
      <Typography className={classes.notificationsHeading} variant="h5">Notifications</Typography>
        {/* {currentUser && currentUser.friendRequestesFrom.map((friendRequest) =>{
        return <FriendRequest requestSender={friendRequest} key={friendRequest.friendId} />
    })} */}
    {/* {friendRequests.length>0 && friendRequests.map((friendRequest) =>{
        return <FriendRequest requestSender={friendRequest} key={friendRequest.sender_id} />
    })} */}
    {friendRequestsFrom.length>0 && friendRequestsFrom.map((friendRequest) =>{
        return <FriendRequest requestSender={friendRequest} key={friendRequest.sender_id} />
    })}
    </div>
  )
}

export default Notifications