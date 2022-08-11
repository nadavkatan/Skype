import React, { useState } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ContactsIcon from "@mui/icons-material/Contacts";
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CallIcon from "@mui/icons-material/Call";
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { useMediaQuery } from "@mui/material";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useStyles } from "./styles/styles";

const NavigationTab = () => {
  const { toggleTabs, activeTab } = useContext(AppContext);
  const {notifications} = useSelector((state) => state.notifications);
  const [hoveredIcon, setHoveredIcon] = useState({
    chats: false,
    calls: false,
    contacts: false,
    notifications: false,
  })
  
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleHover = (icon,bool)=>{
     setHoveredIcon({
      ...hoveredIcon,
        [icon]:bool
    })
  }


  return (
    <div className={isSmallScreen ? classes.navTabContainer : classes.lgScreenNavTabContainer}>
      <div
        onClick={() => toggleTabs("ChatsList")}
        className={classes.iconContainer}
        name= 'chats'
      onMouseOver={()=>handleHover('chats', true)}
      onMouseLeave={()=>handleHover('chats', false)}
      >
      {
        hoveredIcon.chats || activeTab === "ChatsList" ? 
        <ChatIcon
          className={
            activeTab === "ChatsList" ? classes.activeTabIcon : classes.tabIcon
          }
        />
        : 
        <ChatOutlinedIcon />
      }

        <Typography className={classes.iconsText} variant="subtitle1">
          Chats
        </Typography>
      </div>
      <div
        onClick={() => toggleTabs("Calls")}
        className={classes.iconContainer}
        onMouseOver={()=>handleHover('calls', true)}
        onMouseLeave={()=>handleHover('calls', false)}
      >
      {
        hoveredIcon.calls || activeTab === "Calls" ?
        <CallIcon
          className={
            activeTab === "Calls" ? classes.activeTabIcon : classes.tabIcon
          }
        />
        : 
        <CallOutlinedIcon/>
      }

        <Typography className={classes.iconsText} variant="subtitle1">
          Calls
        </Typography>
      </div>
      <div
        onClick={() => toggleTabs("ContactsList")}
        className={classes.iconContainer}
        onMouseOver={()=>handleHover('contacts', true)}
        onMouseLeave={()=>handleHover('contacts', false)}
      >
      {
        hoveredIcon.contacts || activeTab === "ContactsList" ?
        <ContactsIcon
          className={
            activeTab === "ContactsList"
              ? classes.activeTabIcon
              : classes.tabIcon
          }
        /> 
        :
        <ContactsOutlinedIcon/>
      }

        <Typography className={classes.iconsText} variant="subtitle1">
          Contacts
        </Typography>
      </div>
      <div
        onClick={() => toggleTabs("Notifications")}
        className={classes.iconContainer}
        onMouseOver={()=>handleHover('notifications', true)}
      onMouseLeave={()=>handleHover('notifications', false)}
      >
        {notifications.length ? (
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon
              className={
                activeTab === "Notifications"
                  ? classes.activeTabIcon
                  : classes.tabIcon
              }
            />
          </Badge>
        ) : (

          hoveredIcon.notifications || activeTab === "Notifications" ? 
          <NotificationsIcon
            className={
              activeTab === "Notifications"
                ? classes.activeTabIcon
                : classes.tabIcon
            }
          />
          : 
          <NotificationsNoneOutlinedIcon/>
        )}
        <Typography className={classes.iconsText} variant="subtitle1">
          Notifications
        </Typography>
      </div>
    </div>
  );
};

export default NavigationTab;
