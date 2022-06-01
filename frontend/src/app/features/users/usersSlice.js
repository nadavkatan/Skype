import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const findUser = createAsyncThunk("users/findUser",
    async(username, {getState})=>{
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}/users/one`,
            headers:{
                "Content-Type": "application/json"
            },
            data: {
                username:username
            }
        });
        console.log(response);
        return response.data;
    }
    );

    export const getAllUsers = createAsyncThunk("users/getAllUsers",
        async(args, {getState})=>{
            const reponse = axios({
                method: "GET",
                url: `${BASE_URL}/users`,
            });

            return reponse.data;
        }
    )

    const initialState = {
        allUsers: [],
        foundUser:"nadav",
        friendRequestFrom:[],
        friendRequestsTo:[],
        friends:[],
        status: "idle"
    };

    const usersSlice = createSlice({
        name:"contacts",
        initialState,
        extraReducers:{
            [findUser.pending]: (state)=>{
                state.status = "loading"
            },
            [findUser.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.foundUser = payload;
            },
            [findUser.rejected]: (state)=>{
                state.status = "failed";
            },
            [getAllUsers.pending]: (state)=>{
                state.status = "loading"
            },
            [getAllUsers.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.allUsers = payload
            },
            [getAllUsers.rejected]: (state)=>{
                state.status = "failed"
            }
        }
    });
    
    export default usersSlice.reducer;