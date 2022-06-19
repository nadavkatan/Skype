import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Peer } from "peerjs";
import { useRef } from "react";
import { useStyles } from "./styles/styles";
import {
  setCallEnded,
  setCallAnswered,
  setReceivingCall,
  setCallInitiator,
  storeCall
} from "../../features/videoCall/videoCallSlice";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import Fab from "@mui/material/Fab";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useMediaQuery } from "@mui/material";
import CallTimer from '../callTimer/CallTimer';


const VideoCall = () => {
  const { callInitiator, caller } = useSelector((state) => state.videoCall);
  const { currentUser } = useSelector((state) => state.auth);
  const { currentContact } = useSelector((state) => state.contacts);
  const { socket } = useContext(AppContext);
  const [activateTimer, setActivateTimer] = useState(false);
  const [time, setTime] = useState(0);


  const classes = useStyles();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const callUser = (remotePeerId) => {
    const peer = new Peer(currentUser._id);
    let getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true }, (mediaStream) => {
      currentUserVideoRef.current.srcObject = mediaStream;

      const call = peer.call(remotePeerId, mediaStream);

      call.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });
    });
    peerInstance.current = peer;
  };

  const answerCall = () => {
    console.log("answerCall");
    const peer = new Peer(currentUser._id);

    peer.on("call", (call) => {
      let getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true }, (mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        call.answer(mediaStream);
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    });

    peerInstance.current = peer;
  };

  const endCall = () => {
    if(callInitiator){
      const callData={
        participants:[
          {
            participant_username: currentUser.username,
            participant_id: currentUser._id,
          },
          {
            participant_username: currentContact.username,
            participant_id: currentContact._id
          },
        ],
        call_duration: new Date(time).toISOString().slice(11, 19),
      }
      console.log(callData)
      dispatch(storeCall(callData))
    }

      const remotePartnerStream = remoteVideoRef.current.srcObject;
      const myStream = currentUserVideoRef.current.srcObject;
      const myTracks = myStream.getTracks();
      const remotePartnerTracks = remotePartnerStream.getTracks();
  
      myTracks.forEach(function (track) {
        track.stop();
      });
  
      remotePartnerTracks.forEach(function (track) {
        track.stop();
      });
  
      currentUserVideoRef.current.srcObject = null;
      remoteVideoRef.current.srcObject = null;
  
      peerInstance.current.destroy();
  
      //resetting video call states
      dispatch(setCallEnded(true));
      dispatch(setCallAnswered(false));
      dispatch(setCallInitiator(false));
      dispatch(setReceivingCall(false));
  };

  const handleEndCall = () => {
    endCall();
    socket.emit("end_call", currentContact);
  };

  socket.off("call_ended").on("call_ended", (data) => {
    console.log('received call ended event')
    endCall();
  });

  useEffect(() => {
    setActivateTimer(true)
    if (callInitiator) {
      // return callUser(currentContact.friendId)
      return callUser(currentContact._id);
    }
    answerCall();
  }, []);

  return (
    <div className={classes.videosPageContainer}>
    <CallTimer time={time} setTime={setTime}/>
      <div
        className={
          isSmallScreen
            ? classes.smScreenvideosContainer
            : classes.videosContainer
        }
      >
        <video
          ref={remoteVideoRef}
          autoPlay
          className={
            isSmallScreen
              ? classes.smScreenPartnerVideoContainer
              : classes.partnerVideoContainer
          }
        />
        <div
          className={
            isSmallScreen
              ? classes.smScreenMyVideoContainer
              : classes.myVideoContainer
          }
        >
          <video
            ref={currentUserVideoRef}
            autoPlay
            className={
              isSmallScreen ? classes.smScreenMyVideo : classes.myVideo
            }
          />
        </div>
        <Fab
          size="small"
          color="error"
          className={classes.videoCallEndCallIcon}
          onClick={handleEndCall}
        >
          <CallEndIcon />
        </Fab>
      </div>
      <div></div>
    </div>
  );
};

export default VideoCall;
