import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getAllContacts = createAsyncThunk("contacs/getAllContacs",
    async(id, {getState})=>{
        const response = await axios({
            method: "GET",
            url: `${BASE_URL}/users/contacts/${id}`
        });
        return response.data;
    }
    );

    const initialState = {
        contactsList: [],
        status: "idle",
        currentContact:"",
    };

    const contactsSlice = createSlice({
        name:"contacts",
        initialState,
        reducers:{
            initializeContacts: (state, {payload})=>{
                state.contactsList = payload;
            },
            addContact: (state, {payload})=>{
                // console.log(payload);
                state.contactsList = [...state.contactsList, payload];
            },
            setCurrentContact: (state, {payload})=>{
                // console.log(payload)
                state.currentContact = payload
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
    
    export const {addContact, initializeContacts, setCurrentContact} = contactsSlice.actions
    export default contactsSlice.reducer;