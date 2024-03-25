import React, { useState } from "react";
import Footer from "../footer/Footer.js";
import LandingPageAppBar from "../navbar/Navbar.js";
import LoginPageBG from "../../services/images/LoginPageBG.jpg";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Switch,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility.js";
import VisibilityOff from "@mui/icons-material/VisibilityOff.js";
import "./AuthPage.css";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Cookies from "js-cookie";

function LoginPage() {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "darkcyan",
            },
            "&active .MuiOutlinedInput-notchedOutline": {
              borderColor: "darkcyan",
            },
          },
        },
      },
    },
  });

  const navigate= useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [provider, setProvider] = useState(false)
  const [login, setLogin] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function HandleSubmit(event) {
    event.preventDefault();
    const user= {
      username: username,
      password: password
    }
    switch (true) {
      case !provider:
        await axios
          .post('http://localhost:3333/seekers/login', user)
          .then(response=> {
            Cookies.set("token",response.data.token)
            Cookies.set("user", "seeker")
            navigate('/home');
          })
          .catch((error)=> console.log(error.message))
        break;
      case login && login==="free_lancer":
        await axios
          .post('http://localhost:3333/providers/login', user)
          .then(response=> {
            Cookies.set("token",response.data.token)
            Cookies.set("user", "free-lancer")
            navigate('/home');
          })
          .catch((error)=> console.log(error.message))
        break;
      case login && login==="company":
        await axios
          .post('http://localhost:3333/company/login', user)
          .then(response=> {
            Cookies.set("token",response.data.token)
            Cookies.set("user", "company")
            navigate('/home');
          })
          .catch((error)=> console.log(error.message))
        break;
    }
  }
  

  return (
    <ThemeProvider theme={theme}>
      <LandingPageAppBar inHome={false} inLogin={true} />
      <div
        style={{
          backgroundImage: `url(${LoginPageBG})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "absolute",
          backgroundSize: "cover",
          paddingBottom: "15%",
          marginTop: "4rem"
        }}
      >
        <form onSubmit={HandleSubmit}>
          <div style={{display: "flex"}} >
            <div style={{alignItems: "center", paddingTop: "12%", display:"flex", width: "100%", justifyContent: "flex-end", marginRight: "8%"}}>
              <p style={!provider?{color: "darkcyan"}: null}>Seekers</p>
              <Switch style={{display: "flex", justifyContent: "flex-end", color: "darkcyan"}} onChange={(event)=> setProvider(event.target.checked)}/>
              <p style={provider?{color: "darkcyan"}: null}>Providers</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "8%",
              }}
            >
              <div>
                <TextField
                  className="css-loginpage-username"
                  sx={{ width: "40ch" }}
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  required
                  onChange={(event)=> setUsername(event.target.value)}
                  style={{
                    float: " left",
                    backgroundColor: "white",
                    borderTopLeftRadius: "1.3rem",
                  }}
                />
                <FormControl
                  className="css-loginpage-password"
                  sx={{ width: "40ch" }}
                  variant="outlined"
                  style={{
                    float: " left",
                    clear: "left",
                    backgroundColor: "white",
                    borderBottomLeftRadius: "1.3rem",
                  }}
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={(event)=> setPassword(event.target.value)}
                    required
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
              </div>
              {provider?
                <div style={{display: "flex", flexDirection: "column"}}>
                  <Button
                    onClick={event=>setLogin("free_lancer")}
                    className="css-search-field-searchbtn"
                    sx={{ width: 150 }}
                    type='submit'
                    style={{
                      borderTopRightRadius: "1.3rem",
                      backgroundColor: "darkcyan",
                      color: "white",
                      height: "100%"
                    }}
                  >
                    free lancer
                  </Button>
                  <Button
                    onClick={event=>setLogin("company")}
                    className="css-search-field-searchbtn"
                    sx={{ width: 150 }}
                    type='submit'
                    style={{
                      borderBottomRightRadius: "1.3rem",
                      backgroundColor: "darkcyan",
                      color: "white",
                      height: "100%"
                    }}
                  >
                    company
                  </Button>
                </div>
              :
                <Button
                  className="css-search-field-searchbtn"
                  sx={{ width: 150 }}
                  type='submit'
                  style={{
                    borderTopRightRadius: "1.3rem",
                    borderBottomRightRadius: "1.3rem",
                    backgroundColor: "darkcyan",
                    color: "white",
                  }}
                >
                  Log in
                </Button>
              }
              
            </div>
          </div>
        </form>
        <p
          style={{
            color: "black",
            textAlign: "end",
            marginRight: "8%",
          }}
        >
          Don't have a account try <Link to="/register">creating account</Link>
        </p>
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default LoginPage;
