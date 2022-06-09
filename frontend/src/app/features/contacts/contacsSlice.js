import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllContacts = createAsyncThunk("contacs/getAllContacs",
    async(id, {getState})=>{
        const response = axios({
            method: "GET",
            url: `${BASE_URL}/users/${id}`
        });
        return response.data[0];
    }
    );

    const initialState = {
        contactsList: [],
        status: "idle"
    };

    const contactsSlice = createSlice({
        name:"contacts",
        initialState,
        reducers:{
            addContact: (state, {payload})=>{
                state.contactsList = [...state.contactsList, payload];
            }
        },
        extraReducers:{
            [getAllContacts.pending]: (state)=>{
                state.status = "loading"
            },
            [getAllContacts.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.contactsList = payload;
            },
            [getAllContacts.rejected]: (state)=>{
                state.status = "failed";
            }
        }
    });
    
    export const {addContact} = contactsSlice.actions
    export default contactsSlice.reducer;