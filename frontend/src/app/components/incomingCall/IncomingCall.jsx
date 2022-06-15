import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCallAnswered} from '../../features/videoCall/videoCallSlice';
import {setCurrentContact} from '../../features/contacts/contacsSlice';

const IncomingCall = () => {
    
    const {caller} = useSelector((state) => state.videoCall);
    const dispatch = useDispatch();

    const handleAnswerCall = ()=>{
      dispatch(setCallAnswered(true))
      dispatch(setCurrentContact(caller))
    }

  return (
      <>
    <div>IncomingCall from {caller.username}</div>
    <button onClick={handleAnswerCall}>Answer Call</button>
      </>
  )
}

export default IncomingCall