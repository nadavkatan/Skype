import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getStoredChatContent = createAsyncThunk('chat/getStoredChatContent',
    async(chatId, {getState}) => {
        console.log(chatId)
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
        // console.log(response);
        return response.data;
    }
)

export const storeSentMessage = createAsyncThunk('chat/storeSentMessage',
    async(args, {getState}) => {
        console.log('asyncThunk: ', args)
        const response = await axios({
            method: 'PUT',
            url: `${BASE_URL}/chats`,
            data:{
                id:args.id,
                message:args.messageData
            }
        });
        // console.log(response);
        return response.data;
    }
)

// export const sendMessage = createAsyncThunk('chat/sendMessage',
//     async(messageData, {getState}) => {
//         if(messageData.message !== ""){
//             await socket.emit('send_message', messageData);
//             return messageData;
//         }
//     }
// )


const initialState = {
    status:'idle',
    currentRoom:"",
    chatContent:[],
    showChat: false
    // socket: socket,
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
            console.log(payload)
            state.chatContent = [...state.chatContent, payload]
        }
        // joinRoom: (state, {payload})=>{
        //     console.log(BASE_URL)
        //     socket.emit("join_room", payload);
        //     state.currentRoom = payload
        // },
        // receiveMessage: async(state, {payload})=>{
        //     console.log(payload);
        //    await socket.on("receive_message",(data)=>{
        //         state.chatContent = [...state.chatContent, data]
        //     })
        // }
    },
    extraReducers:{
        [getStoredChatContent.pending]: (state)=>{
            state.status = "loading";
        },
        [getStoredChatContent.fulfilled]: (state, {payload})=>{
            console.log(payload);
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
        }
        // [sendMessage.pending]: (state)=>{
        //     state.status = "loading"
        // },
        // [sendMessage.fulfilled]: (state, {payload})=>{
        //     state.chatContent = [...state.chatContent, payload]
        // },
        // [sendMessage.failed]: (state)=>{
        //     state.status = "failed"
        // }
    }
})

export const {setCurrentRoom, joinRoom, receiveMessage, setShowChat, setChatContent} = chatSlice.actions
export default chatSlice.reducer;