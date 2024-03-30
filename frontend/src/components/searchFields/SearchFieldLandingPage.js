import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import "./SearchFieldLandingPage.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function SearchFieldLandingPage(props) {
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

    const [selectedPosition, setSelectedPosition] = React.useState(null);
    const [selectedLocation, setSelectedLocation] = React.useState(null);
  
    const handlePositionChange = (event, newValue) => {
      setSelectedPosition(newValue);
      console.log(newValue);
      if(newValue !== null)
        props.SetPosition(newValue.label)
      else
        props.SetLocation(null)
    }
    
      const handleLocationChange = (event, newValue) => {
        setSelectedLocation(newValue);
        if(newValue !== null)
          props.SetLocation(newValue.label)
        else
          props.SetLocation(null)
      }
  

  return (
    <ThemeProvider theme={theme}>
      <div
        className="css-searchFieldLandingPage"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Autocomplete
          className="css-jobtitle-autocomplete"
          disablePortal
          onChange={handlePositionChange}
          id="combo-box-demo"
          options={jobPositions}
          style={{
            borderTopLeftRadius: "1.5rem",
            borderBottomLeftRadius: "1.5rem",
          }}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              style={{
                borderTopLeftRadius: "1.3rem",
                borderBottomLeftRadius: "1.3rem",
                backgroundColor: "white",
              }}
              {...params}
              label="Job title, Keywords"
            />
          )}
        />
        <Autocomplete
          disablePortal
          onChange={handleLocationChange}
          id="combo-box-demo"
          options={locations}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              style={{ backgroundColor: "white" }}
              {...params}
              label="Location"
            />
          )}
        />
        <Button
          className="css-search-field-searchbtn"
          sx={{ width: 150 }}
          onClick={props.HandleSearch || null}
          style={{
            borderTopRightRadius: "1.3rem",
            borderBottomRightRadius: "1.3rem",
            backgroundColor: "darkcyan",
            color: "white",
          }}
        >
          Search
        </Button>
      </div>
    </ThemeProvider>
  );
}

const jobPositions = [
  { label: "Developer"},
  // { label: "front-end developer"},
  { label: "example"},
  {label: "Data Administrator"}
];

const locations = [
  { label: "chennai"},
  { label: "Coimbatore"},
  { label: "Udaipur"},
]

export default SearchFieldLandingPage;
