import React from 'react';
import {useSelector} from 'react-redux';

const Welcome = () => {

    const {currentUser} = useSelector((state)=> state.auth);

  return (
    <div>Welcome {currentUser.first_name} {currentUser.last_name}</div>
  )
}

export default Welcome