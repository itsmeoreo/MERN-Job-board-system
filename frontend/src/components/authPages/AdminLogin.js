import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingPageAppBar from "../navbar/Navbar";

function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [admin, setAdmin] = useState(null);

  async function HandleSubmit(event) {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    await axios
      .post("http://localhost:3333/administrator", user)
      .then((response) => {
        Cookies.set("token", response.data.token);
        Cookies.set("user", "admin");
        navigate("/admin_page");
      })
      .catch((error) => console.log(error.response.data));
  }

  return (
    <div
      className="admin-login"
      style={{
        padding: "8rem 20rem",
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      <LandingPageAppBar />
      <div className="admin-login-main-container">
        <h1 style={{ color: "darkcyan" }}>Admin Login</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              borderRadius: "1.5rem",
              padding: "10rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              backgroundColor: "rgb(213,233,233",
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
                  onChange={(event) => setUsername(event.target.value)}
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
                    onChange={(event) => setPassword(event.target.value)}
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

              <Button
                className="css-search-field-searchbtn"
                sx={{ width: 150 }}
                onClick={HandleSubmit}
                style={{
                  borderTopRightRadius: "1.3rem",
                  borderBottomRightRadius: "1.3rem",
                  backgroundColor: "darkcyan",
                  color: "white",
                }}
              >
                Log in
              </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
