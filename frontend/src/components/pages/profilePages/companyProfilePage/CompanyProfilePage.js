import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faBullseye, faEnvelope, faGenderless, faLocationDot, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, createTheme, ThemeProvider } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import JobCard from '../../../cards/JobCard';
import Appbar from '../../../navbar/Appbar'
import Loading from '../../loading/Loading'
import './CompanyProfilePag.css'

function CompanyProfilePage() {

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

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [jobsByUser, setJobsByUser] = useState(null)

  useEffect(() => {
    async function getUser(){
      console.log();
      await axios
        .get("http://localhost:3333/company/user", {withCredentials: true})
        .then(response=>setUser(response.data))
        .catch(error=>console.log(error))
    }
    getUser()
  }, [Cookies]);

  useEffect(() => {
    if(user && jobsByUser){
      setLoading(false)
      console.log(user);
      console.log(jobsByUser);
    }
    console.log(user);
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


  function HandleLogout() {
    Cookies.remove("token");
    navigate("/");
  }

  return (
    <ThemeProvider theme={theme} >
      <div  className="company-profile" style={loading?{padding: "0"}: null}>
        {loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            <Appbar />
            <div className="css-company-profile-page-full-container">
              <div className="css-company-profile-page-jobs-container">
                {jobsByUser.map((job)=>
                  <JobCard key={job._id} job={job}/>
                )}
              </div>
              <div className="css-company-profile-page-main-info-container">
                <div className="css-profile-name-username">
                  <div className="profile-picture">
                    <img src={user.profile_picture}/>
                  </div>
                  <div className="css-name-username">
                    <h1>{user.company_name}</h1>
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
                <div className="css-company-profile-page-sub-info-container">
                  <p><a href=''><FontAwesomeIcon style={{ marginRight: ".5rem" }} icon={faUserTie} />{user.recruiter_name}</a></p>
                  <p><a href=''><FontAwesomeIcon style={{ marginRight: ".5rem" }} icon={faBullseye} />{user.moto}</a></p>
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
            </div> 
          </ React.Fragment>
      )}
      </div>
    </ThemeProvider>
  )
}

export default CompanyProfilePage