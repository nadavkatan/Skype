import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppContext} from '../../context/Context';
import {storeSentMessage, getStoredChatContent, setChatContent} from '../../features/chat/chatSlice'; 
import MessageFriend from '../messageFriend/MessageFriend';
import Message from '../message/Message';
import {useStyles} from './styles/styles';
import SendIcon from '@mui/icons-material/Send';
import { useRef } from 'react';

const Chat = () => {

  const [currentMessage, setCurrentMessage] = useState("");
  // const [chatContent, setChatContent] = useState([]);
  const {sendMessage, socket} = useContext(AppContext);
  const {currentRoom, chatContent} = useSelector((state) => state.chat);
  const{currentUser} = useSelector((state)=> state.auth);

  const dispatch = useDispatch();
  const classes = useStyles();
  const chatBody = useRef();

  const handleSendMessage=()=>{
    if(currentRoom !== "" && currentMessage !== ""){
      const messageData = {
        room: currentRoom,
        author: currentUser.username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    }
      // sendMessage(currentMessage, currentRoom, setChatContent)
      sendMessage(messageData)
      dispatch(storeSentMessage({id:currentRoom, messageData}))
      setCurrentMessage("");

    }
  }

  useEffect(()=>{
    if(chatBody.current){
      chatBody.current.scrollIntoView({
            behavior: "smooth",
            block: "end"
        }) }
},[chatContent])

  useEffect(() =>{
    socket.on("receive_message", (data)=>{
      console.log(data);
      dispatch(setChatContent(data));
    })
  },[socket])



  useEffect(()=>{
    dispatch(getStoredChatContent(currentRoom));
    // setChatContent(storedChat.messages)
  },[])

  return (
    <div>
    <div className={classes.chatBody} ref={chatBody}>
      {chatContent.length > 0 && chatContent.map((message, i)=>{
        return  message.author === currentUser.username ? 
         <Message key={i} message={message}/>
        :
        <MessageFriend key={i} message={message} />
         
      })}

    </div>
    <div className={classes.chatFooter}>
    <div className={classes.typeMessageInputContainer}>
    <input type="text" className={classes.typeMessage} placeholder="Type a message" value={currentMessage} onChange={e=>setCurrentMessage(e.target.value)}/>
      <SendIcon onClick={handleSendMessage}/>
    </div>
    </div>
    </div>
  )
}

export default Chat