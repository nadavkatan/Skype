import React, { useContext } from "react";
import ContactsList from "../../components/ContactsList/ContactsList";
import ChatsList from "../../components/chatsList/ChatsList";
import Notifications from "../../components/notifications/Notifications";
import NavigationTab from "../../components/navigationTab/NavigationTab";
import Chat from "../../components/chat/Chat";
import ChatHeader from "../../components/chatHeader/ChatHeader";
import SearchPage from "../searchPage/SearchPage";
import HomeHeader from "../../components/homeHeader/HomeHeader";
import CallsList from "../../components/callsList/CallsList";
import { useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { AppContext } from "../../context/Context";

const HomePage = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { activeTab } = useContext(AppContext);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", flex: 1 }}>
      {activeTab === "Notifications" ? (
        <>
          {!isSmallScreen && <HomeHeader />}
          <Notifications />
        </>
      ) : activeTab === "Calls" ? (
        <>
          <HomeHeader />
          <CallsList />
        </>
      ) : activeTab === "ContactsList" ? (
        <>
          <HomeHeader />
          <ContactsList contacts={currentUser.friends} />
        </>
      ) : isSmallScreen && activeTab === "Chat" ? (
        <Box style={{ height: "90%", flex: 10 }}>
          <ChatHeader />
          <Chat />
        </Box>
      ) : activeTab === "Search" ? (
        <SearchPage />
      ) : (
        <>
        {/* <Box style={{ height: "100%", display: "flex", flexDirection: "column", flex: 10 }}> */}
          <HomeHeader />
          <ChatsList contacts={currentUser.friends} />
        {/* </Box> */}
        </>
      )}
      {isSmallScreen &&  <NavigationTab />}
    </div>
  );
};

export default HomePage;
