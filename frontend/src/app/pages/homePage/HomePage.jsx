import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../../features/auth/authSlice";
import { useEffect } from "react";
import ContactsList from "../../components/ContactsList/ContactsList";
import SideBar from "../../components/sideBar/SideBar";
import ChatsList from "../../components/chatsList/ChatsList";
import Notifications from "../../components/notifications/Notifications";
import NavigationTab from "../../components/navigationTab/NavigationTab";
import Chat from "../../components/chat/Chat";
import Avatar from "../../components/avatar/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import ChatHeader from "../../components/chatHeader/ChatHeader";
import Typography from "@mui/material/Typography";
import { setShowChat } from "../../features/chat/chatSlice";
import { useStyles } from "./styles/styles";
import { useState } from "react";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import SearchPage from "../searchPage/SearchPage";
import HomeHeader from "../../components/homeHeader/HomeHeader";

const HomePage = () => {
  const { isAuth, currentUserId, currentUser } = useSelector(
    (state) => state.auth
  );
  const { showChat } = useSelector((state) => state.chat);
  const { activeTab, toggleTabs } = useContext(AppContext);
  // const [activeTab, setActiveTab] = useState("ChatsList");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const classes = useStyles();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setShowChat(false));
    navigate("/login");
  };

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);

  return (
    <div>
      {activeTab === "Notifications" ? (
        <>
          <Notifications />
        </>
      ) : activeTab === "Calls" ? (
        <>
          <HomeHeader />
          <div>Calls</div>
        </>
      ) : activeTab === "ContactsList" ? (
        <>
          <HomeHeader />
          <ContactsList contacts={currentUser.friends} />
        </>
      ) : activeTab === "Chat" ? (
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* <SideBar/> */}
        {/* {
            showChat ? <Chat /> : <Welcome/> 
        } */}
      </div>

      {/* {currentUser && <ContactsList contacts={currentUser.friends} />} */}
      {/* <Notifications /> */}
      <NavigationTab />
    </div>
  );
};

export default HomePage;
