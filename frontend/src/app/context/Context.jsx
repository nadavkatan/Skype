import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import { getUpdatedCurrentUser } from '../features/auth/authSlice';
import {setChatContent, setCurrentRoom, setShowChat} from '../features/chat/chatSlice';
import { addContact } from '../features/contacts/contacsSlice';
import {setFriendRequestsFrom, setNotifications} from '../features/friendRequests/friendRequestsSlice';
import {checkAuth} from '../features/auth/authSlice';
import { getAllUserNotifications } from '../features/notifications/notificationsSlice';


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

    // socket.off("newFriendRequest").on("newFriendRequest", (friendRequest)=>{
    //   console.log("currentUser: ",currentUser);
    //   console.log("friendRequest from back: ", friendRequest);
    //   // if(friendRequest.receiver_id === currentUser._id && friendRequests.some(e => e.sender_id !== friendRequest.sender._id)){
    //   if(friendRequest.receiver_id === currentUser._id){
    //     setFriendRequests(prev=> [...prev, friendRequest]);
    //   }
    // })

    socket.off("newFriendRequest").on("newFriendRequest", (friendRequest)=>{
      console.log("currentUser: ",currentUser);
      console.log("friendRequest from back: ", friendRequest);
      // if(friendRequest.receiver_id === currentUser._id && friendRequests.some(e => e.sender_id !== friendRequest.sender._id)){
      if(friendRequest.receiver_id === currentUser._id){
        // setFriendRequests(prev=> [...prev, friendRequest]);
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
      console.log("add friend event",friend)
      // if(friend.length > 0){
      //     console.log("relevant user")
      //   // dispatch(addContact(friend.friends[0]))
      //   const notification = {
      //     title: "connectionConfirmation",
      //     content: `You and ${friend[0].friendName} are now connected`
      //   }
        // dispatch(setNotifications([...notifications,notification ]));
        dispatch(getUpdatedCurrentUser(currentUser._id))
        // dispatch(addContact(friend[0]));
      // }
    })

    socket.off("notificationUpdate").on("notificationUpdate", (notification)=>{
      console.log("notification update");
      dispatch(getAllUserNotifications(currentUser._id));

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
        }
    }

    useEffect(()=>{
      console.log("currentUser: ", currentUser)
      dispatch(checkAuth());
    },[])

    useEffect(()=>{
      if(currentUser){
        dispatch(setFriendRequestsFrom(currentUser.friendRequestesFrom))
        dispatch(getAllUserNotifications(currentUser._id));
        // dispatch(setNotifications(currentUser.friendRequestesFrom))
        value.notifyServerForUserConnection(currentUser)
      }
    },[currentUser])

    useEffect(()=>{
      console.log("contacts: ", contactsList)
    },[contactsList])

  return (
    <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>
  )
}

export default Context