import React from "react";
import Contact from "../contact/Contact";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";

const ChatsList = () => {
  const { contactsList, status } = useSelector((state) => state.contacts);

  return (
    <>
    {
      status === "loading" && <div>loading...</div>
    }
      {contactsList.length ?
        contactsList.map((contact) => {
          return <Contact key={contact._id} contact={contact} />;
        })
        : <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{width:'80%'}} variant="subtitle1">You currently don't have any contacts. Use the search bar to search and connect with other skype users!</Typography>
        </Box>
        }
    </>
  );
};

export default ChatsList;
