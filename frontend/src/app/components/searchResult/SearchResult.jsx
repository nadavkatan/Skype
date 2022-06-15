import React from "react";
import Avatar from "../avatar/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import { useStyles } from "./styles/styles";
import ChatIcon from "@mui/icons-material/Chat";
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
// import {sendFriendRequest, storeFriendRequest} from '../../features/users/usersSlice';
import {
  sendFriendRequest,
  storeFriendRequest,
  setFriendRequestsTo
} from "../../features/friendRequests/friendRequestsSlice";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { createNotification } from "../../features/notifications/notificationsSlice";

const SearchResult = ({ foundUser, areFriends, chatId, alreadyRequested }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { toggleTabs, handleJoinRoom } = useContext(AppContext);

  const handleSendFriendRequest = () => {
    if (currentUser.friends.some((e) => e.friendId === foundUser._id)) {
      return toast.error(
        `You are already connected with ${foundUser.username}`
      );
    }

    const friendRequestData = {
      user_id: foundUser._id,
      sender_id: currentUser._id,
      title: "friend_request",
      content: {
        sender_name: currentUser.username,
        receiver_id: foundUser._id,
        receiver_name: foundUser.username,
        confirmation_text: "",
      },
    };

    dispatch(createNotification(friendRequestData));
    toast.success("Connection request sent successfully")
    dispatch(setFriendRequestsTo({friend_id: foundUser._id}))
    // const args = {
    //   id: currentUser._id,
    //   friendName: currentUser.username,
    //   friendId: foundUser._id,
    // };

    // const storeFriendRequestArgs = {
    //   sender_id: currentUser._id,
    //   sender_name: currentUser.username,
    //   receiver_id: foundUser._id,
    //   receiver_name: foundUser.username,
    // };

    // dispatch(sendFriendRequest(args));
    // dispatch(storeFriendRequest(storeFriendRequestArgs));
  };

  const openChat = () => {
    handleJoinRoom(chatId, foundUser.username);
    toggleTabs("Chat");
  };

  return (
    <div className={classes.searchResultContainer}>
      <ToastContainer />
      <div className={classes.searchResult}>
        <Avatar />
        <Typography variant="subtitle1" className={classes.searchResultText}>
          {foundUser.username}
        </Typography>
      </div>
      {areFriends ? (
        <Fab
          size="small"
          color="secondary"
          onClick={openChat}
          className={classes.sendFriendRequest}
        >
          <ChatIcon />
        </Fab>
      ) : alreadyRequested ? (
        <Fab
          size="small"
          color="secondary"
          onClick={()=> toast.error("Connection request was already sent to this contact")}
          className={classes.sendFriendRequest}
        >
          <PendingOutlinedIcon />
        </Fab>
      ) : (
        <Fab
          size="small"
          color="secondary"
          onClick={handleSendFriendRequest}
          className={classes.sendFriendRequest}
        >
          <AddIcon />
        </Fab>
      )}
    </div>
  );
};

export default SearchResult;
