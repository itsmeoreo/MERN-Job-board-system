import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faGenderless, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Badge, Button, createTheme, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, styled, TextField, ThemeProvider } from '@mui/material'
import React, { useState } from 'react'
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { MuiTelInput } from 'mui-tel-input'
import { locations } from '../../../../services/data/location'
import axios from 'axios'

function ProvidersUpdatePage({user, Editing, SetEditing, SetLoading }) {

  const navigate= useNavigate();

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

  const [profile_picture,setProfile_picture] = useState(user.profile_picture)
  const [name, setName] = useState(user.name)
  const [linkedin_url, setLinkedin_url] = useState(user.linkedin_url)
  const [email, setEmail] = useState(user.email)
  const [phone_number, setPhone_number] = useState(user.phone_number)
  const [state, setState] = useState(user.current_location_state);
  const [city, setCity] = useState(user.current_location_city);
  const [gender, setGender] = useState(user.gender)

  function HandleProfileChange(event){
    const selectedFile = event.target.files[0];
    setProfile_picture(selectedFile)
  }

  const stateMenu = [...Object.keys(locations)];
  const [cityMenu, setCityMenu] = useState(
    Object.values(locations[user.current_location_state])
  );

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

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };


  function HandleLogout() {
    Cookies.remove("token");
    navigate("/");
  }

  async function HandleDone(){
    SetLoading(true)
    const updatedUser= new FormData()
    try{
      updatedUser.append("profile_picture", profile_picture)
      updatedUser.append("name", name)
      updatedUser.append("linkedin_url", linkedin_url)
      updatedUser.append("email", email)
      updatedUser.append("phone_number", phone_number)
      updatedUser.append("current_location_state", state)
      updatedUser.append("current_location_city", city)
      updatedUser.append("gender", gender)
    }
    catch(error){
      console.log(error);
    }
    await axios
      .put("http://localhost:3333/providers/user/update", updatedUser, {withCredentials: true})
      .then(response=>alert("updated successfully"))
      .catch(error=>console.log(error))
    SetEditing(false)
    SetLoading(false)
  }

  return (

    <div className="css-providers-profile-page-main-info-container" style={Editing?{width: "100%"}: null}>
      <div className='css-provider-update'>
        <div className="css-profile-name-username">
          <div className="profile-picture">
            <Badge
              badgeContent={
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  style={{
                    marginTop: "-3rem",
                    marginLeft: "-3rem",
                    border: "dashed darkcyan",
                    borderRadius: "50%",
                    height: "2.5rem",
                    width: "2.5rem",
                    minWidth: "auto",
                    cursor: "pointer",
                    backgroundColor: "rgb(213, 233, 233)",
                  }}
                >
                  <EditIcon
                    style={{ textAlign: "center", justifyConent: "center" }}
                    fontSize="small"
                  />
                  <VisuallyHiddenInput
                    onChange={HandleProfileChange}
                    type="file"
                    accept="image/jpg"
                  />
                </Button>
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <img src={user.profile_picture}/>
            </Badge>
          </div>
          <ThemeProvider theme={theme}>
            <div className="css-name-username">
                <TextField
                  className="css-seeker-profile-page-name-update"
                  required
                  value={name}
                  id="outlined-required"
                  label="Full name"
                  onChange={(event) => setName(event.target.value)}
                />
              <p>@{user.username}</p>
            </div>
          </ThemeProvider>
        </div>
        <div className="css-logout-button-container">
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
        </div>
        <div className="css-providers-profile-page-sub-info-container">
          <Button
            onClick={HandleDone}
            style={{
              float: "right",
              margin: ".5rem",
              backgroundColor: "darkcyan",
              color: "white",
              borderRadius: "1.5rem",
            }}
          >
            done
          </Button>
          <p>
            
          </p>
          <p>
            <TextField
              style={{
                marginTop: "1rem",
              }}
              value={email}
              type="email"
              fullWidth
              required
              id="outlined-required"
              label="Email ID"
              onChange={(event) => setEmail(event.target.value)}
            />
          </p>
          <p>
            <p style={{ color: "black", textAlign: "start" }}>Phone number</p>
            <MuiTelInput
              style={{ width: "100%", marginTop: ".5rem" }}
              value={phone_number}
              onChange={HandlePhoneNumber}
              defaultCountry="IN"
              defaultChecked="+91"
            />
          </p>
          <p>
            <p style={{ color: "black", textAlign: "start" }}>Current location *</p>
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
          </p>
          <p>
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
                value={gender}
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
          </p>
        </div>
              <div className="css-homepage-footer" style={{ margin: "auto", width: "75%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          <a href="">Search jobs</a>
          <a href="">Create free account</a>
          <br />
          <a href="">Support</a>
          <a href="">Help center</a>
          <a href="">About</a>
          <br />
          <a href="">Privacy policy</a>
          <a href="">Rules to post jobs</a>
        </div>
      </div>
    </div>
  )
}

export default ProvidersUpdatePage