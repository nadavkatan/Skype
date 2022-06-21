import React from "react";
import SearchResult from "../searchResult/SearchResult";
import axios from "axios";
import { useSelector } from "react-redux";

const SearchResults = ({ foundUser }) => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { currentUser } = useSelector((state) => state.auth);

  const sendFriendRequest = async () => {
    const response = await axios({
      method: "PUT",
      url: `${BASE_URL}/users/request`,
      data: {
        id: currentUser._id,
        friendName: currentUser.username,
        friendId: foundUser._id,
      },
    });
    console.log(response);
  };

  return (
    foundUser && (
      <div>
        <h1>Search Results</h1>
        <SearchResult
          foundUser={foundUser}
          sendFriendRequest={sendFriendRequest}
        />
      </div>
    )
  );
};

export default SearchResults;
