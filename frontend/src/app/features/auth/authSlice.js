import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const checkAuth = createAsyncThunk("auth/checkAuth",
    async(args, {getState})=>{
        const response = await axios.get(`${BASE_URL}/auth/check-auth`,{withCredentials: true} );
        console.log("check auth response: ",response);
        return response.data;
    }
    );

export const login = createAsyncThunk("auth/login",
    async(credentials, {getState})=>{
        const response = await axios({
            method: 'POST',
            url:`${BASE_URL}/auth/login`,
            data: credentials,
            headers:{
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        const {isAuth, userId, user} = response.data;
        if(!isAuth){
            const {info} = response.data;
            return {isAuth, message: info.message, userId:""}
        }else{
            return {isAuth, message: "", userId, user}
        }
    }
)    

export const logout = createAsyncThunk("auth/logout",
    async(args, {getState})=>{
        const response = await axios({
            method: 'POST',
            url:`${BASE_URL}/auth/logout`,
            withCredentials: true
        })
        console.log(response);
        return response.data;
    }
) 

export const registerUser = createAsyncThunk("auth/registerUser",
    async(userData, {getState})=>{
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}/auth/register`,
            data: userData
        });
        return response.data
    }
)

export const getUpdatedCurrentUser = createAsyncThunk("auth/getUpdatedCurrentUser",
    async(id, {getState})=>{
        const response = await axios({
            method:'GET',
            url: `${BASE_URL}/users/${id}`,
        });

        console.log(response);
        return response.data;
    }
)

export const updateUserCredentials = createAsyncThunk("auth/updateUserCredentials",
async(args, {getState})=>{
        const{auth} = getState();
    try{
        const response = await axios({
            method: 'PUT',
            url: `${BASE_URL}/users/edit-credentials/${auth.currentUser._id}`,
            data: args
        })
        console.log(response)
        return response.data
    }catch(e){
        console.log(e)
    }
}
);

export const changePassword = createAsyncThunk("auth/changePassword",
    async(args, {getState})=>{
        const {auth} = getState();
        try{
            const response = await axios({
                method:'PUT',
                url: `${BASE_URL}/users/change-password/${auth.currentUser._id}`,
                data: args
            });
            console.log(response)
            return response.data
        }catch(e){
            console.log(e);
        }

    }
)

    const initialState = {
        isAuth: undefined,
        authMessage:"",
        currentUser:"",
        currentUserId:"",
        status: "idle"
    };

    const authSlice = createSlice({
        name: "auth",
        initialState,
        extraReducers:{
            [checkAuth.pending]: (state)=>{
                state.status = "loading"
            },
            [checkAuth.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.isAuth = payload.isAuth
                state.currentUserId = payload.userId;
                state.currentUser = payload.user;
            },
            [checkAuth.rejected]: (state)=>{
                state.status = "failed"
            },
            [login.pending]: (state)=>{
                state.status = "loading"
            },
            [login.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.isAuth = payload.isAuth;
                state.currentUserId = payload.userId
                state.currentUser = payload.user
                state.authMessage = payload.message;
            },
            [login.rejected]: (state)=>{
                state.status = "failed"
            },
            [logout.pending]: (state)=>{
                state.status = "loading"
            },
            [logout.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.isAuth= payload;
                state.currentUser = "";
            },
            [logout.rejected]: (state)=>{
                state.status = "failed"
            },
            [registerUser.pending]: (state)=>{
                state.status = "loading"
            },
            [registerUser.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.authMessage = payload.message;
                state.currentUser = payload.user;
            },
            [registerUser.rejected]: (state)=>{
                state.status = "failed"
            },
            [getUpdatedCurrentUser.pending]:(state)=>{
                state.status = "loading"
            },
            [getUpdatedCurrentUser.fulfilled]:(state, {payload})=>{
                state.status = "success";
                state.currentUser = payload
            },
            [getUpdatedCurrentUser.rejected]:(state)=>{
                state.status = "failed"
            },
            [updateUserCredentials.pending]: (state)=>{
                state.status = "loading"
            },
            [updateUserCredentials.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.currentUser = payload;
            },
            [updateUserCredentials.rejected]: (state)=>{
                state.status = "failed"
            },
            [changePassword.pending]: (state)=>{
                state.status = "loading"
            },
            [changePassword.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.authMessage= payload.message
            },
            [changePassword.rejected]: (state)=>{
                state.status = "failed"
            },
        }
    })

    export default authSlice.reducer;