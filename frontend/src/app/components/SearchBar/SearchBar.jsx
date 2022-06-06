import React from 'react';
import { useState, useContext, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useStyles} from './styles/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {AppContext} from '../../context/Context';

const SearchBar = ({searchSkype, users, setSearchResults}) => {

    const [username, setUsername] = useState("");

    const {currentUser} = useSelector((state) => state.auth);
    const {toggleTabs} = useContext(AppContext);
    const dispatch = useDispatch();
    const classes = useStyles();

    // const handleClick=(username)=>{
    //    dispatch(findUser(username)); 
    // }

    const autoSearch = (username)=>{
      const searchResults = users.filter(user => {
        if(user.username !==currentUser.username && user.username.includes(username)){
          return user
        }
      })
      setSearchResults(searchResults)
    }

    useEffect(()=>{
      autoSearch(username)
    },[username])

    useEffect(()=>{
        console.log("current user: ",currentUser);
    },[currentUser])

  return (
    <div className={classes.searchBarContainer}>
    <ArrowBackIcon className={classes.searchBarArrowBack} onClick={()=> toggleTabs("ChatsList")}/>
    <label>
        <input className={classes.searchBarInput} placeholder="Search Skype" type="text" value={username} onChange={e=> setUsername(e.target.value)} />
        {/* <button onClick={()=>searchSkype(username)}>Search</button> */}
    </label>
    </div>
  )
}

export default SearchBar