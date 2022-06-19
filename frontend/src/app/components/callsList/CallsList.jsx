import { Divider, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getUserCalls} from '../../features/videoCall/videoCallSlice';

const CallsList = () => {
    const {calls} = useSelector((state) => state.videoCall);
    const {currentUser} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
    dispatch(getUserCalls(currentUser._id));
    },[])

  return (
    <Box>
    {
        calls.length > 0 && calls.map((call, i) => {
            const username = call.participants.filter(participant => participant.participant_username !== currentUser.username);
            return <Box key={i} style={{ display:'flex', justifyContent: 'space-around', marginBottom:'0.3em'}}>
             <Typography variant="subtitle1">{username[0].participant_username}</Typography>
               <Typography variant="subtitle1">{call.call_duration}</Typography>
            </Box>
        })
        }
    </Box>
  )
}

export default CallsList