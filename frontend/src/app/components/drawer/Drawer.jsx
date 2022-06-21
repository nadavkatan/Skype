import * as React from "react";
import Avatar from '../avatar/Avatar';
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from '@mui/icons-material/Edit';
import {useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import {logout} from '../../features/auth/authSlice';
import {setShowChat} from '../../features/chat/chatSlice';

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
  });
  const {isAuth, currentUser} = useSelector((state)=> state.auth);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setShowChat(false));
    navigate("/login");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.target.name === "folders" &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };


  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
    >
      <List>
        <ListItem
          disablePadding
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <ListItemButton onClick={()=> navigate(`/edit/${currentUser._id}`)}>
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary={"Edit profile"} />
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"logout"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {isAuth && (
        <>
          {["top"].map((anchor) => (
            <React.Fragment key={anchor}>
              <Button onClick={toggleDrawer(anchor, true)}>
                <Avatar imgSrc={currentUser.avatar.secure_url} loggedIn={currentUser.is_logged_in} />
              </Button>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  );
}
