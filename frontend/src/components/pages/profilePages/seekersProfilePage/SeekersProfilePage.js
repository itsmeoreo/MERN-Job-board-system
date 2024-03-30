import {
  Badge,
  Button,
  createTheme,
  Slider,
  styled,
  TextField,
  ThemeProvider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import Appbar from "../../../navbar/Appbar";
import SeekersSkillsUpdate from "./updatepage/SeekersSkillsUpdate";
import "./SeekersProfilePage.css";
import {
  faEnvelope,
  faGenderless,
  faLocationDot,
  faPhone,
  faGraduationCap,
  faBook,
  faScroll,
  faPencil,
  faBuilding,
  faCalendar,
  faClock,
  faBriefcase,
  faCoins,
  faHourglass,
  faCross,
  faX,
  faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SeekersEducationalInfoUpdate from "./updatepage/SeekersEducationalInfoUpdate";
import SeekersProfessionalInfoUpdate from "./updatepage/SeekersProfessionalInfoUpdate";
import SeekersPersonalInfoUpdate from "./updatepage/SeekersPersonalInfoUpdate";
import axios from "axios";
import Loading from "../../loading/Loading";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function SeekersProfilePage() {

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

  const [openResume, setOpenResume] = useState(false)
  const [seeker, setSeeker] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [experienceCount, useExperienceCount] = useState(0);
  const [educationCount, useEducationCount] = useState(0);

  const [resume,setResume]= useState(null)
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profile_picture, setProfile_picture] = useState(null);
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [current_location_state, setCurrent_location_state] = useState("");
  const [current_location_city, setCurrent_location_city] = useState("");
  const [gender, setGender] = useState("");
  const [professional_detail, setProfessional_detail] = useState("");
  const [current_designation, setCurrent_designation] = useState("");
  const [company_name, setCompany_name] = useState("");
  const [currently_inhere, setCurrently_inhere] = useState(true);
  const [start_date, setStart_date] = useState("");
  const [current_salary, setCurrent_salary] = useState("");
  const [hide_salary, setHide_salary] = useState(false);
  const [notice_period, setNotice_period] = useState("");
  const [heighest_qualification, setHeighest_qualification] = useState("");
  const [major, setMajor] = useState("");
  const [university, setUniversity] = useState("");
  const [graduation_year, setGraduation_year] = useState("");
  const [education_type, setEducation_type] = useState("");
  const [skills, setSkills] = useState([""]);

  function setData() {

    setLoading(true);
    setResume(seeker.resume)
    setUsername(seeker.username);
    setName(seeker.name);
    setProfile_picture(seeker.profile_picture);
    setEmail(seeker.email);
    setPhone_number(seeker.phone_number);
    setCurrent_location_state(seeker.current_location_state);
    setCurrent_location_city(seeker.current_location_city);
    setGender(seeker.gender);
    setProfessional_detail(seeker.professional_detail);
    if (
      professional_detail === "fresher" ||
      professional_detail === "student"
    ) {
      setHeighest_qualification(seeker.heighest_qualification);
      setMajor(seeker.major);
      setUniversity(seeker.university);
      setGraduation_year(seeker.graduation_year);
      setEducation_type(seeker.education_type);
    } else {
      setCurrent_designation(seeker.current_designation);
      setCompany_name(seeker.company_name);
      setCurrently_inhere(seeker.currently_inhere);
      setStart_date(seeker.start_date);
      setCurrent_salary(seeker.current_salary);
      setHide_salary(seeker.hide_salary);
      setNotice_period(seeker.notice_period);
      if (seeker.heighest_qualification) {
        setHeighest_qualification(seeker.heighest_qualification);
        setMajor(seeker.major);
        setUniversity(seeker.university);
        setGraduation_year(seeker.graduation_year);
        setEducation_type(seeker.education_type);
      }
    }
    setLoading(false);
  }

  const fetchSeeker = async () => {
    setLoading(true);
    axios
      .get("http://localhost:3333/seekers/user", { withCredentials: true })
      .then((response) => setSeeker(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchSeeker();
  }, []);

  useEffect(() => {
    setData();
  }, [seeker]);

  function HandleLogout(){
    const cookieNames = Object.keys(Cookies.get());
    cookieNames.forEach(cookieName => {
      Cookies.remove(cookieName);
    })
    navigate("/");
  }

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

  function HandleProfileChange(event){
    const selectedFile = event.target.files[0];
    setProfile_picture(selectedFile)
  }

  function HandleResumeChange(event){
    const selectedFile = event.target.files[0];
    setResume(selectedFile)
  }

  function HandleEditing() {
    editing ? HandleDone() : HandleEdit();
  }

  function HandleEdit() {
    setEditing(true);
  }

  async function HandleDone() {
    setLoading(true)
    const user = new FormData();
    try{
      user.append('resume', resume);
      // user.append('linkedin_url', linkedin_url);
      user.append("username", username);
      user.append("name", name);
      user.append("email", email);
      user.append("phone_number", phone_number);
      user.append("current_location_state", current_location_state);
      user.append("current_location_city", current_location_city);
      user.append("gender", gender);
      user.append("skills", [...skills])
      // user.append("professional_detail", professional_detail);
      if(current_designation!== undefined){
        user.append("current_designation", current_designation);
      }
      if(company_name!== undefined){
        user.append("company_name", company_name);
      }
      if(currently_inhere!==undefined){
        user.append("currently_inhere", currently_inhere);
      }
      if(start_date!==undefined){
        user.append("start_date", start_date);
      }
      if(current_salary!==undefined){
        user.append("current_salary", current_salary);
      }
      if(hide_salary!==undefined){
        user.append("hide_salary", hide_salary);
      }
      if(notice_period!==undefined){
        user.append("notice_period", notice_period);
      }
      user.append("heighest_qualification", heighest_qualification);
      user.append("major", major);
      user.append("university", university);
      user.append("graduation_year", graduation_year);
      user.append("education_type", education_type);
    }
    catch(error){
      console.error(error.message);
    }

    user.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    await axios
      .put("http://localhost:3333/seekers/update", user, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      })
      .then((response) => alert("user updated successfully"))
      .catch((error) => console.log(error));

    setEditing(false)
    setLoading(false)
  }

  return (
    <div className="seekers-profile" style={openResume||loading?{padding: "0"}: null}>
      {loading ? (
        <Loading />
      ) : (
        openResume ?
          <div style={{position: "absolute", height: "100vh", width: "98vw"}}>
            <button
              onClick={()=>setOpenResume(false)}
              style={{
                float: "right",
                border: "none",
                width: "1rem",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
            >
              <FontAwesomeIcon style={{fontSize: "2rem"}} color="red" icon={faXmarkCircle} />
            </button>
            <iframe style={{width: "53rem", height: "100vh"}} src={resume}/>
          </div>
        :
          <div>
            <Appbar />
            <div className="actions">
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
              {editing?
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  style={{
                    margin: ".5rem",
                    backgroundColor: "darkcyan",
                    color: "white",
                    borderRadius: "1.5rem",
                  }}
                >
                  change resume
                  <VisuallyHiddenInput
                    onChange={HandleResumeChange}
                    type="file"
                    accept="application/pdf"
                  />
                </Button>
              :
                <Button
                  style={{
                    margin: ".5rem",
                    backgroundColor: "darkcyan",
                    color: "white",
                    borderRadius: "1.5rem",
                  }}
                  onClick={()=>setOpenResume(true)}
                >
                  Resume
                </Button>
              }
              <Button
                style={{
                  margin: ".5rem",
                  backgroundColor: "darkcyan",
                  color: "white",
                  borderRadius: "1.5rem",
                }}
              >
                applied jobs
              </Button>
            </div>
            <div className="css-main-info-container">
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
                  <img src={profile_picture} />
                </Badge>
              </div>
              <div>
                {!editing ? (
                  <h1>{name}</h1>
                ) : (
                  <ThemeProvider theme={theme}>
                    <TextField
                      className="css-seeker-profile-page-name-update"
                      style={{
                        marginTop: "1rem",
                      }}
                      fullWidth
                      required
                      value={name}
                      id="outlined-required"
                      label="Full name"
                      onChange={(event) => setName(event.target.value)}
                    />
                  </ThemeProvider>
                )}
                <p>@{username}</p>
              </div>
            </div>
            <div className="css-seekers-profile-page-main-container">
              <Button
                className="css-seekers-profile-edit_button"
                onClick={HandleEditing}
                style={{
                  margin: "1rem",
                  float: "right",
                  borderRadius: "1.5rem",
                  backgroundColor: "darkcyan",
                  color: "white",
                }}
              >
                {!editing ? "edit" : "done"}
              </Button>
              <div className="css-seekers-profile-page-personal-info">
                <h2>Personal detail</h2>
                {!editing ? (
                  <div>
                    <li>
                      <FontAwesomeIcon
                        style={{ marginRight: ".5rem" }}
                        icon={faEnvelope}
                      />
                      {email}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        style={{ marginRight: ".5rem" }}
                        icon={faPhone}
                      />
                      {phone_number}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        style={{ marginRight: ".5rem" }}
                        icon={faLocationDot}
                      />
                      {current_location_city}, {current_location_state}
                    </li>
                    <li>
                      <FontAwesomeIcon
                        style={{ marginRight: ".5rem" }}
                        icon={faGenderless}
                      />
                      {gender}
                    </li>
                  </div>
                ) : (
                  <SeekersPersonalInfoUpdate
                    Email={email}
                    SetEmail={setEmail}
                    Phone_number={phone_number}
                    SetPhone_number={setPhone_number}
                    Current_location_state={current_location_state}
                    SetCurrent_location_state={setCurrent_location_state}
                    Current_location_city={current_location_city}
                    SetCurrent_location_city={setCurrent_location_city}
                    Gender={gender}
                    SetGender={setGender}
                  />
                )}
              </div>
              <div className="css-seekers-profile-page-professional-info">
                <h2>Professional detail</h2>
                {!editing ? (
                  seeker.professional_detail === "fresher" ? (
                    seeker.professional_detail === "student" ? (
                      <li>
                        <FontAwesomeIcon
                          style={{ marginRight: ".5rem" }}
                          icon={faBook}
                        />
                        student
                      </li>
                    ) : (
                      <li>
                        <FontAwesomeIcon
                          style={{ marginRight: ".5rem" }}
                          icon={faGraduationCap}
                        />
                        fresher
                      </li>
                    )
                  ) : (
                    <div>
                      {currently_inhere ? (
                        <h4 style={{ margin: "1rem" }}>currently working</h4>
                      ) : (
                        <h4 style={{ margin: "1rem" }}>Currently not working</h4>
                      )}
                      <li>
                        <FontAwesomeIcon icon={faBriefcase} />{" "}
                        {current_designation}
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faBuilding} /> {company_name}
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCalendar} /> {start_date}
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faCoins} /> {current_salary} PLA
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faHourglass} /> {notice_period}{" "}
                        {notice_period > 1 ? "months" : "month"}
                      </li>
                    </div>
                  )
                ) : (
                  <SeekersProfessionalInfoUpdate
                    Current_designation={current_designation}
                    setCurrent_designation={setCurrent_designation}
                    Company_name={company_name}
                    SetCompany_name={setCompany_name}
                    Start_date={start_date}
                    SetStart_date={setStart_date}
                    Current_salary={current_salary}
                    SetCurrent_salary={setCurrent_salary}
                    Notice_period={notice_period}
                    SetNotice_period={setNotice_period}
                  />
                )}
              </div>
              <div className="css-seekers-profile-page-educational-info">
                <h2>
                  Educational detail{" "}
                  <small style={{ color: "black", fontSize: "medium" }}>
                    (The heighest qualification)
                  </small>
                </h2>
                {!editing ? (
                  heighest_qualification !== "" ? (
                    <div>
                      <li>
                        <FontAwesomeIcon
                          style={{ marginRight: ".5rem" }}
                          icon={faScroll}
                        />
                        {heighest_qualification}
                      </li>
                      <li>
                        <FontAwesomeIcon
                          style={{ marginRight: ".5rem" }}
                          icon={faPencil}
                        />
                        {major}
                      </li>
                      <li>
                        <FontAwesomeIcon
                          style={{ marginRight: ".5rem" }}
                          icon={faBuilding}
                        />
                        {university}
                      </li>
                      <li>
                        <FontAwesomeIcon
                          style={{ marginRight: ".5rem" }}
                          icon={faCalendar}
                        />
                        {graduation_year}
                      </li>
                      <li>
                        <FontAwesomeIcon
                          style={{ marginRight: ".5rem" }}
                          icon={faClock}
                        />
                        {education_type}
                      </li>
                    </div>
                  ) : (
                    <Button
                      style={{
                        color: "darkcyan",
                        borderRadius: "1.5rem",
                      }}
                      onClick={HandleEditing}
                    >
                      + add educational background
                    </Button>
                  )
                ) : (
                  <SeekersEducationalInfoUpdate
                    Heighest_qualification={heighest_qualification}
                    SetHeighest_qualification={setHeighest_qualification}
                    Major={major}
                    SetMajor={setMajor}
                    University={university}
                    SetUniversity={setUniversity}
                    Graduation_year={graduation_year}
                    SetGraduation_year={setGraduation_year}
                    Education_type={education_type}
                    SetEducation_type={setEducation_type}
                  />
                )}
              </div>
              <div className="css-seekers-profile-page-skills-info">
                <h2>Skills</h2>
                <ThemeProvider theme={theme}>
                  <div className="css-seekers-profile-page-skills">
                    {!editing ? (
                      skills[0] === "" ? (
                        <Button
                          style={{
                            color: "darkcyan",
                            borderRadius: "1.5rem",
                          }}
                          onClick={HandleEditing}
                        >
                          + add skill
                        </Button>
                      ) : (
                        skills.map((skill) => (
                          <div className="skills">
                            <p>{skill}</p>
                          </div>
                        ))
                      )
                    ) : (
                      <SeekersSkillsUpdate
                        skills={skills}
                        setSkills={setSkills}
                      />
                    )}
                  </div>
                </ThemeProvider>
              </div>
            </div>
          </div>
      )}
    </div>
  );
}

export default SeekersProfilePage;

//   !editing ? (
//   ) : (
//
//   )
// ) : (
//
//   })
// )}
