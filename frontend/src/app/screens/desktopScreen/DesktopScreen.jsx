import React, { useEffect, useContext } from "react";
import Chat from "../../components/chat/Chat";
import ChatHeeader from "../../components/chatHeader/ChatHeader";
import HomePage from "../../pages/homePage/HomePage";
import Welcome from "../../components/welcome/Welcome";
import VideoCall from "../../components/videoCall/VideoCall";
import IncomingCall from "../../components/incomingCall/IncomingCall";
import CallingScreen from "../../components/callingScreen/CallingScreen";
import Grid from "@mui/material/Grid";
import { AppContext } from "../../context/Context";
import { useStyles } from "./styles/styles";
import { useSelector } from "react-redux";

const DesktopScreen = () => {
  const { activeTab } = useContext(AppContext);
  const {callInitiator, receivingCall, callAnswered} = useSelector((state) => state.videoCall);

  const classes = useStyles();

  if(callInitiator && callAnswered) return <VideoCall/>;
  if(receivingCall && callAnswered) return <VideoCall/>;
  if(callInitiator) return <CallingScreen/>
  return (
    <Grid container>
    <IncomingCall/>
      <Grid item xs={4} lg={3}>
        <HomePage />
      </Grid>
      <Grid item xs={8} lg={9}>
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
