import { faCirclePlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  createTheme,
  MenuItem,
  TextField,
  ThemeProvider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { locations } from "../../../services/data/location";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Appbar from "../../navbar/Appbar";
import axios from 'axios'
import "./NewJopPage.css";
import Loading from "../loading/Loading";
import Cookies from "js-cookie";

function NewJopPage() {
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
  const token= Cookies.get('user')
  const company= token==='company'
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const stateMenu = [...Object.keys(locations)];
  const [cityMenu, setCityMenu] = useState(
    Object.values(locations["Tamil Nadu"])
  );

  // if(token==="company") setCompany(true)

  // every detail need to post a job(variables decleration)
  const [jobDetails, setJobDetails] = useState(null);
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [job_description, setJob_description] = useState([""]);
  const [job_responsibilities, setJob_responsibilities] = useState([""]);
  const [skills_required, setSkills] = useState([""]);
  const [end_date, setEnd_date] = useState(null);

  function HandleState(event) {
    const selectedState = event.target.value.toString();
    setState(selectedState);
    if (selectedState && locations[selectedState])
      setCityMenu(Object.values(locations[selectedState]));
  }

  function HandleCity(event) {
    const selectedCity = event.target.value.toString();
    setCity(selectedCity);
    setLocation(selectedCity);
  }

  const handleAddInput = () => {
    setSkills([...skills_required, ""]);
  };

  const handleRemoveInput = (index) => {
    const newskills = [...skills_required];
    newskills.splice(index, 1);
    setSkills(newskills);
  };

  const handleInputChange = (index, value) => {
    const newskills = [...skills_required];
    newskills[index] = value;
    setSkills(newskills);
  };

  const handleAddDescriptionInput = () => {
    setJob_description([...job_description, ""]);
  };

  const handleRemoveDescriptionInput = (index) => {
    const newJobDescription = [...job_description];
    newJobDescription.splice(index, 1);
    setJob_description(newJobDescription);
  };

  const handleDescriptionInputChange = (index, value) => {
    const newJobDescription = [...job_description];
    newJobDescription[index] = value;
    setJob_description(newJobDescription);
  };

  const handleAddResponsibilitiesInput = () => {
    setJob_responsibilities([...job_responsibilities, ""]);
  };

  const handleRemoveResponsibilitiesInput = (index) => {
    const newJobResponsibilities = [...job_responsibilities];
    newJobResponsibilities.splice(index, 1);
    setJob_responsibilities(newJobResponsibilities);
  };

  const handleResponsibilitiesInputChange = (index, value) => {
    const newJobResponsibilities = [...job_responsibilities];
    newJobResponsibilities[index] = value;
    setJob_responsibilities(newJobResponsibilities);
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setEnd_date(date);
  };

  useEffect(() => {
    setLoading(false)
    if(jobDetails){
      postJob()
    }
  }, [jobDetails]);

  function HandlePostJob(event) {
    event.preventDefault();
    setLoading(true);
    try {
      setJobDetails({
        position,
        location,
        experience,
        skills_required,
      });
      if (job_description[0] !== "") {
        setJobDetails({ ...jobDetails, job_description });
      }
      if (job_responsibilities[0] !== "") {
        setJobDetails({ ...jobDetails, job_responsibilities });
      }
      if (end_date !== null) {
        setJobDetails({ ...jobDetails, end_date });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function postJob(){
    if(company){
      await axios
        .post("http://localhost:3333/company/new_job", jobDetails, {withCredentials: true} )
        .then(response=>alert("job post success"))
        .catch(error=>console.log(error))
    }
    else{
      await axios
        .post("http://localhost:3333/providers/new_job", jobDetails, {withCredentials: true} )
        .then(response=>alert("job post success"))
        .catch(error=>console.log(error))
    }
  }

  const experienceMenu = [
    {
      value: "0 - 2",
      label: "0 - 2 Years",
    },
    {
      value: "2 - 3",
      label: "2 - 3 Years",
    },
    {
      value: "3 - 4",
      label: "3 - 4 Years",
    },
    {
      value: "4 - 5",
      label: "4 - 5 Years",
    },
    {
      value: "5 - 6",
      label: "5 - 6 Years",
    },
    {
      value: "6",
      label: "min 6 Years",
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      {loading ? (
        <Loading />
      ) : (
        <div className="css-new-job-page">
          <Appbar />
          <h1>Post a new job</h1>
          <div className="css-new-job-page-main-container">
            <form onSubmit={HandlePostJob}>
              <TextField
                style={{
                  marginTop: "1rem",
                }}
                value={position}
                fullWidth
                required
                label="position/ post/ job name"
                onChange={(event) => setPosition(event.target.value)}
              />
              <h4>Location of vacancy</h4>
              <div
                className="css-new-job-page-location"
                style={{ marginBottom: "2rem" }}
              >
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
              </div>
              <TextField
                select
                value={experience}
                onChange={(event) => setExperience(event.target.value)}
                required
                fullWidth
                label="expected level of experience"
              >
                {experienceMenu.map((experience) => (
                  <MenuItem key={experience.value} value={experience.value}>
                    {experience.label}
                  </MenuItem>
                ))}
              </TextField>
              <h4>Job Description</h4>
              <div className="css-new-job-page-job-description">
                <div style={{ justifyContent: "center", textAlign: "start" }}>
                  {job_description.map((input, index) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                      key={index}
                    >
                      <TextField
                        size="small"
                        type="text"
                        value={input}
                        fullWidth
                        multiline
                        onChange={(e) =>
                          handleDescriptionInputChange(index, e.target.value)
                        }
                      />
                      <button
                        onClick={() => handleRemoveDescriptionInput(index)}
                        style={{
                          border: "none",
                          height: "1rem",
                          width: "1rem",
                          cursor: "pointer",
                          marginRight: "1rem",
                        }}
                      >
                        <FontAwesomeIcon color="red" icon={faTrash} />
                      </button>
                    </div>
                  ))}
                  <Button
                    onClick={handleAddDescriptionInput}
                    style={{
                      height: "1.5rem",
                      margin: ".5rem",
                      backgroundColor: "darkcyan",
                      color: "white",
                      borderRadius: "1.5rem",
                    }}
                  >
                    + new point
                  </Button>
                </div>
              </div>
              <h4>Job Responsibilities</h4>
              <div className="css-new-job-page-job-description">
                <div style={{ justifyContent: "center", textAlign: "start" }}>
                  {job_responsibilities.map((input, index) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "1rem",
                      }}
                      key={index}
                    >
                      <TextField
                        size="small"
                        type="text"
                        value={input}
                        fullWidth
                        multiline
                        onChange={(e) =>
                          handleResponsibilitiesInputChange(
                            index,
                            e.target.value
                          )
                        }
                      />
                      <button
                        onClick={() => handleRemoveResponsibilitiesInput(index)}
                        style={{
                          border: "none",
                          height: "1rem",
                          width: "1rem",
                          cursor: "pointer",
                          marginRight: "1rem",
                        }}
                      >
                        <FontAwesomeIcon color="red" icon={faTrash} />
                      </button>
                    </div>
                  ))}
                  <Button
                    onClick={handleAddResponsibilitiesInput}
                    style={{
                      height: "1.5rem",
                      margin: ".5rem",
                      backgroundColor: "darkcyan",
                      color: "white",
                      borderRadius: "1.5rem",
                    }}
                  >
                    + new point
                  </Button>
                </div>
              </div>
              <h4>Required skills_required</h4>
              <div className="css-new-job-page-skills-required">
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {skills_required.map((input, index) => (
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      key={index}
                    >
                      <TextField
                        required
                        style={{ minWidth: "10rem" }}
                        size="small"
                        type="text"
                        value={input}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                      />
                      <button
                        onClick={() => handleRemoveInput(index)}
                        style={{
                          border: "none",
                          height: "1rem",
                          width: "1rem",
                          cursor: "pointer",
                          marginRight: "1rem",
                        }}
                      >
                        <FontAwesomeIcon color="red" icon={faTrash} />
                      </button>
                    </div>
                  ))}
                  <Button
                    onClick={handleAddInput}
                    style={{
                      borderRadius: "2rem",
                      width: "1rem",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                    }}
                  >
                    <FontAwesomeIcon
                      size="xl"
                      color="darkcyan"
                      icon={faCirclePlus}
                    />
                  </Button>
                </div>
              </div>
              <h4>job application closing date</h4>
              <div className="css-new-job-page-custom-date-picker-container">
                <DatePicker
                  className="css-new-job-page-custom-date-picker"
                  selected={selectedDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                />
              </div>
              <Button
                type="submit"
                style={{
                  padding: "1rem",
                  float: "right",
                  margin: ".5rem",
                  backgroundColor: "darkcyan",
                  color: "white",
                  borderRadius: "1.5rem",
                }}
              >
                Post job
              </Button>
            </form>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

export default NewJopPage;
