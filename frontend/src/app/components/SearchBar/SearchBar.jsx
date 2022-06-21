import React, { useState, useContext, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { useStyles } from "./styles/styles";
import { AppContext } from "../../context/Context";

const SearchBar = ({ users, setSearchResults }) => {

  const [username, setUsername] = useState("");
  const { currentUser } = useSelector((state) => state.auth);
  const { toggleTabs } = useContext(AppContext);

  const classes = useStyles();

  const autoSearch = (username) => {
    const searchResults = users.filter((user) => {
      if (
        user.username !== currentUser.username &&
        user.username.includes(username)
      ) {
        return user;
      }
    });
    setSearchResults(searchResults);
  };

  useEffect(() => {
    autoSearch(username);
  }, [username]);

  return (
    <div className={classes.searchBarContainer}>
      <ArrowBackIcon
        className={classes.searchBarArrowBack}
        onClick={() => toggleTabs("ChatsList")}
      />
      <label>
        <input
          className={classes.searchBarInput}
          placeholder="Search Skype"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
    </div>
  );
};

export default SearchBar;
