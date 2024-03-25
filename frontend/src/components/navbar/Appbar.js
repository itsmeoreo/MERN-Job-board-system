import {
  AppBar,
  Box,
  createTheme,
  Divider,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  TextField,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Landing_page_logo from "../../services/images/Landing_page_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "../pages/loading/Loading";

function Appbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    switch (userType) {
      case "seeker":
        setLoading(true);
        axios
          .get("http://localhost:3333/seekers/user", { withCredentials: true })
          .then((response) => setUser(response.data))
          .catch((error) => console.log(error.message));
        break;
      case "free-lancer":
        axios
          .get("http://localhost:3333/providers/user", {
            withCredentials: true,
          })
          .then((response) => setUser(response.data))
          .catch((error) => console.log(error));
        break;
      case "company":
        axios
          .get("http://localhost:3333/company/user", {
            withCredentials: true,
          })
          .then((response) => setUser(response.data))
          .catch((error) => console.log(error));
        break;
    }
  }, []);

  useEffect(() => {
    async function getNotifications() {
      await axios
        .get("http://localhost:3333/notifications/all", {
          withCredentials: true,
        })
        .then((response) => setNotifications(response.data))
        .catch((error) => console.log(error));
    }
    if (user) {
      getNotifications();
    }
  }, [user]);

  useEffect(() => {
    if (notifications !== null) setLoading(false);
    console.log(notifications);
  }, [notifications]);

  const theme = createTheme({
    palette: {
      darkcyan: {
        main: "#008B8B",
        light: "#008B8B",
        dark: "#008B8B",
        contrastText: "#ffffff",
      },
      grey: {
        main: "#777777",
      },
    },
  });

  const userType = Cookies.get("user");

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          className="css-appbar"
          style={{
            backgroundColor: "white",
            borderBottom: "solid .1rem black",
          }}
          position="fixed"
        >
          <Toolbar>
            <img
              style={{ height: "3rem", marginLeft: "3rem" }}
              src={Landing_page_logo}
              alt="loo"
            />
            <Typography
              variant="h6"
              noWrap
              component="div"
              href="/"
              sx={{
                flexGrow: 1,
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <Link
                to="/home"
                style={{ color: "black", textDecoration: "none" }}
              >
                <strong style={{ color: "red" }}>R</strong>ed Tie
              </Link>
            </Typography>
            <div>
              <NotificationsIcon
                fontSize="large"
                onClick={()=>setShowNotifications(!showNotifications)}
                style={showNotifications ?
                  { margin: "0 2rem", color: "darkcyan", cursor: "pointer" }
                :
                  { margin: "0 2rem", color: "grey", cursor: "pointer" }}
              />
              {loading ?
                <Loading style={{padding: "2rem 2rem"}} />
              :
                <div
                  style={showNotifications ?{
                      marginLeft: "-16rem",
                      width: "20rem",
                      backgroundColor: "white",
                      minHeight: "fit-content",
                      maxHeight: "20rem",
                      overflowY: "scroll",
                      border: "solid grey 1px",
                      marginTop: ".5rem",
                      display: "block",
                      color: "black",
                      listStyle: "none",
                      position: "absolute",
                      boxShadow: "darkcyan .5rem .5rem .8rem"
                    }
                  :
                    {
                      marginLeft: "-16rem",
                      width: "20rem",
                      backgroundColor: "white",
                      minHeight: "fit-content",
                      maxHeight: "20rem",
                      overflowY: "scroll",
                      border: "solid grey 1px",
                      marginTop: ".5rem",
                      display: "none",
                      color: "black",
                      listStyle: "none",
                      position: "absolute",
                    }
                }
                >
                  {notifications === null? 
                    notifications.map((notification)=> 
                      <Link style={{color: "unset", textDecoration: "none"}} to={`/job/${notification.job}`} onclick={()=>Cookies.set('job',notification.job)}>
                        <li
                          style={{ padding: ".5rem", borderBottom: "solid grey 1px" }}
                        >
                          {notification.content}
                        </li>
                      </Link>
                    )
                  :
                    <li
                      style={{ padding: ".5rem", borderBottom: "solid grey 1px" }}
                    >You have no notifications catch up later</li>
                  }
                </div>
              }
              <NavLink to="/" style={{ color: "white" }}>
                {userType !== "seeker" ? (
                  <NavLink to="/new_job">
                    <NoteAddIcon
                      fontSize="large"
                      color="grey"
                      style={{ marginRight: "2rem" }}
                    />
                  </NavLink>
                ) : (
                  <BookmarkIcon
                    fontSize="large"
                    color="grey"
                    style={{ marginRight: "2rem" }}
                  />
                )}
              </NavLink>
              <NavLink to="/user" style={{ color: "white" }}>
                <AccountCircleRoundedIcon
                  fontSize="large"
                  color="grey"
                  style={{ marginRight: "4rem" }}
                />
              </NavLink>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Appbar;
