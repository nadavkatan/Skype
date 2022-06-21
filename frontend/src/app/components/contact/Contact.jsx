import React, { useState, useEffect } from "react";
import Avatar from "../avatar/Avatar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { useStyles } from "./styles/styles";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentContact } from "../../features/contacts/contacsSlice";

const Contact = ({ contact }) => {
  const [relevantUnreadMessages, setRelevantUnreadMessages] = useState([]);
  const { currentUser } = useSelector((state) => state.auth);
  const { unreadMessages } = useSelector((state) => state.chat);
  const { handleJoinRoom, toggleTabs } = useContext(AppContext);

  const classes = useStyles();
  const dispatch = useDispatch();

  const openChat = () => {
    // find the current user object in the friends array of the currectContact object in order to get the chatId of the room and join the room
    const currentUserInContactObj = contact.friends.find(
      (friend) => friend.friendId === currentUser._id
    );
    const chatId = currentUserInContactObj.chatId;
    handleJoinRoom(chatId, contact);
    toggleTabs("Chat");
  };

  useEffect(() => {
    // If there are any unread messages stored in mongodb, filter out the unrelevant ones and display the number of unread messages on a badge
    if (unreadMessages) {
      setRelevantUnreadMessages(
        unreadMessages.filter(
          (unreadMessage) => unreadMessage.senderId === contact._id
        )
      );
    }
  }, [unreadMessages]);

  return (
    <div
      className={classes.contactContainer}
      onClick={() => dispatch(setCurrentContact(contact))}
    >
      {relevantUnreadMessages.length > 0 && (
        <Badge badgeContent={relevantUnreadMessages.length} color="primary" />
      )}
      <Avatar
        loggedIn={contact.is_logged_in}
        imgSrc={contact.avatar.secure_url}
      />
      <Typography
        className={classes.contactName}
        variant="subtitle1"
        onClick={() => openChat()}
      >
        {contact.username}
      </Typography>
    </div>
  );
};

export default Contact;
