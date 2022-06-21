import React from "react";
import ChatIcon from "@mui/icons-material/Chat";
import ContactsIcon from "@mui/icons-material/Contacts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CallIcon from "@mui/icons-material/Call";
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
  
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));


  return (
    <div className={isSmallScreen ? classes.navTabContainer : classes.lgScreenNavTabContainer}>
      <div
        onClick={() => toggleTabs("ChatsList")}
        className={classes.iconContainer}
      >
        <ChatIcon
          className={
            activeTab === "ChatsList" ? classes.activeTabIcon : classes.tabIcon
          }
        />
        <Typography className={classes.iconsText} variant="subtitle1">
          Chats
        </Typography>
      </div>
      <div
        onClick={() => toggleTabs("Calls")}
        className={classes.iconContainer}
      >
        <CallIcon
          className={
            activeTab === "Calls" ? classes.activeTabIcon : classes.tabIcon
          }
        />
        <Typography className={classes.iconsText} variant="subtitle1">
          Calls
        </Typography>
      </div>
      <div
        onClick={() => toggleTabs("ContactsList")}
        className={classes.iconContainer}
      >
        <ContactsIcon
          className={
            activeTab === "ContactsList"
              ? classes.activeTabIcon
              : classes.tabIcon
          }
        />
        <Typography className={classes.iconsText} variant="subtitle1">
          Contacts
        </Typography>
      </div>
      <div
        onClick={() => toggleTabs("Notifications")}
        className={classes.iconContainer}
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
          <NotificationsIcon
            className={
              activeTab === "Notifications"
                ? classes.activeTabIcon
                : classes.tabIcon
            }
          />
        )}
        <Typography className={classes.iconsText} variant="subtitle1">
          Notifications
        </Typography>
      </div>
    </div>
  );
};

export default NavigationTab;
