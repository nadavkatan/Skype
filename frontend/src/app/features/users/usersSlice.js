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

// export const getCurrentUser = createAsyncThunk("users/getCurrentUser",
//     async(id, {getState})=>{
//         const response = await axios({
//             method: "GET",
//             url: `${BASE_URL}/users/${id}`,
//         });
//         return response.data;
//     }
// )

    export const getAllUsers = createAsyncThunk("users/getAllUsers",
        async(args, {getState})=>{
            const reponse = await axios({
                method: "GET",
                url: `${BASE_URL}/users`,
            });
            console.log(reponse);
            return reponse.data;
        }
    )

    export const addFriend = createAsyncThunk("users/addFriend",
        async(args, {getState})=>{
            try{
                const response = await axios({
                    method:'PUT',
                    url: `${BASE_URL}/users`,
                    data:{
                        id: args.id,
                        username: args.username,
                        friendId: args.friendId,
                        friendName: args.friendName
                    }
                });
                console.log(response);
                return {friendId: args.friendId, friendName: args.friendName}
            }catch(e){
                console.log(e);
            }
        }
    )

    export const sendFriendRequest = createAsyncThunk("users/sendFriendRequest",
        async(args, {getState})=>{
            const response = await axios({
                method: 'PUT',
                url: `${BASE_URL}/users/request`,
                data:{
                    id: args.id,
                    friendName: args.friendName,
                    friendId: args.friendId,
                }
            })
            console.log(response);
            return response.data
        }
    )

    export const storeFriendRequest = createAsyncThunk("users/storeFriendRequest",
        async(args, {getState})=>{
            console.log("args: ",args)
            const response = await axios({
                method: 'POST',
                url:`${BASE_URL}/friend-requests`,
                data:{
                    sender_id:args.sender_id,
                    sender_name:args.sender_name,
                    receiver_id:args.receiver_id,
                    receiver_name:args.receiver_name
                }
            });
            console.log(response);
            return response.data
        }
    )

    // const sendFriendRequest = async () => {
    //     const response = await axios({
    //       method: "PUT",
    //       url: `${BASE_URL}/users/request`,
    //       data: {
    //         id: currentUser._id,
    //         friendName: currentUser.username,
    //         friendId: foundUser._id,
    //       },
    //     });
    //     console.log(response);
    //   };

    const initialState = {
        allUsers: [],
        currentUser:"",
        foundUser:"",
        friendRequestFrom:[],
        friendRequestsTo:[],
        friends:[],
        status: "idle"
    };

    const usersSlice = createSlice({
        name:"users",
        initialState,
        extraReducers:{
            // [getCurrentUser.pending]: (state)=>{
            //     state.status = "loading"
            // },
            // [getCurrentUser.fulfilled]: (state, {payload})=>{
            //     state.status = "success";
            //     state.currentUser = payload;
            // },
            // [getCurrentUser.rejected]: (state)=>{
            //     state.status = "failed";
            // },
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
            },
            [sendFriendRequest.pending]: (state)=>{
                state.status = "loading"
            },
            [sendFriendRequest.fulfilled]: (state)=>{
                state.status = "success"
            },
            [sendFriendRequest.rejected]: (state)=>{
                state.status = "failed"
            },
            [storeFriendRequest.pending]: (state)=>{
                state.status = "loading"
            },
            [storeFriendRequest.fulfilled]: (state)=>{
                state.status = "success"
            },
            [sendFriendRequest.rejected]: (state)=>{
                state.status = "failed"
            },
            [addFriend.pending]: (state)=>{
                state.status = "loading"
            },
            [addFriend.fulfilled]: (state, {payload})=>{
                state.status = "success";
                state.friends = [...state.friends, payload]
            },
            [addFriend.rejected]: (state)=>{
                state.status = "failed"
            }
        }
    });
    
    export default usersSlice.reducer;