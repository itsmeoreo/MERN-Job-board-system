import {
  Button,
  TextField,
  createTheme,
  ThemeProvider,
  FormControl,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "../AuthPage.css";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { MuiTelInput } from "mui-tel-input";
import { Link } from "react-router-dom";
import { locations } from "../../../services/data/location";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function RegisterLevelOne(props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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

  const [phonenumber, setPhoneNumber] = React.useState("");
  const HandlePhoneNumber = (newValue, event) => {
    setPhoneNumber(newValue);
    props.SetPhoneNumber(newValue);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    props.SetPassword(event.target.value);
  };

  const [selectedGender, setSelectedGender] = useState(null);
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    props.SetGender(event.target.value);
  };

  function HandleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      props.HandleResume(selectedFile);
    }
  }

  const stateMenu = [...Object.keys(locations)];
  const [state, setState] = useState("");
  const [cityMenu, setCityMenu] = useState(
    Object.values(locations["Tamil Nadu"])
  );
  const [city, setCity] = useState("");

  function HandleState(event) {
    const selectedState = event.target.value.toString();
    setState(selectedState);
    props.SetState(selectedState);
    if (selectedState && locations[selectedState])
      setCityMenu(Object.values(locations[selectedState]));
  }

  function HandleCity(event) {
    const selectedCity = event.target.value.toString();
    setCity(selectedCity);
    props.SetCity(selectedCity);
  }

  function HandleSubmit(event) {
    props.HandleFunc();
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingBottom: "2rem" }}>
        <h2>Create an account</h2>
        <p>it only takes a few minutes</p>
        <small
          style={{
            borderTopLeftRadius: "25% 50%",
            borderTopRightRadius: "25% 50%",
            borderBottomLeftRadius: "25% 50%",
            borderBottomRightRadius: "25% 50%",
            padding: ".25rem .5rem",
            backgroundColor: "darkcyan",
            color: "white",
          }}
        >
          It's free
        </small>
        <form onSubmit={HandleSubmit}>
          <div
            className="css-registerLevelOne-input-container"
            style={{ margin: "1.5rem auto", width: "90%" }}
          >
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              style={{
                color: "black",
                borderRadius: "1.5rem",
                backgroundColor: "rgba(0, 139, 139, 0.400)",
                border: "dashed darkcyan 1.5px",
                width: "100%",
              }}
            >
              <p style={{ textAlign: "start" }}>
                <strong style={{ color: "black" }}>Upload Resume</strong>
                <br />
                PDF only (maximum size- 6mb)
              </p>
              <CloudUploadIcon
                style={{ paddingLeft: "60%", fontSize: "xx-large" }}
              />
              <VisuallyHiddenInput
                onChange={HandleFileChange}
                required
                type="file"
                accept="application/pdf"
              />
            </Button>
            <TextField
              style={{
                marginTop: "1rem",
              }}
              fullWidth
              // required
              id="outlined-required"
              label="LinkedIn URL"
              onChange={(event) => props.SetLinkedinUrl(event.target.value)}
            />
            <TextField
              style={{
                marginTop: "1rem",
              }}
              fullWidth
              required
              id="outlined-required"
              label="Full name"
              onChange={(event) => props.SetName(event.target.value)}
            />
            <TextField
              style={{
                marginTop: "1rem",
              }}
              fullWidth
              required
              id="outlined-required"
              label="Username"
              onChange={(event) => props.SetUsername(event.target.value)}
            />
            <TextField
              style={{
                marginTop: "1rem",
              }}
              type="email"
              fullWidth
              required
              id="outlined-required"
              label="Email ID"
              onChange={(event) => props.SetEmail(event.target.value)}
            />
            <FormControl
              sx={{ width: "100%" }}
              variant="outlined"
              style={{
                float: " left",
                clear: "left",
                backgroundColor: "white",
                borderBottomLeftRadius: "1.3rem",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
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
            <p style={{ color: "black", textAlign: "start" }}>Phone number *</p>
            <MuiTelInput
              style={{ width: "100%", marginTop: ".5rem" }}
              value={phonenumber}
              onChange={HandlePhoneNumber}
              defaultCountry="IN"
              defaultChecked="+91"
            />
            <p style={{ color: "black", textAlign: "start" }}>
              Current location *
            </p>
            <TextField
              select
              label="State"
              value={state}
              onChange={HandleState}
              required
              style={{ textAlign: "start", width: "50%" }}
            >
              {stateMenu.map((state, index) => (
                <MenuItem key={index} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              value={city}
              onChange={HandleCity}
              required
              label="City"
              style={{ textAlign: "start", width: "50%" }}
            >
              {cityMenu.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
            <FormControl style={{ textAlign: "start", width: "100%" }}>
              <FormLabel
                style={{ paddingLeft: ".9rem", marginTop: "1rem" }}
                id="demo-row-radio-buttons-group-label"
              >
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedGender}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  required
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  required
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  required
                />
              </RadioGroup>
            </FormControl>
            <p style={{ textAlign: "start", color: "black" }}>
              i agree to <b style={{ color: "red" }}>R</b>ed Tie’s{" "}
              <Link>Terms and conditions</Link>, <Link>privacy policy</Link>,
              and default mailer and communications settings governing the use
              of <Link>redtie.in</Link>.
            </p>
          </div>
          <Button
            className="continue-btn-registerLevel1 registerLevel-continue-btn"
            style={{
              borderRadius: "2rem",
              backgroundColor: "darkcyan",
              padding: ".5rem 1rem",
              color: "white",
            }}
            color="inherit"
            type="submit"
          >
            continue
          </Button>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default RegisterLevelOne;
