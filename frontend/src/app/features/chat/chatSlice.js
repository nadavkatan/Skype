import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getStoredChatContent = createAsyncThunk('chat/getStoredChatContent',
    async(chatId, {getState}) => {
        const response = await axios({
            method: 'POST',
            url: `${BASE_URL}/chats`,
            headers:{
                "Content-Type": "application/json"
            },
            data: {
                id:chatId
            }
        });
        return response.data;
    }
)

export const getUsersChat = createAsyncThunk('chat/getUsersChat',
    async(userId, {getState}) => {
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/chats/${userId}`,
            headers:{
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }
)

export const storeSentMessage = createAsyncThunk('chat/storeSentMessage',
    async(args, {getState}) => {
        const response = await axios({
            method: 'PUT',
            url: `${BASE_URL}/chats`,
            data:{
                id:args.id,
                message:args.messageData
            }
        });
        return response.data;
    }
)

const initialState = {
    status:'idle',
    currentRoom:"",
    chatContent:[],
    chats:[],
    showChat: false,
    unreadMessages:[]
}

const chatSlice = createSlice({
    name:"chat",
    initialState,
    reducers:{
        setCurrentRoom: (state, {payload}) =>{
            state.currentRoom = payload
        },
        setShowChat: (state, {payload}) =>{
            state.showChat = payload
        },
        setChatContent: (state, {payload}) =>{
            state.chatContent = [...state.chatContent, payload]
        },
        addMessageToUnread: (state, {payload}) =>{
            state.unreadMessages.push(payload)
        },
        deleteMessagesFromUnread: (state, {payload}) =>{
            state.unreadMessages = state.unreadMessages.filter(unreadMessage => unreadMessage.senderId !== payload);
        }
    },
    extraReducers:{
        [getStoredChatContent.pending]: (state)=>{
            state.status = "loading";
        },
        [getStoredChatContent.fulfilled]: (state, {payload})=>{
            state.status = "success";
            if(payload)state.chatContent = payload.messages;
        },
        [getStoredChatContent.rejected]: (state)=>{
            state.status = "failed";
        },
        [storeSentMessage.pending]: (state)=>{
            state.status = "loading";
        },
        [storeSentMessage.fulfilled]: (state, {payload})=>{
            state.status = "success";
        }, 
        [storeSentMessage.rejected]: (state, {payload})=>{
            state.status = "failed"
        },
        [getUsersChat.pending]: (state)=>{
            state.status = "loading";
        },
        [getUsersChat.fulfilled]: (state, {payload})=>{
            state.status = "success";
            state.chats = payload;
        },
        [getUsersChat.rejected]: (state)=>{
            state.status = "failed"
        }

    }
})

export const {setCurrentRoom, joinRoom, deleteMessagesFromUnread, addMessageToUnread, receiveMessage, setShowChat, setChatContent} = chatSlice.actions
export default chatSlice.reducer;