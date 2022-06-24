import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const sendFriendRequest = createAsyncThunk("users/sendFriendRequest",
async(args, {getState})=>{
    const response = await axios({
        method: 'PUT',
        url: `${BASE_URL}/users/request`,
        data:{
            id: args.id,
            friendName: args.friendName,
            friendId: args.friendId,
        }
    })
    return response.data
}
)


export const storeFriendRequest = createAsyncThunk("users/storeFriendRequest",
async(args, {getState})=>{
    const response = await axios({
        method: 'POST',
        url:`${BASE_URL}/friend-requests`,
        data:{
            sender_id:args.sender_id,
            sender_name:args.sender_name,
            receiver_id:args.receiver_id,
            receiver_name:args.receiver_name
        }
    });
    return response.data
}
)

export const deleteFriendRequest = createAsyncThunk("users/deleteFriendRequest",
async(friendRequest, {getState})=>{
    const response = await axios({
        method:'DELETE',
        url:`${BASE_URL}/friend-requests`,
        data:friendRequest
    });
    return response.data
}
)

const initialState={
    friendRequestsFrom:[],
    friendRequestsTo:[],
    notifications:[]
}

const friendRequestsSlice = createSlice({
    name: 'friendRequests',
    initialState,
    reducers:{
        setFriendRequestsFrom: (state, {payload})=>{
            state.friendRequestsFrom = payload
        },
        setFriendRequestsTo: (state, {payload})=>{
            state.friendRequestsTo.push(payload) 
        },
        initializeFriendRequestsTo: (state, {payload})=>{
            state.friendRequestsTo= payload
        },
        setNotifications: (state, {payload})=>{
            state.notifications = payload
        }
    },
    extraReducers:{
        [sendFriendRequest.pending]: (state)=>{
            state.status = "loading"
        },
        [sendFriendRequest.fulfilled]: (state)=>{
            state.status = "success"
        },
        [sendFriendRequest.rejected]: (state)=>{
            state.status = "failed"
        },
        [storeFriendRequest.pending]: (state)=>{
            state.status = "loading"
        },
        [storeFriendRequest.fulfilled]: (state)=>{
            state.status = "success"
        },
        [sendFriendRequest.rejected]: (state)=>{
            state.status = "failed"
        },
        [deleteFriendRequest.pending]: (state)=>{
            state.status = "loading"
        },
        [deleteFriendRequest.fulfilled]: (state)=>{
            state.status = "success"
        },
        [deleteFriendRequest.rejected]: (state)=>{
            state.status = "failed"
        },
    }
});

export const {setFriendRequestsFrom, setNotifications, setFriendRequestsTo, initializeFriendRequestsTo} = friendRequestsSlice.actions
export default friendRequestsSlice.reducer;