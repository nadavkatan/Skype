import React, { useEffect } from "react";
import Avatar from "../avatar/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getUserCalls } from "../../features/videoCall/videoCallSlice";
import { useStyles } from "./styles/styles";

const CallsList = () => {
  const { calls } = useSelector((state) => state.videoCall);
  const { currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));


  //Fetch all calls from database. In return, filter the calls to keep the ones relevant to the current user.
  useEffect(() => {
    dispatch(getUserCalls(currentUser._id));
  }, []);
 
  return (

    <Box className={isSmallScreen? classes.smScreenCallListContainer : classes.callListContainer}>
      {calls.length > 0 ? (
        calls.map((call, i) => {
          const username = call.participants.filter(
            (participant) =>
              participant.participant_username !== currentUser.username
          );
          return (
            <Box key={i} className={classes.callItemContainer}>
              <Box className={classes.callItemAvatarUsername}>
                <Avatar
                  imgSrc={username[0].participant_avatar}
                  noBadge={true}
                />
                <Typography
                  variant="subtitle1"
                  className={classes.callItemUsername}
                >
                  {username[0].participant_username}
                </Typography>
              </Box>
              <Typography variant="subtitle1">{call.call_duration}</Typography>
            </Box>
          );
        })
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant="subtitle1"
            sx={{ width: "80%", textAlign: "center" }}
          >
            You haven't made any calls yet. Video call your contacts and your
            call history will appear here!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default CallsList;
