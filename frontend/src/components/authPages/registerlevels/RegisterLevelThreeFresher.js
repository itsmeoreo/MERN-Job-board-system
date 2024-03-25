import { Autocomplete, Button, createTheme, FormControl, FormControlLabel, FormLabel, MenuItem, Radio, RadioGroup, TextField, ThemeProvider } from '@mui/material';
import React, { useState } from 'react'
import { universities } from '../../../services/data/universities.js'
import { graduationYear } from '../../../services/data/graduationYear.js'
import { qualifications } from '../../../services/data/qualifications.js'

function RegisterLevelThreeFresher(props) {

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

  const [selectedType, setSelectedType] = useState('');
  function HandleeducationType(event){
    setSelectedType(event.target.value)
    props.SetEducation_type(event.target.value)
  }

  function HandleSubmit(event){
    event.preventDefault()
    props.HandleFunc()
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{padding: "2.5rem 0"}}>
        <form onSubmit={HandleSubmit}>
          <h1 style={{textAlign: "start", marginLeft: "4rem"}}>Educational Details</h1>
          <p style={{textAlign: "start", marginLeft: "4rem"}}>Tell recruiters about you're educational qualifications</p>
          <div  style={{ margin: "1.5rem auto", width: "90%", padding: "1rem 0"}}>
          <TextField
              id="outlined-select-currency"
              select
              label="Heighest Qualification"
              onChange={(event)=>props.SetHeighest_qualification(event.target.value)}
              style={{textAlign: "start", marginTop: "1.5rem"}}
            >
              {qualifications.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-currency"
              label="Specialisation / major"
              onChange={(event)=>props.SetMajor(event.target.value)}
              style={{textAlign: "start", marginTop: "1.5rem"}}
            >
            </TextField>
            <Autocomplete
              style={{ marginTop: "1.5rem"}}
              id="free-solo-demo"
              freeSolo
              onChange={(event, newValue)=>props.SetUniversity(newValue)}
              options={universities.map((option) => option)}
              renderInput={(params) => <TextField  {...params} label="University / Institute" />}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Year of Graduation"
              style={{textAlign: "start", marginTop: "1.5rem"}}
              onChange={(event)=>props.SetGraduation_year(event.target.value)}
            >
              {graduationYear.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControl style={{textAlign: "start", width: "100%"}}>
              <FormLabel style={{paddingLeft: ".9rem", marginTop: "1.5rem"}} id="demo-row-radio-buttons-group-label">Education type</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={selectedType}
                onChange={HandleeducationType}
              >
                <FormControlLabel value="Full-time" control={<Radio />} label="Full-time" />
                <FormControlLabel value="Part-time" control={<Radio />} label="Part-time" />
                <FormControlLabel value="Correspondence" control={<Radio />} label="Correspondence" />
              </RadioGroup>
            </FormControl>
          </div>
          <Button
            className='continue-btn-registerLevel1 registerLevel-continue-btn'
            style={{
              borderRadius: "2rem", 
              backgroundColor: "darkcyan",
              padding: ".5rem 1rem",
              color: "white",
            }} 
            color="inherit"
            type='submit'
            onClick={props.HandleFunc}
          >
            continue
          </Button>
        </form>
      </div>
    </ThemeProvider>
  )
}

export default RegisterLevelThreeFresher