import {configureStore} from '@reduxjs/toolkit';
import usersSlice from './features/users/usersSlice';
import authSlice from './features/auth/authSlice';
import chatSlice from './features/chat/chatSlice';
import contactsSlice from './features/contacts/contacsSlice';
import friendRequestsSlice from './features/friendRequests/friendRequestsSlice';
import notificationsSlice from './features/notifications/notificationsSlice';
import videoCallSlice from './features/videoCall/videoCallSlice';

export const store = configureStore({
    reducer:{
        users:usersSlice,
        auth:authSlice,
        chat: chatSlice,
        contacts:contactsSlice,
        friendRequests:friendRequestsSlice,
        notifications:notificationsSlice,
        videoCall: videoCallSlice
    }
})