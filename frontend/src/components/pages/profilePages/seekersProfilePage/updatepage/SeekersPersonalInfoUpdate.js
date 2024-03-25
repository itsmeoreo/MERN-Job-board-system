import {
  createTheme,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { MuiTelInput } from "mui-tel-input";
import React, { useState } from "react";
import { locations } from "../../../../../services/data/location";

function SeekersPersonalInfoUpdate(props) {
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
    props.SetPhone_number(newValue);
  };

  const stateMenu = [...Object.keys(locations)];
  const [state, setState] = useState("");
  const [cityMenu, setCityMenu] = useState(
    Object.values(locations[props.Current_location_state])
  );
  const [city, setCity] = useState("");

  function HandleState(event) {
    const selectedState = event.target.value.toString();
    setState(selectedState);
    props.SetCurrent_location_state(selectedState);
    if (selectedState && locations[selectedState])
      setCityMenu(Object.values(locations[selectedState]));
  }

  function HandleCity(event) {
    const selectedCity = event.target.value.toString();
    setCity(selectedCity);
    props.SetCurrent_location_city(selectedCity);
  }

  const [selectedGender, setSelectedGender] = useState(null);
  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    props.SetGender(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="css-seeker-personal-info-update">
        <TextField
          style={{
            marginTop: "1rem",
          }}
          value={[props.Email]}
          type="email"
          fullWidth
          required
          id="outlined-required"
          label="Email ID"
          onChange={(event) => props.SetEmail(event.target.value)}
        />
        <p style={{ color: "black", textAlign: "start" }}>Phone number</p>
        <MuiTelInput
          style={{ width: "100%", marginTop: ".5rem" }}
          value={props.Phone_number}
          onChange={HandlePhoneNumber}
          defaultCountry="IN"
          defaultChecked="+91"
        />
        <p style={{ color: "black", textAlign: "start" }}>Current location *</p>
        <TextField
          select
          label="State"
          value={props.Current_location_state}
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
          value={props.Current_location_city}
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
            value={props.Gender}
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
      </div>
    </ThemeProvider>
  );
}

export default SeekersPersonalInfoUpdate;
