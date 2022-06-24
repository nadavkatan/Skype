import React, { useEffect } from "react";
import HomePage from "../../pages/homePage/HomePage";
import VideoCall from "../../components/videoCall/VideoCall";
import IncomingCall from "../../components/incomingCall/IncomingCall";
import CallingScreen from "../../components/callingScreen/CallingScreen";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";

const MobileScreen = () => {
  const {callInitiator, receivingCall, callAnswered} = useSelector((state) => state.videoCall);

  if(callInitiator && callAnswered) return <VideoCall/>;
  if(receivingCall && callAnswered) return <VideoCall/>;
  if(callInitiator) return <CallingScreen/>

  return (
    <Grid container>
    <IncomingCall/>
      <Grid item xs={12}>
        <HomePage />
      </Grid>
    </Grid>
  );
};

export default MobileScreen;
