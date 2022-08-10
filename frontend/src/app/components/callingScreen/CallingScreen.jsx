import React from "react";
import Avatar from "../avatar/Avatar";
import { NewtonsCradle } from "@uiball/loaders";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import CallEndIcon from "@mui/icons-material/CallEnd";
import callRing from "../../assets/sounds/call-ring-macos.mp3";
import { useDispatch, useSelector } from "react-redux";
import { setCallInitiator, setOngoingCall } from "../../features/videoCall/videoCallSlice";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { useStyles } from "./styles/styles";

const CallingScreen = () => {

  const { currentContact } = useSelector((state) => state.contacts);
  const { socket } = useContext(AppContext);
  const dispatch = useDispatch();
  const classes = useStyles();

  //Cancel video call, update server and peer
  const cancelCall = () => {
    dispatch(setCallInitiator(false));
    dispatch(setOngoingCall(false));
    socket.emit("cancel_call", currentContact);
  };

  return (
    <div>
      <div className={classes.callingScreenHeader}>
        <Avatar
          imgSrc={currentContact.avatar.secure_url}
          loggedIn={currentContact.is_logged_in}
        />
        <div>
          <Typography variant="subtitle2">{currentContact.username}</Typography>
          <Typography className={classes.connecting} variant="subtitle1">
            CONNECTING
          </Typography>
        </div>
      </div>
      <div className={classes.callingScreenBody}>
        <div className={classes.callingAvatarContainer}>
          <Avatar
            avatarDimensions={{ width: 200, height: 200 }}
            imgSrc={currentContact.avatar.secure_url}
            loggedIn={currentContact.is_logged_in}
          />
        </div>
        <NewtonsCradle size={40} speed={1.4} color="black" />
        <Fab
          size="small"
          color="error"
          className={classes.callingScreenEndCall}
          onClick={cancelCall}
        >
          <CallEndIcon />
        </Fab>
      </div>
      <audio src={callRing} autoPlay loop />
    </div>
  );
};

export default CallingScreen;
