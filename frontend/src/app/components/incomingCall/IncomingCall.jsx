import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCallAnswered } from "../../features/videoCall/videoCallSlice";
import { setCurrentContact } from "../../features/contacts/contacsSlice";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "../avatar/Avatar";
import { Fab, Typography } from "@mui/material";
import { useStyles } from "./styles/styles";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import Backdrop from "@mui/material/Backdrop";

const IncomingCall = () => {
  const { caller } = useSelector((state) => state.videoCall);
  const { socket, openModal, setOpenModal } = useContext(AppContext);
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleAnswerCall = () => {
    setOpenModal(false);
    dispatch(setCallAnswered(true));
    dispatch(setCurrentContact(caller));
    socket.emit("answer_call", caller);
  };

  //build decline call functionality

  return (
    <Backdrop
      sx={{
        backgroundColor: "transparent",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={openModal}
    >
      <div className={classes.incomingCallModal}>
        <Paper elevation={0} className={classes.incomingCallContainer}>
          <div className={classes.incomingCallBody}>
            <Avatar avatarDimensions={{ width: 100, height: 100 }} />
            <Typography variant="subtitle2" color="white">
              {caller.username}
            </Typography>
            <Typography variant="subtitle2" color="white">
              Incoming call...
            </Typography>
            <div className={classes.incomingCallBtnsContainer}>
              <Fab size="small" color="success" onClick={handleAnswerCall}>
                <CallIcon />
              </Fab>
              <Fab size="small" color="error">
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
