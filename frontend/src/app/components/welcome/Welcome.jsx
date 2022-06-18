import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./styles/styles";
import Avatar from "../avatar/Avatar";
import QuickAction from "../quickAction/QuickAction";
import connectPic from "../../assets/images/quick-action-pic1.png";
import Popover from '@mui/material/Popover';
import {useNavigate} from 'react-router-dom';
import { Grid } from "@mui/material";
import {logout} from '../../features/auth/authSlice';
import {setShowChat} from '../../features/chat/chatSlice';

const Welcome = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const classes = useStyles();
  const dispatch= useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

const handleLogout = () => {
  console.log('logout');
  dispatch(logout());
  dispatch(setShowChat(false));
  navigate("/login");
};

  return (
    <>
    <div className={classes.welcomeContainer}>
      <div className={classes.welcomContent}>
        <div className={classes.welcomeHeadingContainer}>
          <div className={classes.welcomeAvatarContainer}>
          {currentUser && <Avatar avatarDimensions={{ width: 100, height: 100 }} imgSrc={currentUser.avatar.secure_url} />}
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
      <Typography className={classes.welcomeFooterText} variant="subtitle2">
      Try {" "} 
      <span className={classes.welcomeSwitchingAccouts} aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
         switching accounts
        </span> {" "}
         if you don't see you contacts</Typography>
      <Popover
        onClick={()=>handleLogout()}
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Logout</Typography>
      </Popover>
    </footer>
    </div>

    </>
  );
};

export default Welcome;
