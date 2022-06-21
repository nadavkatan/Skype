import React, { useEffect } from "react";
import Contact from "../contact/Contact";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getUsersChat } from "../../features/chat/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import { MrMiyagi } from "@uiball/loaders";

const ChatsList = () => {
  const { contactsList, status } = useSelector((state) => state.contacts);
  const { currentUser } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersChat(currentUser._id));
  }, []);

  return (
    <>
      {status === "loading" && (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <MrMiyagi size={35} lineWeight={3.5} speed={1} color="#54BAB9" />
        </div>
      )}
      {chats.length ?
          chats.map((chat) => {
            if(chat.messages.length){
              const contactId = chat.members.filter(member => member !== currentUser._id);
              const correspondingContact = contactsList.find(contact => contact._id === contactId[0]);
              return <Contact key={correspondingContact._id} contact={correspondingContact} />;
            }
        })
        : <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography sx={{width:'80%'}} variant="subtitle1">You currently don't have any contacts. Use the search bar to search and connect with other skype users!</Typography>
        </Box>
        }
    </>
  );
};

export default ChatsList;
