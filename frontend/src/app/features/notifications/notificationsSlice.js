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
        return response.data
    }
)

export const getAllUserNotifications = createAsyncThunk("notifications/getAllUserNotifications",
    async(id, {getState})=>{
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/notifications/${id}`,
        });
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
        return response.data
    }
)

export const deleteAllConnectionNotifications = createAsyncThunk("notifications/deleteAllConnectionNotifications",
    async(user_id, {getState})=>{
        const response = await axios({
            method: 'DELETE',
            url: `${BASE_URL}/notifications/all`,
            data: {
                user_id: user_id
            }
        });
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
    reducers:{
        addNotification: (state, {payload})=>{
            state.notifications.push(payload)
        },
        deleteNotificationFromState: (state, {payload})=>{
            state.notifications = state.notifications.filter(notification => {
                return notification.title !== payload.title && notification.sender_id !== payload.sender_id
            });
        },
        convertNotification: (state, {payload})=>{
            state.notifications = state.notifications.filter(notification => {
                return notification.title !== payload.title && notification.sender_id !== payload.sender_id
            });
            state.notifications.push(payload.newNotification)
        }
    },
    extraReducers:{
        [createNotification.pending]: (state)=>{
            state.status='loading'
        },
        [createNotification.fulfilled]: (state, {payload})=>{
            state.status='success';
        },
        [createNotification.rejected]: (state)=>{
            state.status='failed';
        },
        [getAllUserNotifications.pending]: (state)=>{
            state.status = "loading"
        },
        [getAllUserNotifications.fulfilled]: (state, {payload})=>{
            state.status = "success";
            if(payload.message !== "no notifications"){
                state.notifications = payload
            }else{
                state.notifications = [];
            }
        },
        [getAllUserNotifications.rejected]: (state)=>{
            state.status = "failed"
        },
        [deleteNotification.pending]: (state)=>{
            state.status = "loading"
        },
        [deleteNotification.fulfilled]: (state, {payload})=>{
            state.status = "success";
        },
        [deleteNotification.rejected]: (state)=>{
            state.status = "failed"
        },
        [deleteAllConnectionNotifications.pending]: (state)=>{
            state.status = "loading"
        },
        [deleteAllConnectionNotifications.fulfilled]: (state, {payload})=>{
            state.status = "success"
            state.notifications = state.notifications.filter(notification => notification.title !== "connection_confirmation");
        },
        [deleteAllConnectionNotifications.rejected]: (state)=>{
            state.status = "failed"
        },
    }
});

export const {addNotification, deleteNotificationFromState, convertNotification} = notificationsSlice.actions;
export default notificationsSlice.reducer;