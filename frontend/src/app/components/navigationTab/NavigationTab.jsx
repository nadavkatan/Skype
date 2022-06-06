import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import ContactsIcon from '@mui/icons-material/Contacts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CallIcon from '@mui/icons-material/Call';
import {useStyles} from './styles/styles';
import { Typography } from '@mui/material';
import {AppContext} from '../../context/Context';
import { useContext } from 'react';

const NavigationTab = () => {
    const classes = useStyles();
    const {toggleTabs, activeTab} = useContext(AppContext);

  return (
    <div className={classes.navTabContainer}>
    <div onClick={()=>toggleTabs("ChatsList")} className={classes.iconContainer}>
    <ChatIcon className={activeTab === "ChatsList" ? classes.activeTabIcon : classes.tabIcon} />
    <Typography className={classes.iconsText} variant='subtitle1'>Chats</Typography>
    </div>
    <div onClick={()=>toggleTabs("Calls")} className={classes.iconContainer}>
    <CallIcon className={activeTab === "Calls" ? classes.activeTabIcon : classes.tabIcon} />
    <Typography className={classes.iconsText} variant='subtitle1'>Calls</Typography>
    </div>
    <div onClick={()=>toggleTabs("ContactsList")} className={classes.iconContainer}>
    <ContactsIcon className={activeTab === "ContactsList" ? classes.activeTabIcon : classes.tabIcon} />
    <Typography className={classes.iconsText} variant='subtitle1'>Contacts</Typography>
    </div>
    <div onClick={()=>toggleTabs("Notifications")} className={classes.iconContainer}>
    <NotificationsIcon className={activeTab === "Notifications" ? classes.activeTabIcon : classes.tabIcon} />
    <Typography className={classes.iconsText} variant='subtitle1'>Notifications</Typography>
    </div>
</div>
  )
}

export default NavigationTab