import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    videoStream: null,
    receivingCall: false,
    caller: "",
    callerSignal: null,
    callAccepted: false,
    callEnded: false,
    onGoingCall: false,
    inComingCall: false,
    callingFriend: false,
    callInitiator: false,
    callAnswered: false,
}

const videoCallSlice = createSlice({
    name: "videoCall",
    initialState,
    reducers:{
        setVideoStream: (state, {payload})=>{
            console.log(payload);
            state.videoStream = payload
        },
        setReceivingCall: (state, {payload})=>{
            state.receivingCall = payload
        },
        setCaller: (state, {payload})=>{
            state.caller = payload
        },
        setCallerSignal: (state, {payload})=>{
            state.callerSignal = payload
        },
        setCallAccepted: (state, {payload})=>{
            state.callAccepted = payload
        },
        setCallEnded: (state, {payload})=>{
            state.callEnded = payload
        },
        setOnGoingCall: (state, {payload})=>{
            state.onGoingCall = payload
        },
        setCallingFriend: (state, {payload})=>{
            state.callingFriend = payload
        },
        setCallInitiator: (state, {payload})=>{
            state.callInitiator = payload
        },
        setCallAnswered: (state, {payload})=>{
            state.callAnswered = payload
        }
    }
});

export const {setVideoStream,setCallAnswered, setReceivingCall,setCallInitiator, setCallingFriend, callingFriend, setCaller, setCallerSignal, setOnGoingCall, setCallAccepted, setCallEnded} = videoCallSlice.actions;
export default videoCallSlice.reducer;