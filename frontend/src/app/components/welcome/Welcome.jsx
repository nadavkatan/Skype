import React from "react";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useStyles } from "./styles/styles";
import Avatar from "../avatar/Avatar";
import QuickAction from "../quickAction/QuickAction";
import connectPic from "../../assets/images/quick-action-pic1.png";
import { Grid } from "@mui/material";

const Welcome = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const classes = useStyles();

  return (
    <>
    <div className={classes.welcomeContainer}>
      <div className={classes.welcomContent}>
        <div className={classes.welcomeHeadingContainer}>
          <div className={classes.welcomeAvatarContainer}>
            <Avatar avatarDimensions={{ width: 100, height: 100 }} />
          </div>
          <div>
            <Typography variant="h4">Welcome!</Typography>
            <Typography className={classes.welcomeUsername} variant="h4">
              {currentUser.first_name} {currentUser.last_name}
            </Typography>
          </div>
        </div>
        <Typography className={classes.welcomeSubHeading} variant="h6">
          Here are some quick actions to get you started
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <QuickAction
              quickActionImg={connectPic}
              title={"Easy chatting with anyone on Skype!"}
              subtitle={
                "Skype let's you connect and maintain your relationship with your friends"
              }
            />
          </Grid>
          <Grid item xs={6}>
            <QuickAction
              quickActionImg={connectPic}
              title={"Easy chatting with anyone on Skype!"}
              subtitle={
                "Skype let's you connect and maintain your relationship with your friends"
              }
            />
          </Grid>
        </Grid>
      </div>
      <footer className={classes.welcomeFooter}>
      <Typography className={classes.welcomeFooterText} variant="subtitle2">You are signed in as <em>{currentUser.username}</em></Typography>
      <Typography className={classes.welcomeFooterText} variant="subtitle2">Try <span className={classes.welcomeSwitchingAccouts}>switching accounts</span> if you don't see you contacts</Typography>
    </footer>
    </div>

    </>
  );
};

export default Welcome;
