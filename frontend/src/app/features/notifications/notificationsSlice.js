import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const createNotification = createAsyncThunk("notifications/createNotification", 
    async(args, {getState})=>{
        const response = await axios({
            method: 'POST',
            url: `${BASE_URL}/notifications`,
            data:args
        });
        console.log(response);
        return response.data
    }
)

export const getAllUserNotifications = createAsyncThunk("notifications/getAllUserNotifications",
    async(id, {getState})=>{
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/notifications/${id}`,
        });
        console.log(response);
        return response.data
    }
)

export const deleteNotification = createAsyncThunk("notifications/deleteNotification",
    async(args, {getState})=>{
        const response = await axios({
            method: 'DELETE',
            url: `${BASE_URL}/notifications`,
            data: args
        })
        console.log(response)
        return response.data
    }
)

const initialState = {
    status: 'idle',
    notifications:[]
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    extraReducers:{
        [createNotification.pending]: (state)=>{
            state.status='loading'
        },
        [createNotification.fulfilled]: (state, {payload})=>{
            state.status='success';
            // state.notifications = [...state.notifications, payload]
        },
        [createNotification.rejected]: (state)=>{
            state.status='failed';
        },
        [getAllUserNotifications.pending]: (state)=>{
            state.status = "loading"
        },
        [getAllUserNotifications.fulfilled]: (state, {payload})=>{
            state.status = "success";
            console.log(payload)
            state.notifications = payload
        },
        [getAllUserNotifications.rejected]: (state)=>{
            state.status = "failed"
        },
        [deleteNotification.pending]: (state)=>{
            state.status = "loading"
        },
        [deleteNotification.fulfilled]: (state, {payload})=>{
            state.status = "success";
            state.notifications = state.notifications.filter(notification => {
                return notification.user_id !== payload.user_id 
                       && notification.sender_id !== payload.sender_id 
                       && notification.title !== payload.title
            })
        },
        [deleteNotification.rejected]: (state)=>{
            state.status = "failed"
        }
    }
});

export default notificationsSlice.reducer;