import React, { useState, useEffect } from "react";
import CallTimer from "../callTimer/CallTimer";
import Fab from "@mui/material/Fab";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Peer } from "peerjs";
import { useRef } from "react";
import { useStyles } from "./styles/styles";
import {
  setCallEnded,
  setCallAnswered,
  setReceivingCall,
  setCallInitiator,
  storeCall,
  setOngoingCall,
} from "../../features/videoCall/videoCallSlice";
import { AppContext } from "../../context/Context";
import { useContext } from "react";

const VideoCall = () => {
  const [time, setTime] = useState(0);
  const { callInitiator, caller } = useSelector((state) => state.videoCall);
  const { currentUser } = useSelector((state) => state.auth);
  const { currentContact } = useSelector((state) => state.contacts);
  const { socket } = useContext(AppContext);

  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const dispatch = useDispatch();

  const remoteVideoRef = useRef();
  const currentUserVideoRef = useRef();
  const peerInstance = useRef();

  const callUser = (remotePeerId) => {
    // Create the peer and set the peer id to the current user id
    const peer = new Peer(currentUser._id);

    // Get the user's video and audio
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        currentUserVideoRef.current.srcObject = mediaStream;
        console.log("got user media and now calling remote user");
        // Call remote peer and pass the mediaStream receieved through getUserMedia
        const call = peer.call(remotePeerId, mediaStream);
        // Once the remote peer has answered the call, he/she sends their own mediaStream. The event bellow listens to incoming media streams
        // and pushes them to the html video element that presents the remote peer.
        call.on("stream", (remoteStream) => {
          console.log("peerjs received remote stream");
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    // Store the peer instance in useRef to have global access to it.
    peerInstance.current = peer;
  };

  const answerCall = () => {
    // Create the peer and set the peer id to the current user id
    const peer = new Peer(currentUser._id);
    //Listen for incoming calls. Once receieved, get the user video and audio and push it to the html video element of the current user.
    peer.on("call", (call) => {
      console.log("peerjs received call");
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          // if(currentUserVideoRef.current)currentUserVideoRef.current.srcObject = mediaStream;
          currentUserVideoRef.current.srcObject = mediaStream;
          // Answer the call and send the media stream to the remote user (the caller)
          call.answer(mediaStream);
          // take the stream receieved from the caller and push it to the  html video element of the remote peer.
          call.on("stream", (remoteStream) => {
            if (remoteVideoRef.current)
              remoteVideoRef.current.srcObject = remoteStream;
          });
        });
    });
    // Store the peer instance in useRef to have global access to it.
    peerInstance.current = peer;
  };

  const endCall = () => {
    if (callInitiator) {
      const callData = {
        participants: [
          {
            participant_username: currentUser.username,
            participant_id: currentUser._id,
            participant_avatar: currentUser.avatar.secure_url,
          },
          {
            participant_username: currentContact.username,
            participant_id: currentContact._id,
            participant_avatar: currentContact.avatar.secure_url,
          },
        ],
        call_duration: new Date(time).toISOString().slice(11, 19),
      };
      dispatch(storeCall(callData));
    }

    if (remoteVideoRef.current.srcObject) {
      const remotePartnerStream = remoteVideoRef.current.srcObject;
      const remotePartnerTracks = remotePartnerStream.getTracks();
      remotePartnerTracks.forEach(function (track) {
        track.stop();
      });
      remoteVideoRef.current.srcObject = null;
    }

    if (currentUserVideoRef.current.srcObject) {
      const myStream = currentUserVideoRef.current.srcObject;
      const myTracks = myStream.getTracks();

      // Stop getting user media
      myTracks.forEach(function (track) {
        track.stop();
      });
      currentUserVideoRef.current.srcObject = null;
    }

    peerInstance.current.destroy();

    //reset video call states
    dispatch(setCallEnded(true));
    dispatch(setCallAnswered(false));
    dispatch(setOngoingCall(false));
    dispatch(setCallInitiator(false));
    dispatch(setReceivingCall(false));
  };

  const handleEndCall = () => {
    endCall();
    socket.emit("end_call", currentContact);
  };

  socket.off("call_ended").on("call_ended", (data) => {
    console.log("received call ended event");
    endCall();
  });

  useEffect(() => {
    // On componentDidMount, if the user is the call initiator, the callUser function will be called, of not, the answerCall function will be called.
    if (remoteVideoRef.current && remoteVideoRef.current) {
      if (callInitiator) {
        console.log("calling user: ", currentContact._id);
        callUser(currentContact._id);
      } else {
        answerCall();
      }
    }
  }, [currentUserVideoRef, remoteVideoRef]);

  return (
    <div className={classes.videosPageContainer}>
      <div
        className={
          isSmallScreen
            ? classes.smScreenvideosContainer
            : classes.videosContainer
        }
      >
        <div
          className={
            isSmallScreen
              ? classes.smScreenTimerContainer
              : classes.timerContainer
          }
        >
          <CallTimer time={time} setTime={setTime} />
        </div>
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
            muted
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
