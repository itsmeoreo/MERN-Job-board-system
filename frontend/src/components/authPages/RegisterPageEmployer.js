import {
  Autocomplete,
  Button,
  createTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import LandingPageAppBar from "../navbar/Navbar";
import "./AuthPage.css";
import axios from "axios";
import { locations } from "../../services/data/location";
import { MuiTelInput } from "mui-tel-input";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function RegisterPageEmployer() {
  const navigate = useNavigate();

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

  const [employer, setEmployer] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [recruiter_employee_id, setRecruiter_employee_id] = useState("");
  const [recruiter_name, setRecruiter_name] = useState("");
  const [recruiter_email, setRecruiter_email] = useState("");
  const [recruiter_phone_number, setRecruiter_phone_number] = useState("");

  const stateMenu = [...Object.keys(locations)];
  const [cityMenu, setCityMenu] = useState(
    Object.values(locations["Tamil Nadu"])
  );
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [linkedin_url, setLinkedin_url] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhone_number] = React.useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const HandlePhoneNumber = (newValue, event) => {
    setPhone_number(newValue);
  };

  function HandleState(event) {
    const selectedState = event.target.value.toString();
    setState(selectedState);
    if (selectedState && locations[selectedState])
      setCityMenu(Object.values(locations[selectedState]));
  }

  function HandleCity(event) {
    const selectedCity = event.target.value.toString();
    setCity(selectedCity);
  }

  function HandleEmployerSelect(event) {
    setEmployer(event.target.value);
  }
  function HandleRecruiterId(event) {
    setRecruiter_employee_id(event.target.value);
  }
  function HandleRecruiterName(event) {
    setRecruiter_name(event.target.value);
  }
  function HandleRecuiterEmail(event) {
    setRecruiter_email(event.target.value);
  }
  function HandleRecruiterPhoneNumber(event) {
    setRecruiter_phone_number(event.target.value);
  }
  async function HandleSubmit(event) {
    event.preventDefault();
    if (employer === "company") {
      const companies = {
        company_name: company_name,
        recruiter_name: recruiter_name,
        recruiter_employee_id: recruiter_employee_id,
        recruiter_email: recruiter_email,
        recruiter_phone_number: recruiter_phone_number,
      };

      await axios
        .post("http://localhost:3333/company/register", companies)
        .then((response) => {alert("Your request is sent successfully, please try loggin in with your company name as username and employee id followed by your company name as the password after 24 hours");navigate("/")})
        .catch((error) => console.error(error));
    } else {
      const provider = {
        username: username,
        name: name,
        linkedin_url: linkedin_url,
        email: email,
        password: password,
        phone_number: phone_number,
        current_location_state: state,
        current_location_city: city,
        gender: gender,
      };
      await axios
        .post("http://localhost:3333/providers/register", provider)
        .then((response) => {
          Cookies.set("token", response.data.token);
          Cookies.set("user", employer);
          navigate("/home");
        })
        .catch((error) => console.error(error));
    }
  }

  const organisations = [
    {
      value: "Accenture",
      label: "Accenture",
    },
    {
      value: "JP_Morgan",
      label: "JP Morgan",
    },
    {
      value: "Zoho",
      label: "Zoho",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div
        className="css-employer-register-page"
        style={{ paddingBottom: "2rem" }}
      >
        <LandingPageAppBar />
        <h1 style={{ marginTop: "5rem" }}>You're Hiring as a !?</h1>
        <form onSubmit={HandleSubmit}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              gap: "5rem",
              marginTop: "4rem",
              marginBottom: "2rem",
            }}
          >
            <label>
              <div className="css-employer-register-options">
                <h2>FREE-LANCER</h2>
              </div>
              <input
                onClick={HandleEmployerSelect}
                type="radio"
                name="employer-detail"
                value="free-lancer"
                required
              />
              <img
                style={{
                  width: "35rem",
                  height: "20rem",
                  borderRadius: "1.5rem",
                  marginTop: "-6rem",
                }}
                src="https://images.pexels.com/photos/3584996/pexels-photo-3584996.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="option-1"
              />
            </label>
            <label>
              <div className="css-employer-register-options">
                <h2>ORGANISATION</h2>
              </div>
              <input
                onClick={HandleEmployerSelect}
                type="radio"
                name="employer-detail"
                value="company"
                required
              />
              <img
                style={{
                  width: "35rem",
                  height: "20rem",
                  borderRadius: "1.5rem",
                  marginTop: "-6rem",
                }}
                src="https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="option-2"
              />
            </label>
          </div>
          {employer === "company" ? (
            <div>
              <Autocomplete
                style={{
                  display: "inline-flex",
                  marginTop: "1rem",
                  width: "55%",
                }}
                id="free-solo-demo"
                onChange={(event, value) => setCompany_name(value)}
                freeSolo
                options={organisations.map((option) => option.label)}
                renderInput={(params) => (
                  <TextField
                    required
                    value={company_name}
                    fullWidth
                    {...params}
                    label="Company Name"
                  />
                )}
              />
              <br />
              <TextField
                style={{
                  marginTop: "1rem",
                  width: "55%",
                }}
                value={recruiter_employee_id}
                onChange={HandleRecruiterId}
                fullWidth
                id="outlined-required"
                label="Employee ID"
                required
              />
              <TextField
                style={{
                  marginTop: "1rem",
                  width: "55%",
                }}
                value={recruiter_name}
                onChange={HandleRecruiterName}
                fullWidth
                id="outlined-required"
                label="Name"
                required
              />
              <TextField
                style={{
                  marginTop: "1rem",
                  width: "55%",
                }}
                value={recruiter_email}
                onChange={HandleRecuiterEmail}
                fullWidth
                id="outlined-required"
                label="email"
                required
              />
              <TextField
                style={{
                  marginTop: "1rem",
                  width: "55%",
                }}
                value={recruiter_phone_number}
                onChange={HandleRecruiterPhoneNumber}
                fullWidth
                id="outlined-required"
                label="phone number"
                required
              />
            </div>
          ) : employer === "free-lancer" ? (
            <div>
              <TextField
                style={{
                  marginTop: "1rem",
                  width: "55%",
                }}
                fullWidth
                required
                id="outlined-required"
                label="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextField
                style={{
                  marginTop: "1rem",
                  width: "55%",
                }}
                fullWidth
                required
                id="outlined-required"
                label="Full name"
                onChange={(event) => setName(event.target.value)}
              />
              <TextField
                style={{
                  marginTop: "1rem",
                  width: "55%",
                }}
                fullWidth
                required
                id="outlined-required"
                label="LinkedIn URL"
                onChange={(event) => setLinkedin_url(event.target.value)}
              />
              <TextField
                style={{
                  marginTop: "1rem",
                  width: "55%",
                }}
                type="email"
                fullWidth
                required
                id="outlined-required"
                label="Email ID"
                onChange={(event) => setEmail(event.target.value)}
              />
              <FormControl
                sx={{ width: "100%" }}
                variant="outlined"
                style={{
                  clear: "left",
                  backgroundColor: "white",
                  borderBottomLeftRadius: "1.3rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                  width: "55%",
                }}
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  fullWidth
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
              <p style={{ color: "black", textAlign: "center", width: "55%" }}>
                Phone number *
              </p>
              <MuiTelInput
                style={{ width: "55%", marginTop: ".5rem" }}
                value={phone_number}
                onChange={HandlePhoneNumber}
                defaultCountry="IN"
                defaultChecked="+91"
              />
              <p style={{ color: "black", textAlign: "center", width: "55%" }}>
                Current location *
              </p>
              <TextField
                select
                label="State"
                value={state}
                onChange={HandleState}
                required
                style={{ textAlign: "start", width: "27.5%" }}
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
                style={{ textAlign: "start", width: "27.5%" }}
              >
                {cityMenu.map((city) => (
                  <MenuItem key={city} value={city}>
                    {city}
                  </MenuItem>
                ))}
              </TextField>
              <FormControl style={{ textAlign: "start", width: "55%" }}>
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
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
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
            </div>
          ) : (
            ""
          )}
          <Button
            className="continue-btn-registerLevel2 registerLevel-continue-btn"
            style={{
              borderRadius: "2rem",
              backgroundColor: "darkcyan",
              padding: ".5rem 1rem",
              color: "white",
              marginTop: "1rem",
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

export default RegisterPageEmployer;
