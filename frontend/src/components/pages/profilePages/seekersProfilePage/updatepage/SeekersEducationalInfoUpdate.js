import {
  Autocomplete,
  Button,
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
import React, { useState } from "react";
import { graduationYear } from "../../../../../services/data/graduationYear";
import { qualifications } from "../../../../../services/data/qualifications";
import { universities } from "../../../../../services/data/universities";

function SeekersEducationalInfoUpdate(props) {
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

  const [selectedType, setSelectedType] = useState("");
  function HandleeducationType(event) {
    setSelectedType(event.target.value);
    props.SetEducation_type(event.target.value);
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <TextField
          id="outlined-select-currency"
          select
          fullWidth
          value={props.Heighest_qualification}
          label="Heighest Qualification"
          onChange={(event) =>
            props.SetHeighest_qualification(event.target.value)
          }
          style={{ textAlign: "start", marginTop: "1.5rem" }}
        >
          {qualifications.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency"
          fullWidth
          value={props.Major}
          label="Specialisation / major"
          onChange={(event) => props.SetMajor(event.target.value)}
          style={{ textAlign: "start", marginTop: "1.5rem" }}
        ></TextField>
        <Autocomplete
          style={{ marginTop: "1.5rem" }}
          id="free-solo-demo"
          freeSolo
          onChange={(event, newValue) => props.SetUniversity(newValue)}
          options={universities.map((option) => option)}
          renderInput={(params) => (
            <TextField
              {...params}
              value={props.Universitiy}
              label="University / Institute"
            />
          )}
        />
        <TextField
          id="outlined-select-currency"
          select
          fullWidth
          value={props.Graduation_year}
          label="Year of Graduation"
          style={{ textAlign: "start", marginTop: "1.5rem" }}
          onChange={(event) => props.SetGraduation_year(event.target.value)}
        >
          {graduationYear.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <FormControl style={{ textAlign: "start", width: "100%" }}>
          <FormLabel
            style={{ paddingLeft: ".9rem", marginTop: "1.5rem" }}
            id="demo-row-radio-buttons-group-label"
          >
            Education type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={props.Education_type}
            onChange={HandleeducationType}
          >
            <FormControlLabel
              value="Full-time"
              control={<Radio />}
              label="Full-time"
            />
            <FormControlLabel
              value="Part-time"
              control={<Radio />}
              label="Part-time"
            />
            <FormControlLabel
              value="Correspondence"
              control={<Radio />}
              label="Correspondence"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </ThemeProvider>
  );
}

export default SeekersEducationalInfoUpdate;
