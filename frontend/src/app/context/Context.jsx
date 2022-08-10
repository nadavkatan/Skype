import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { createContext } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import {setChatContent, setCurrentRoom, addMessageToUnread} from '../features/chat/chatSlice';
import {setFriendRequestsFrom, initializeFriendRequestsTo} from '../features/friendRequests/friendRequestsSlice';
import {getAllContacts, setCurrentContact} from '../features/contacts/contacsSlice';
import {checkAuth} from '../features/auth/authSlice';
import { getAllUserNotifications } from '../features/notifications/notificationsSlice';
import "react-toastify/dist/ReactToastify.css";
import {setReceivingCall, setCaller, setCallInitiator, setCallAnswered, setOngoingCall, setBusyContact} from '../features/videoCall/videoCallSlice';


export const AppContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;
const socket = io.connect(BASE_URL);

const Context = ({children}) => {
    const {currentUser} = useSelector((state)=> state.auth);
    const {receivingCall, callAnswered, ongoingCall, callInitiator} = useSelector((state)=> state.videoCall);
    const {currentRoom} = useSelector((state)=> state.chat);
    const [activeTab, setActiveTab] = useState("ChatsList");
    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch();

    socket.off("addFriend").on("addFriend", (friend)=>{
        if(currentUser){
          const update = friend.updateDescription.updatedFields 
          if(update[Object.keys(update)[0]].friendId){
             return dispatch(getAllContacts(currentUser._id))
          }
        }
    })

    socket.off("notificationUpdate").on("notificationUpdate", (notification)=>{
      dispatch(getAllUserNotifications(currentUser._id));
    });

    socket.off('receiving_call').on('receiving_call', (data)=>{
      console.log('received emit from back, receiving call', data);
      //if user is not already on another call, not currently receiving another call, or currently calling
      if(!ongoingCall && !receivingCall && !callInitiator){
        setOpenModal(true)
        dispatch(setCurrentContact(data.from))
        dispatch(setCurrentRoom(data.room))
        // dispatch(setCaller(data.from))
        dispatch(setReceivingCall(true))
      }else{
        socket.emit('busy', {caller: data.from, receiver: currentUser})
      }
    });

    socket.off('call_answered').on('call_answered', (data)=>{
      console.log('received emit from back, call answered');
      dispatch(setCallAnswered(true));
      dispatch(setOngoingCall(true));
    })

    socket.off('call_cancelled').on('call_cancelled', (data)=>{
      console.log('received emit from back, cancel call');
      if(receivingCall){
        dispatch(setReceivingCall(false))
        setOpenModal(false)
        dispatch(setCaller(null))
        //add missed call notification
      }
    });

    socket.off("call_declined").on("call_declined", (data)=>{
      dispatch(setCallInitiator(false));
    });

    socket.off("busy_contact").on("busy_contact", (data)=>{
      dispatch(setCallInitiator(false));
      dispatch(setBusyContact(data.receiver));
    });

    socket.off("message_update").on("message_update", data=>{
      if(data.updatedChat !== currentRoom){
        dispatch(addMessageToUnread(data.messageInfo))
      }
    })

    const value = {
        socket: socket,
        activeTab,
        openModal,
        setOpenModal,
        joinRoom: (room)=>{
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
       handleJoinRoom:(chatId, contact)=>{
          value.joinRoom(chatId)
          dispatch(setCurrentRoom(chatId))
        },
        notifyServerForUserConnection: (user)=>{
          socket.emit("user_connected", user);
        },
    }

    useEffect(()=>{
      dispatch(checkAuth());
    },[])

    useEffect(()=>{
      console.log('receiving call: ', receivingCall)
      console.log('open modal: ', openModal)
    }, [receivingCall])


    useEffect(()=>{
      if(currentUser){
        dispatch(setFriendRequestsFrom(currentUser.friendRequestesFrom))
        dispatch(initializeFriendRequestsTo(currentUser.friendRequestesTo))
        dispatch(getAllUserNotifications(currentUser._id));
        dispatch(getAllContacts(currentUser._id))
        value.notifyServerForUserConnection(currentUser)
      }
    },[currentUser])

    useEffect(()=>{
      console.log('call answered:, ', callAnswered)
    },[callAnswered])


  return (
    <AppContext.Provider value={value}>
    {children}
    </AppContext.Provider>
  )
}

export default Context