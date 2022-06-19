import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCallAnswered } from "../../features/videoCall/videoCallSlice";
import { setCurrentContact } from "../../features/contacts/contacsSlice";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "../avatar/Avatar";
import { Fab, Typography, useMediaQuery } from "@mui/material";
import { useStyles } from "./styles/styles";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Backdrop from "@mui/material/Backdrop";
import {setReceivingCall, setCaller} from '../../features/videoCall/videoCallSlice';

const IncomingCall = () => {
  const { caller } = useSelector((state) => state.videoCall);
  const { socket, openModal, setOpenModal } = useContext(AppContext);
  const {currentContact} = useSelector((state) => state.contacts)
  const classes = useStyles();
  const dispatch = useDispatch();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleAnswerCall = () => {
    setOpenModal(false);
    dispatch(setCallAnswered(true));
    dispatch(setCurrentContact(caller));
    socket.emit("answer_call", caller);
  };

  //build decline call functionality
  const handleDeclineCall = ()=>{
    setOpenModal(false);
    dispatch(setReceivingCall(false))
    socket.emit("decline_call", caller);
    dispatch(setCaller(null));
  }

  return (
    <Backdrop
      sx={{
        backgroundColor: "transparent",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={openModal}
    >
      <div className={ isSmallScreen ? classes.smScreenIncomingCallModal : classes.incomingCallModal}>
        <Paper elevation={0} className={classes.incomingCallContainer}>
          <div className={classes.incomingCallBody}>
          {caller && <>
          <Avatar imgSrc={currentContact.avatar.secure_url} avatarDimensions={isSmallScreen ? {width: 230, height: 230}: { width: 100, height: 100 }} />
          <Typography variant="subtitle2" color="white">
              {caller.username}
            </Typography>
            </>
          }
            <Typography variant="subtitle2" color="white">
              Incoming call...
            </Typography>
            <div className={classes.incomingCallBtnsContainer}>
              <Fab size={isSmallScreen ? "large" : "small"} color="success" onClick={handleAnswerCall}>
                <CallIcon />
              </Fab>
              <Fab size={isSmallScreen ? "large" : "small"}  color="error" onClick={handleDeclineCall}>
                <CallEndIcon />
              </Fab>
            </div>
          </div>
        </Paper>
      </div>
    </Backdrop>
  );
};

export default IncomingCall;
