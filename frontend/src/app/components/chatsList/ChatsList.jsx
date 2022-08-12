import React, { useEffect, useState } from "react";
import Contact from "../contact/Contact";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getUsersChat } from "../../features/chat/chatSlice";
import { useSelector, useDispatch } from "react-redux";
import { MrMiyagi } from "@uiball/loaders";

const ChatsList = () => {
  const { contactsList } = useSelector((state) => state.contacts);
  const { currentUser } = useSelector((state) => state.auth);
  const { chats } = useSelector((state) => state.chat);
  const [activeChats, setActiveChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const sortActiveChats = () => {
    if (!isLoading) setIsLoading(true);
    setActiveChats(
      chats.filter((chat) => {
        if (chat.messages.length > 0) return chat;
      })
    );
    if (isLoading) setIsLoading(false);
  };

  useEffect(() => {
    if (!activeChats.length) {
      setIsLoading(true);
      dispatch(getUsersChat(currentUser._id));
    }
  }, []);

  useEffect(() => {
    sortActiveChats();
  }, [chats]);

  return (
    <Box
      style={{
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
        flex: 8,
      }}
    >
      {isLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <MrMiyagi size={35} lineWeight={3.5} speed={1} color="#54BAB9" />
        </div>
      ) : activeChats.length ? (
        chats.map((chat) => {
          if (chat.messages.length) {
            const contactId = chat.members.filter(
              (member) => member !== currentUser._id
            );
            const correspondingContact = contactsList.find(
              (contact) => contact._id === contactId[0]
            );
            if (correspondingContact)
              return (
                <Contact
                  key={correspondingContact._id}
                  contact={correspondingContact}
                />
              );
          }
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            overflowY: "scroll",
            marginTop: "0.5em",
          }}
        >
          <Typography
            sx={{ width: "80%", textAlign: "center" }}
            variant="subtitle1"
          >
            You currently don't have any active chats. Start chatting with your
            contacts and your chats will appear here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatsList;
