import {
  AppBar,
  Badge,
  Box,
  Button,
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
import { Link, NavLink, useNavigate } from "react-router-dom";
import Landing_page_logo from "../../services/images/Landing_page_logo.png";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "../pages/loading/Loading";

function Appbar(props) {

  const navigate= useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [length,setLength] = useState(0)
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState(null);
  const [user, setUser] = useState(null);

  function HandleLogout(){
    const cookieNames = Object.keys(Cookies.get());
    cookieNames.forEach(cookieName => {
      Cookies.remove(cookieName);
    })
    navigate("/");
  }

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
    if (notifications !== null) {
      setLength(Object.entries(notifications).length)
      setLoading(false);
    }
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
              {props.Admin?
                <a 
                  href="#admin-page"
                  style={{ color: "black", textDecoration: "none" }}
                >
                  <strong style={{ color: "red" }}>R</strong>ed Tie
                </a>
              :
              <Link
                to="/home"
                style={{ color: "black", textDecoration: "none" }}
              >
                <strong style={{ color: "red" }}>R</strong>ed Tie
              </Link>
              }
            </Typography>
            {props.Admin ?
              <Button
                onClick={HandleLogout}
                style={{
                  margin: ".5rem",
                  backgroundColor: "rgb(200, 30, 30)",
                  color: "white",
                  borderRadius: "1.5rem",
                }}
              >
                log out
              </Button>
            :
              <div style={{display: "flex" ,gap: "2rem"}}>
                <Badge color="error" badgeContent={length}>
                  <NotificationsIcon
                    fontSize="large"
                    onClick={()=>setShowNotifications(!showNotifications)}
                    style={showNotifications ?
                      { color: "darkcyan", cursor: "pointer" }
                    :
                      { color: "grey", cursor: "pointer" }}
                  />
                </Badge>
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
                        marginTop: "3rem",
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
                    {length !== 0? (
                      notifications.map((notification)=> 
                        <Link style={{color: "unset", textDecoration: "none"}} to={`/job/${notification.job}`} onclick={()=>Cookies.set('job',notification.job)}>
                          <li
                            style={{ padding: ".5rem", borderBottom: "solid grey 1px" }}
                          >
                            {notification.content}
                          </li>
                        </Link>
                      )
                    ) : (
                      <li
                        style={{ padding: ".5rem", borderBottom: "solid grey 1px" }}
                      >You have no notifications catch up later</li>
                    )}
                  </div>
                }
                <NavLink to="/" style={{ color: "white" }}>
                  {userType !== "seeker" ? (
                    <NavLink to="/new_job">
                      <NoteAddIcon
                        className="note-add-icon"
                        fontSize="large"
                        color="grey"
                      />
                    </NavLink>
                  ) : (
                    <BookmarkIcon
                      className="bookmark-icon"
                      fontSize="large"
                      color="grey"
                    />
                  )}
                </NavLink>
                <NavLink to="/user" style={{ color: "white" }}>
                  <AccountCircleRoundedIcon
                    className="account-icon"
                    fontSize="large"
                    color="grey"
                    style={{ marginRight: "4rem" }}
                  />
                </NavLink>
              </div>
            }
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default Appbar;
