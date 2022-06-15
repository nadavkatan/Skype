import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import { getUpdatedCurrentUser } from '../features/auth/authSlice';
import {setChatContent, setCurrentRoom} from '../features/chat/chatSlice';
import {setFriendRequestsFrom, initializeFriendRequestsTo, setNotifications} from '../features/friendRequests/friendRequestsSlice';
import {checkAuth} from '../features/auth/authSlice';
import { getAllUserNotifications } from '../features/notifications/notificationsSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Peer from "simple-peer";
import {setReceivingCall, setCaller, setCallerSignal} from '../features/videoCall/videoCallSlice';


export const AppContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;
const socket = io.connect(BASE_URL);
// , { autoConnect: false }
const Context = ({children}) => {

    const{currentUser} = useSelector((state)=> state.auth);
    const{contactsList} = useSelector((state)=> state.contacts);
    const {friendRequestsFrom, notifications} = useSelector((state)=> state.friendRequests);
    const [activeTab, setActiveTab] = useState("ChatsList");
    const [currentContact, setCurrentContact] = useState("");
    const dispatch = useDispatch();


    socket.off("newFriendRequest").on("newFriendRequest", (friendRequest)=>{
      console.log("currentUser: ",currentUser);
      console.log("friendRequest from back: ", friendRequest);
      if(friendRequest.receiver_id === currentUser._id){
        console.log("relevant user")
        const notification = {
          title: "friendRequest",
          content: friendRequest
        }
        dispatch(setFriendRequestsFrom([...friendRequestsFrom, friendRequest]));
        dispatch(setNotifications([...friendRequestsFrom, notification]));
      }
    })

    socket.off("addFriend").on("addFriend", (friend)=>{
      console.log("add friend event",friend.updateDescription.updatedFields)
        if(currentUser){
          dispatch(getUpdatedCurrentUser(currentUser._id))
          toast.success(`You are now connected with `);

        }
    })

    socket.off("notificationUpdate").on("notificationUpdate", (notification)=>{
      console.log("notification update");
      dispatch(getAllUserNotifications(currentUser._id));

    });

    // socket.off("incomingCall").on("incomingCall", (data)=>{
    //   dispatch(setReceivingCall(true))
    //   dispatch(setCaller(data.from))
    //   dispatch(setCallerSignal(data.signal))
    // })

    socket.off('receiving_call').on('receiving_call', (data)=>{
      console.log('received emit from back, receiving call');
      dispatch(setCaller(data.from))
      dispatch(setReceivingCall(true))
    })

    const value = {
        socket: socket,
        activeTab,
        currentContact,
        joinRoom: (room)=>{
            console.log(BASE_URL)
            socket.emit("join_room", room);
        },
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
        },
        notifyServerForUserConnection: (user)=>{
          socket.emit("user_connected", user);
        },
    }

    useEffect(()=>{
      console.log("currentUser: ", currentUser)
      dispatch(checkAuth());

    },[])


    useEffect(()=>{
      if(currentUser){
        dispatch(setFriendRequestsFrom(currentUser.friendRequestesFrom))
        dispatch(initializeFriendRequestsTo(currentUser.friendRequestesTo))
        dispatch(getAllUserNotifications(currentUser._id));
        // dispatch(setNotifications(currentUser.friendRequestesFrom))
        value.notifyServerForUserConnection(currentUser)
      }
    },[currentUser])


  return (
    <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>
  )
}

export default Context