import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppContext } from "../../context/Context";
import {
  storeSentMessage,
  getStoredChatContent,
  setChatContent,
  deleteMessagesFromUnread,
} from "../../features/chat/chatSlice";
import MessageFriend from "../messageFriend/MessageFriend";
import Message from "../message/Message";
import { useStyles } from "./styles/styles";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";
import { useMediaQuery } from "@mui/material";
import VideoCall from "../videoCall/VideoCall";

const Chat = () => {
  const [currentMessage, setCurrentMessage] = useState("");
  const { currentRoom, chatContent } = useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.auth);
  const { receivingCall, callAnswered, callInitiator } = useSelector(
    (state) => state.videoCall
  );
  const { currentContact } = useSelector((state) => state.contacts);
  const { sendMessage, socket } = useContext(AppContext);

  const dispatch = useDispatch();
  const classes = useStyles();
  const chatBody = useRef();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleSendMessage = () => {
    if (currentRoom !== "" && currentMessage !== "") {
      const messageData = {
        room: currentRoom,
        author: currentUser.username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      // Send the message with socket.io
      sendMessage(messageData);
      // Store the message in mongodb
      dispatch(storeSentMessage({ id: currentRoom, messageData }));
      // Reset the message input
      setCurrentMessage("");
    }
  };

  const handleKeyPress =(e)=>{
    if(e.key === 'Enter'){
      handleSendMessage();
    }
  }

  // Auto scroll to the bottom of the chat
  useEffect(() => {
    if(chatBody.current){
      chatBody.current.scrollIntoView({ behavior: "smooth", block:'end' })
    }

  },[chatContent])

  // When message is receieved it is added to the chat content and displayed
  useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {
      dispatch(setChatContent(data));
    });
  }, [socket]);


  useEffect(() => {
    // When user enters chat, the messages stored in mongodb are presented.
    dispatch(getStoredChatContent(currentRoom));
    if (currentContact) {
      // if there were any unread messages in the chat, once the user is in the chat they are considered as 'read' and can thus be deleted from mongodb. 
      // The unread messages badge will then be removed
      dispatch(deleteMessagesFromUnread(currentContact._id));
    }
    return () => {
      // In case the unread messages were not previously deleted, they will be removed from mongodb on component will unmount
      dispatch(deleteMessagesFromUnread(currentContact._id));
    };
  }, [currentContact]);

  return (
    <div style={{height:'86%'}}>
      {receivingCall ? (
        <VideoCall />
      ) : callAnswered || callInitiator ? (
        <VideoCall />
      ) : (
        <>
          <div
            className={
              isSmallScreen ? classes.chatBody : classes.lgScreenChatBody
            }
            
          >
            {chatContent.length > 0 &&
              chatContent.map((message, i) => {
                return message.author === currentUser.username ? (
                  <Message  key={i} message={message} />
                ) : (
                  <MessageFriend key={i} message={message} />
                );
              })}
              <div ref={chatBody} />
          </div>
          <div className={classes.chatFooter}>
            <div
              className={
                isSmallScreen
                  ? classes.typeMessageInputContainer
                  : classes.lgScreenTypeMessageInputContainer
              }
            >
              <input
                type="text"
                className={classes.typeMessage}
                placeholder="Type a message"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={e => handleKeyPress(e)}
              />
              <SendIcon
                className={classes.sendIcon}
                onClick={handleSendMessage}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
