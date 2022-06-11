import React from "react";
import HomePage from "../../pages/homePage/HomePage";
import Welcome from "../../components/welcome/Welcome";
import { Grid } from "@mui/material";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import Chat from "../../components/chat/Chat";
import ChatHeeader from "../../components/chatHeader/ChatHeader";
import { useStyles } from "./styles/styles";

const DesktopScreen = () => {
  const { activeTab } = useContext(AppContext);
  const classes = useStyles();

  return (
    <Grid container>
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
