import {configureStore} from '@reduxjs/toolkit';
import usersSlice from './features/users/usersSlice';
import authSlice from './features/auth/authSlice';
import chatSlice from './features/chat/chatSlice';
import contactsSlice from './features/contacts/contacsSlice';
import friendRequestsSlice from './features/friendRequests/friendRequestsSlice';

export const store = configureStore({
    reducer:{
        users:usersSlice,
        auth:authSlice,
        chat: chatSlice,
        contacts:contactsSlice,
        friendRequests:friendRequestsSlice
    }
})