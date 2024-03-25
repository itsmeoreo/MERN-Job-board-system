import { ThemeProvider } from "@emotion/react";
import {
  Checkbox,
  createTheme,
  FormControlLabel,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

function SeekersProfessionalInfoUpdate(props) {
  const initialDate = props.Start_date ? props.Start_date.split(" ") : ["", ""];

  const [year, setYear] = useState("");
  function HandleYear(event) {
    const selectedYear = event.target.value;
    setYear(selectedYear);
    props.SetStart_date(`${selectedYear} ${month}`);
  }
  const [month, setMonth] = useState("");
  function HandleMonth(event) {
    const selectedMonth = event.target.value;
    setMonth(selectedMonth);
    props.SetStart_date(`${year} ${selectedMonth}`);
  }

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
      value: "january",
      label: "january",
    },
    {
      value: "february",
      label: "february",
    },
    {
      value: "march",
      label: "march",
    },
    {
      value: "april",
      label: "april",
    },
    {
      value: "may",
      label: "may",
    },
    {
      value: "june",
      label: "june",
    },
    {
      value: "july",
      label: "july",
    },
    {
      value: "august",
      label: "august",
    },
    {
      value: "september",
      label: "september",
    },
    {
      value: "october",
      label: "october",
    },
    {
      value: "november",
      label: "november",
    },
    {
      value: "december",
      label: "december",
    },
  ];

  const noticePeriod = [
    {
      value: "0",
      label: "Immidiate",
    },
    {
      value: "1",
      label: "a month",
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
      <div>
        <TextField
          style={{
            marginTop: "1rem",
          }}
          value={props.Current_designation}
          fullWidth
          required
          id="outlined-required"
          label="Current Designation"
          onChange={(event) => props.SetCurrent_designation(event.target.value)}
        />
        <TextField
          style={{
            marginTop: "1rem",
          }}
          value={props.Company_name}
          fullWidth
          required
          id="outlined-required"
          label="Company Name"
          onChange={(event) => props.SetCompany_name(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox style={{ color: "darkcyan" }} />}
          label="Currently working here"
        />
        <p style={{ width: "100%", textAlign: "start" }}>Start date</p>
        <div style={{ width: "100%", display: "flex", marginTop: "1rem" }}>
          <TextField
            id="outlined-select-currency"
            select
            value={initialDate[0]}
            onChange={HandleYear}
            label="Year"
            fullWidth
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
            value={initialDate[1]}
            onChange={HandleMonth}
            label="month"
            fullWidth
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
          value={props.Current_salary}
          fullWidth
          required
          inputMode="numeric"
          id="outlined-required"
          label="Current Salary (Annual)"
          onChange={(event) => props.SetCurrent_salary(event.target.value)}
        />
        <FormControlLabel
          control={<Checkbox style={{ color: "darkcyan" }} />}
          label="Hide my salary from potential employers"
        />
        <TextField
          id="outlined-select-currency"
          select
          value={props.Notice_period}
          label="Notice period"
          fullWidth
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
    </ThemeProvider>
  );
}

export default SeekersProfessionalInfoUpdate;
