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
        // console.log(response);
        return response.data
    }
)

export const getAllUserNotifications = createAsyncThunk("notifications/getAllUserNotifications",
    async(id, {getState})=>{
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/notifications/${id}`,
        });
        // console.log(response);
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
        // console.log(response)
        return response.data
    }
)

export const deleteAllConnectionNotifications = createAsyncThunk("notifications/deleteAllConnectionNotifications",
    async(user_id, {getState})=>{
        console.log(user_id)
        const response = await axios({
            method: 'DELETE',
            url: `${BASE_URL}/notifications/all`,
            data: {
                user_id: user_id
            }
        });
        // console.log(response)
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
        }
    },
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
            console.log(state.notifications)
            state.notifications = state.notifications.filter(notification => {
                return notification.user_id !== payload.user_id 
                       && notification.sender_id !== payload.sender_id 
                       && notification.title !== payload.title
            })
        },
        [deleteNotification.rejected]: (state)=>{
            state.status = "failed"
        },
        [deleteAllConnectionNotifications.pending]: (state)=>{
            state.status = "loading"
        },
        [deleteAllConnectionNotifications.fulfilled]: (state, {payload})=>{
            console.log(payload)
            state.status = "success"
            state.notifications = state.notifications.filter(notification => notification.title !== "connection_confirmation");
        },
        [deleteAllConnectionNotifications.rejected]: (state)=>{
            state.status = "failed"
        },
    }
});

export const {addNotification} = notificationsSlice.actions;
export default notificationsSlice.reducer;