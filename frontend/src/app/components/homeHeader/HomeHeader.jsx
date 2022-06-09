import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '../avatar/Avatar';
import Typography from '@mui/material/Typography';
import {AppContext} from '../../context/Context';
import { useContext } from 'react';
import {useStyles} from './styles/styles';
import Drawer from '../drawer/Drawer';


const HomeHeader = () => {

    const{toggleTabs}= useContext(AppContext);
    const classes = useStyles();

  return (
    <div className={classes.profileContainer}>
    <div  className={classes.avatarContainer}>
    <Drawer/>
    </div>
    <div className={classes.searchContainerLink} onClick={()=>toggleTabs("Search")}>
    <SearchIcon />
    <Typography variant="subtitle1">Search</Typography>
    </div>
    </div>
  )
}

export default HomeHeader