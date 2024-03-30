import {
  Badge,
  Button,
  createTheme,
  styled,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import React, { useEffect, useState } from "react";
import JobCard from '../../../cards/JobCard'
import Appbar from "../../../navbar/Appbar";
import EditIcon from "@mui/icons-material/Edit";
import "./ProvidersProfilePage.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faEnvelope, faGenderless, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios'
import Loading from "../../loading/Loading";
import ProvidersUpdatePage from "./ProvidersUpdatePage";

function ProvidersProfilePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

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

  const [user, setUser] = useState(null);
  const [jobsByUser, setJobsByUser] = useState(null)

  useEffect(() => {
    async function getUser(){
      await axios
        .get("http://localhost:3333/providers/user", {withCredentials: true})
        .then(response=>setUser(response.data))
        .catch(error=>console.log(error))
    }
    getUser()
  }, [Cookies.get('user'), editing]);

  useEffect(() => {
    if(user && jobsByUser){
      setLoading(false)
      console.log(user);
      console.log(jobsByUser);
    }
  }, [user, jobsByUser]);

  useEffect(() => {
    async function getJobsByUser(){
      if(user){
        await axios
          .get(`http://localhost:3333/job/${user.username}/all_jobs`, {withCredentials: true})
          .then(response=>setJobsByUser(response.data))
          .catch(error=>console.log(error))
      }
    }
    getJobsByUser()
  }, [user]);



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


  function HandleLogout() {
    const cookieNames = Object.keys(Cookies.get());
    cookieNames.forEach(cookieName => {
      Cookies.remove(cookieName);
    })
    navigate("/");
  }

  return (
    <div className="providers-profile" style={loading?{padding: "0"}: null}>
    {loading ? (
      <Loading />
    ) : (
      <React.Fragment>
        <Appbar />
        <div className="css-providers-profile-page-full-container">
          <div className="css-providers-profile-page-jobs-container" style={editing? {display: "none"}: null}>
            {jobsByUser.map((job)=>
              <JobCard key={job._id} job={job}/>
            )}
          </div>
          {editing ?
            <ProvidersUpdatePage user={user} Editing={editing} SetEditing={setEditing} SetLoading={setLoading}/>
          :
            <div className="css-providers-profile-page-main-info-container">
              <div className="css-profile-name-username">
                <div className="profile-picture">
                  <img src={user.profile_picture}/>
                </div>
                <div className="css-name-username">
                  <h1>{user.name}</h1>
                  <p>@{user.username}</p>
                </div>
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
                  onClick={()=>setEditing(true)}
                  style={{
                    float: "right",
                    margin: ".5rem",
                    backgroundColor: "darkcyan",
                    color: "white",
                    borderRadius: "1.5rem",
                  }}
                >
                  edit
                </Button>
                <p><a href=''><FontAwesomeIcon style={{ marginRight: ".5rem" }} icon={faLinkedin} />{user.linkedin_url}</a></p>
                <p><FontAwesomeIcon style={{ marginRight: ".5rem" }} icon={faEnvelope} />{user.email}</p>
                <p><FontAwesomeIcon style={{ marginRight: ".5rem" }} icon={faPhone} />{user.phone_number}</p>
                <p><FontAwesomeIcon style={{ marginRight: ".5rem" }} icon={faLocationDot} />{user.current_location_city},{user.current_location_city}</p>
                <p><FontAwesomeIcon style={{ marginRight: ".5rem" }} icon={faGenderless} />{user.gender}</p>
              </div>
              <div className="css-homepage-footer" style={{ margin: "auto", width: "75%", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                <a href="">Search jobs</a>
                <a href="">Create free account</a>
                <a href="">Support</a>
                <a href="">Help center</a>
                <a href="">About</a>
                <a href="">Privacy policy</a>
                <a href="">Rules to post jobs</a>
              </div>
            </div> 
          }
        </div>
      </React.Fragment>
    )}
    </div>
  );
}

export default ProvidersProfilePage;
