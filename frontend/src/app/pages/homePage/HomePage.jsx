import React, { useEffect, useContext } from "react";
import ContactsList from "../../components/ContactsList/ContactsList";
import ChatsList from "../../components/chatsList/ChatsList";
import Notifications from "../../components/notifications/Notifications";
import NavigationTab from "../../components/navigationTab/NavigationTab";
import Chat from "../../components/chat/Chat";
import ChatHeader from "../../components/chatHeader/ChatHeader";
import SearchPage from "../searchPage/SearchPage";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import CallsList from '../../components/callsList/CallsList';
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/Context";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { activeTab } = useContext(AppContext);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <div>
      {activeTab === "Notifications" ? (
        <>
          {!isSmallScreen && <HomeHeader /> }
          <Notifications />
        </>
      ) : activeTab === "Calls" ? (
        <>
          <HomeHeader />
         <CallsList/>
        </>
      ) : activeTab === "ContactsList" ? (
        <>
          <HomeHeader />
          <ContactsList contacts={currentUser.friends} />
        </>
      ) : isSmallScreen && activeTab === "Chat" ? (
        <>
          <ChatHeader />
          <Chat />
        </>
      ) : activeTab === "Search" ? (
        <SearchPage />
      ) : (
        <>
          <HomeHeader />
          <ChatsList contacts={currentUser.friends} />
        </>
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}></div>
       {isSmallScreen && <NavigationTab />}
    </div>
  );
};

export default HomePage;
