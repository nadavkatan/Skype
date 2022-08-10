import React, { useEffect } from 'react';
import Contact from '../contact/Contact';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {useSelector, useDispatch} from 'react-redux';
import { getAllContacts } from '../../features/contacts/contacsSlice';

const ContactsList = () => {

  const {contactsList, status} = useSelector((state) => state.contacts);
  const {currentUser} = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllContacts(currentUser._id))
  },[])

  return (
    <Box style={{overflowY:'scroll', display: 'flex', flexDirection:'column', height:'75%', flex: 8}}>
    {
      status === "loading" && <></>
    }
    {
      contactsList.length > 0 ? contactsList.map(contact => {
        return <Contact key={contact._id} contact={contact}/>
      })
      : <Box sx={{display: 'flex', justifyContent: 'center', marginTop:'0.5em'}}>
        <Typography sx={{width:'80%', textAlign: 'center'}} variant="subtitle1">You currently don't have any contacts. Use the search bar to search and connect with other skype users!</Typography>
        </Box>
    }
    </Box>
  )
}

export default ContactsList