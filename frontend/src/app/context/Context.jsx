import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import { getUpdatedCurrentUser } from '../features/auth/authSlice';
import {setChatContent, setCurrentRoom, setShowChat} from '../features/chat/chatSlice';


export const AppContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;
const socket = io.connect(BASE_URL);

const Context = ({children}) => {

    const{currentUser} = useSelector((state)=> state.auth);
    const [activeTab, setActiveTab] = useState("ChatsList");
    const [currentContact, setCurrentContact] = useState("");
    const [friendRequests, setFriendRequests] = useState([]);
    const dispatch = useDispatch();

    socket.on("newFriendRequest", (friendRequest)=>{
      // console.log(friendRequest);
      if(friendRequest.receiver_id === currentUser._id){
        setFriendRequests(prev=> [...prev, friendRequest]);
      }
    })

    const value = {
        socket: socket,
        activeTab,
        currentContact,
        friendRequests,
        joinRoom: (room)=>{
            console.log(BASE_URL)
            socket.emit("join_room", room);
        },
        // sendMessage: async(message, chatId, cb)=>{
        //     if(message !== ""){
        //         const messageData = {
        //             room: chatId,
        //             author: currentUser.username,
        //             message: message,
        //             time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        //         }
        //       await socket.emit("send_message", messageData);  
        //       cb(chatContent=> [...chatContent, messageData])
        //     }
        // }
        sendMessage: async(messageData, cb)=>{
              await socket.emit("send_message", messageData);  
              dispatch(setChatContent(messageData));
        },
         toggleTabs: (tab)=>{
          switch(tab){
              case "ChatsList":
                  return setActiveTab("ChatsList");
                  break;
              case "ContactsList":
                  return setActiveTab("ContactsList");
                  break;
              case "Notifications": 
                   return setActiveTab("Notifications");  
                   break;
              case "Calls":
                  return setActiveTab("Calls");
                  break;
              case "Chat": 
                 return setActiveTab("Chat"); 
                 break; 
              case "Search":  
                return setActiveTab("Search");
                break; 
  
              default: return setActiveTab("ChatList");
          }
      },
       handleJoinRoom:(chatId, friendName)=>{
        console.log(chatId)
          value.joinRoom(chatId)
          dispatch(setCurrentRoom(chatId))
          setCurrentContact(friendName)
          // dispatch(setShowChat(true))
        }
    }

    useEffect(()=>{
      console.log("friendRequests: ", friendRequests)
      console.log("currentUser: ", currentUser)
    })

    useEffect(()=>{
      if(currentUser){
        setFriendRequests(currentUser.friendRequestesFrom)
      }
    },[currentUser])

  return (
    <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>
  )
}

export default Context