import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {setCallAnswered} from '../../features/videoCall/videoCallSlice';
import {setCurrentContact} from '../../features/contacts/contacsSlice';
import { AppContext } from '../../context/Context';
import { useContext } from 'react';

const IncomingCall = () => {
    
    const {caller} = useSelector((state) => state.videoCall);
    const {socket} = useContext(AppContext);
    const dispatch = useDispatch();

    const handleAnswerCall = ()=>{
      dispatch(setCallAnswered(true))
      dispatch(setCurrentContact(caller))
      socket.emit('answer_call', caller)
    }

  return (
      <>
    <div>IncomingCall from {caller.username}</div>
    <button onClick={handleAnswerCall}>Answer Call</button>
      </>
  )
}

export default IncomingCall