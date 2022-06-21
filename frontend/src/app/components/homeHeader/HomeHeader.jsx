import React from "react";
import Drawer from "../drawer/Drawer";
import NavigationTab from "../navigationTab/NavigationTab";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import { AppContext } from "../../context/Context";
import { useContext } from "react";
import { useStyles } from "./styles/styles";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";

const HomeHeader = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { toggleTabs } = useContext(AppContext);
  
  const classes = useStyles();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <>
      <div className={classes.profileContainer}>
        {isSmallScreen ? (
          <div className={classes.avatarContainer}>
            <Drawer />
          </div>
        ) : (
          <div className={classes.lgScreenUserInfo}>
            <Drawer />
            <Typography className={classes.sideBarHeaderUsername} variant="subtitle1">{currentUser.username}</Typography>
          </div>
        )}
        <div
          className={classes.searchContainerLink}
          onClick={() => toggleTabs("Search")}
        >
          <SearchIcon className={classes.searchIcon} />
          <Typography className={classes.searchPlaceholder} variant="subtitle1">
            Search
          </Typography>
        </div>
      </div>
      {!isSmallScreen && <NavigationTab />}
    </>
  );
};

export default HomeHeader;
