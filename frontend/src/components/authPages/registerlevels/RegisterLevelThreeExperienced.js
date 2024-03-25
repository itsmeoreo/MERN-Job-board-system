import {
  Button,
  Checkbox,
  createTheme,
  FormControlLabel,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import "../AuthPage.css";

function RegisterLevelThreeExperienced(props) {
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

  const [year, setYear] = useState("");
  function HandleYear(event) {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    props.SetStart_date(`${selectedYear} ${month}`);
  }
  const [month, setMonth] = useState("");
  function HandleMonth(event) {
    console.log(event.target.value);
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    props.SetStart_date(`${year} ${selectedMonth}`);
  }

  function HandleSubmit(event) {
    event.preventDefault();
    props.HandleFunc();
  }

  const years = [
    {
      value: "2001",
      label: "2001",
    },
    {
      value: "2002",
      label: "2002",
    },
    {
      value: "2003",
      label: "2003",
    },
    {
      value: "2004",
      label: "2004",
    },
    {
      value: "2005",
      label: "2005",
    },
    {
      value: "2006",
      label: "2006",
    },
    {
      value: "2007",
      label: "2007",
    },
    {
      value: "2008",
      label: "2008",
    },
    {
      value: "2009",
      label: "2009",
    },
    {
      value: "2010",
      label: "2010",
    },
    {
      value: "2011",
      label: "2011",
    },
    {
      value: "2012",
      label: "2012",
    },
    {
      value: "2013",
      label: "2013",
    },
    {
      value: "2014",
      label: "2014",
    },
    {
      value: "2015",
      label: "2015",
    },
    {
      value: "2016",
      label: "2016",
    },
    {
      value: "2017",
      label: "2017",
    },
    {
      value: "2018",
      label: "2018",
    },
    {
      value: "2019",
      label: "2019",
    },
    {
      value: "2020",
      label: "2020",
    },
    {
      value: "2021",
      label: "2021",
    },
    {
      value: "2022",
      label: "2022",
    },
    {
      value: "2023",
      label: "2023",
    },
  ];

  const months = [
    {
      value: "January",
      label: "January",
    },
    {
      value: "February",
      label: "February",
    },
    {
      value: "March",
      label: "March",
    },
    {
      value: "April",
      label: "April",
    },
    {
      value: "May",
      label: "May",
    },
    {
      value: "June",
      label: "June",
    },
    {
      value: "July",
      label: "July",
    },
    {
      value: "August",
      label: "August",
    },
    {
      value: "September",
      label: "September",
    },
    {
      value: "October",
      label: "October",
    },
    {
      value: "November",
      label: "November",
    },
    {
      value: "December",
      label: "December",
    },
  ];

  const noticePeriod = [
    {
      value: "0",
      label: "Immidiate",
    },
    {
      value: "1",
      label: "A month",
    },
    {
      value: "2",
      label: "A couple of months",
    },
    {
      value: "3",
      label: "Three months",
    },
    {
      value: "6",
      label: "Six months",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div style={{ paddingBottom: "2rem" }}>
        <form onSubmit={HandleSubmit}>
          <h1 style={{ textAlign: "start", marginLeft: "4rem" }}>
            Employment Details
          </h1>
          <p style={{ textAlign: "start", marginLeft: "4rem" }}>
            This is crucial for a recruter to understand !
          </p>
          <div
            style={{ margin: "1.5rem auto", width: "90%", padding: "1rem 0" }}
          >
            <TextField
              style={{
                marginTop: "1rem",
              }}
              fullWidth
              required
              id="outlined-required"
              label="Current Designation"
              onChange={(event) =>
                props.SetCurrent_designation(event.target.value)
              }
            />
            <TextField
              style={{
                marginTop: "1rem",
              }}
              fullWidth
              required
              id="outlined-required"
              label="Company Name"
              onChange={(event) => props.SetCompany_name(event.target.value)}
            />
            <FormControlLabel
              style={{ width: "97%" }}
              control={<Checkbox style={{ color: "darkcyan" }} />}
              label="Currently working here"
            />
            <p style={{ width: "100%", textAlign: "start" }}>Start date</p>
            <div style={{ width: "100%", display: "flex", marginTop: "1rem" }}>
              <TextField
                id="outlined-select-currency"
                select
                value={year}
                onChange={HandleYear}
                label="Year"
                style={{ textAlign: "start" }}
              >
                {years.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-currency"
                select
                value={month}
                onChange={HandleMonth}
                label="month"
                style={{ textAlign: "start" }}
              >
                {months.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <TextField
              style={{
                marginTop: "1rem",
              }}
              fullWidth
              required
              inputMode="numeric"
              id="outlined-required"
              label="Current Salary (Annual)"
              onChange={(event) => props.SetCurrent_salary(event.target.value)}
            />
            <FormControlLabel
              style={{ width: "97%" }}
              control={<Checkbox style={{ color: "darkcyan" }} />}
              label="Hide my salary from potential employers"
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Notice period"
              style={{ textAlign: "start", marginTop: "1rem" }}
              onChange={(event) => props.SetNotice_period(event.target.value)}
            >
              {noticePeriod.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Button
            className="continue-btn-registerLevel3 registerLevel-continue-btn"
            style={{
              marginRight: "4rem",
              borderRadius: "2rem",
              backgroundColor: "darkcyan",
              color: "white",
              padding: ".5rem 1rem",
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

export default RegisterLevelThreeExperienced;
