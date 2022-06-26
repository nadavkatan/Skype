import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const storeCall = createAsyncThunk('videoCall/storeCall',
    async(args, {getState})=>{
        const response = await axios({
            method: 'POST',
            url: `${BASE_URL}/calls`,
            data:args
        });
        return response.data
    }
)

export const getUserCalls = createAsyncThunk('videoCall/getUserCalls',
    async(id, {getState})=>{
        const response = await axios({
            method: 'GET',
            url: `${BASE_URL}/calls/${id}`
        })
        return response.data
    }
)

const initialState = {
    receivingCall: false,
    caller: "",
    callEnded: false,
    callInitiator: false,
    callAnswered: false,
    calls:[]
}

const videoCallSlice = createSlice({
    name: "videoCall",
    initialState,
    reducers:{
        setReceivingCall: (state, {payload})=>{
            state.receivingCall = payload
        },
        setCaller: (state, {payload})=>{
            state.caller = payload
        },
        setCallEnded: (state, {payload})=>{
            state.callEnded = payload
        },
        setCallInitiator: (state, {payload})=>{
            state.callInitiator = payload
        },
        setCallAnswered: (state, {payload})=>{
            state.callAnswered = payload
        }
    },
    extraReducers: {
        [storeCall.pending]: (state)=>{
            state.status = 'loading'
        },
        [storeCall.fulfilled]: (state)=>{
            state.status = 'success'
        },
        [storeCall.rejected]: (state)=>{
            state.status = 'failed'
        },
        [getUserCalls.pending]: (state)=>{
            state.status = 'loading'
        },
        [getUserCalls.fulfilled]: (state, {payload})=>{
            state.status = 'success';
            state.calls = payload.reverse();
        },
        [getUserCalls.rejected]: (state)=>{
            state.status = 'failed'
        }
    }
});

export const {setCallAnswered, setReceivingCall,setCallInitiator, setCaller, setCallEnded} = videoCallSlice.actions;
export default videoCallSlice.reducer;