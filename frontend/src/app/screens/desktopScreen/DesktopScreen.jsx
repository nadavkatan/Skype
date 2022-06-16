import React from "react";
import HomePage from "../../pages/homePage/HomePage";
import Welcome from "../../components/welcome/Welcome";
import { Grid } from "@mui/material";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import Chat from "../../components/chat/Chat";
import ChatHeeader from "../../components/chatHeader/ChatHeader";
import { useStyles } from "./styles/styles";
import VideoCall from "../../components/videoCall/VideoCall";
import IncomingCall from "../../components/incomingCall/IncomingCall";
import CallingScreen from "../../components/callingScreen/CallingScreen";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const DesktopScreen = () => {
  const { activeTab } = useContext(AppContext);
  const {callInitiator, receivingCall, callAnswered} = useSelector((state) => state.videoCall);
  const classes = useStyles();

  useEffect(() => {
    console.log(callAnswered)
  },[callAnswered])

  if(callInitiator && callAnswered) return <VideoCall/>;
  if(receivingCall && callAnswered) return <VideoCall/>;
  if(receivingCall) return <IncomingCall/>;
  if(callInitiator) return <CallingScreen/>
  // if(receivingCall) return <VideoCall/>;
  // if(callInitiator) return <VideoCall/>

  return (
    <Grid container>
    <IncomingCall/>
      <Grid item xs={3}>
        <HomePage />
      </Grid>
      <Grid item xs={9}>
        {activeTab === "Chat" ? (
          <div className={classes.lgScreenChatContainer}>
            <ChatHeeader />
            <Chat />
          </div>
        ) : (
          <Welcome />
        )}
      </Grid>
    </Grid>
  );
};

export default DesktopScreen;