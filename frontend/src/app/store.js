import {configureStore} from '@reduxjs/toolkit';
import usersSlice from './features/users/usersSlice';
import authSlice from './features/auth/authSlice';
import chatSlice from './features/chat/chatSlice';

export const store = configureStore({
    reducer:{
        users:usersSlice,
        auth:authSlice,
        chat: chatSlice,
    }
})