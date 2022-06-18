import React from "react";
import Avatar from "../avatar/Avatar";
import { useStyles } from "./styles/styles";
import { NewtonsCradle } from "@uiball/loaders";
import { Fab, Typography } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux'
import CallEndIcon from '@mui/icons-material/CallEnd';
import callRing from '../../assets/sounds/call-ring-macos.mp3'
import { setCallInitiator } from "../../features/videoCall/videoCallSlice";
import { AppContext } from "../../context/Context";
import { useContext } from "react";


const CallingScreen = () => {
   
  const {currentContact} = useSelector((state) => state.contacts);
  const {socket} = useContext(AppContext);
  const classes = useStyles();
  const dispatch = useDispatch();

  const cancelCall = ()=>{
    dispatch(setCallInitiator(false));
    socket.emit('cancel_call', currentContact);
  }

  console.log(currentContact)

  return (
      <div>
    <div className={classes.callingScreenHeader}>
        <Avatar imgSrc={currentContact.avatar.secure_url}/>
        <div>
            {/* <Typography variant="subtitle2">{currentContact.friendName}</Typography> */}
            <Typography variant="subtitle2">{currentContact.username}</Typography>
            <Typography className={classes.connecting} variant="subtitle1">CONNECTING</Typography>
        </div>
    </div>
    <div className={classes.callingScreenBody}>
      <div className={classes.callingAvatarContainer}>
        <Avatar avatarDimensions={{ width: 200, height: 200 }} imgSrc={currentContact.avatar.secure_url} />
      </div>
      <NewtonsCradle size={40} speed={1.4} color="black" />
      <Fab size="small" color="error" className={classes.callingScreenEndCall} onClick={cancelCall}>
    <CallEndIcon/>
    </Fab>
    </div>
    <audio src={callRing} autoPlay loop/>
    </div>
  );
};

export default CallingScreen;
