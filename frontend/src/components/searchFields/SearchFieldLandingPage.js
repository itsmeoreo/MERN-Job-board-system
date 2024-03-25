import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";
import "./SearchFieldLandingPage.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function SearchFieldLandingPage() {
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
          id="combo-box-demo"
          options={top100Films}
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
          id="combo-box-demo"
          options={top100Films}
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

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

export default SearchFieldLandingPage;
