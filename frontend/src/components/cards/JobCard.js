import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBusinessTime,
  faLocationDot,
  faBook,
  faClockRotateLeft
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./JobCard.css";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import Cookies from "js-cookie";
import axios from "axios";
import Loading from "../pages/loading/Loading";

function JobCard({job}) {

  const navigate= useNavigate();

  const userType= Cookies.get('user')

  const [loading, setLoading] = useState(true)
  const [provider, setProvider] = useState(null)
  const [isCompany, setIsCompany] = useState(false)
  const [applied, setApplied] = useState(null)

  useEffect(() => {
    async function getProvider(){
      await axios
        .get(`http://localhost:3333/providers/users/${job.company_or_provider}`)
        .then(response=>setProvider(response.data))
        .catch(error=>console.log(error))
    }
    getProvider();
  }, []);

  useEffect(() => {
    if(provider){
    }
  }, [provider]);

  const start_date= new Date(job.start_date)
  const currentDate= new Date()

  const existance=  currentDate.getMonth()-start_date.getMonth() === 0 ?  currentDate.getDate() - start_date.getDate() :  currentDate.getMonth()-start_date.getMonth()

  useEffect(() => {
    async function getapplication(){
      if(userType==="seeker")
        await axios
          .get(`http://localhost:3333/job/${job._id}/single_application`, {withCredentials: true})
          .then(response=>setApplied(response.data))
          .catch(error=>console.log(error))
    }
    getapplication();
    if(job && provider && (applied!==null || userType!=='seeker')) setLoading(false)
  }, [provider]);

  async function HandleApply(){
    setLoading(true)
    function pushNotification(){
      axios
        .post(`http://localhost:3333/notifications/new/1/${provider._id}/${job._id}`,"notification",{withCredentials:true})
        .catch(error=>console.log(error))
    }
    await axios
      .post(`http://localhost:3333/seekers/apply/${job._id}`, "application", {withCredentials: true})
      .then(response=>{setApplied(true);alert("application successful");pushNotification();setLoading(false);})
      .catch(error=>{console.log(error);alert("something went wrong, please reload the age");setLoading(false)})
  }

  return (
    <div className="job-card">
      {loading? 
        <Loading style={{padding: "10vh 42%"}}/>
      :
        <React.Fragment>
          <div>
            <div className="css-job-card-header">
              <img src={provider.profile_picture}></img>
              <div className="css-job-card-main-info">
                <h3>{job.position}</h3>
                <Link to='/profile'>from {provider.company_name || provider.username}</Link>
              </div>
            </div>
            <div className="css-job-card-body">
              <div className="css-job-card-details">
                <p style={{ width: ".5rem" }}>
                  <FontAwesomeIcon
                    icon={faBusinessTime}
                    style={{ color: "#008b8b", height: "1rem" }}
                  />
                </p>
                <p>full time</p>
              </div>
              <div className="css-job-card-details">
                <p style={{ width: ".5rem" }}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ color: "#008b8b", height: "1rem" }}
                  />
                </p>
                <p>{job.location}</p>
              </div>
              <div className="css-job-card-details">
                <p style={{ width: ".5rem" }}>
                  <FontAwesomeIcon
                    icon={faBook}
                    style={{ color: "#008b8b", height: "1rem" }}
                  />
                </p>
                <p>{job.experience} years</p>
              </div>
            </div>
          </div>
          <div className="css-job-card-footer">
            <p style={{flexGrow: "1", textAlign: "start"}}><b style={{marginRight: ".5rem"}}><FontAwesomeIcon icon={faClockRotateLeft} /></b>{existance} days ago</p>
            <div className="css-job-card-buttons">
              {userType?
                <React.Fragment>
                  <Link onClick={()=>Cookies.set('job',job._id)} to={`/job/${job._id}`}><Button>view job</Button></Link>
                  {userType==='seeker' ?
                    applied ?
                      <Button>applied</Button>
                    :
                      <Button onClick={HandleApply}>apply</Button>
                  :
                    <Button
                      onClick={()=>{Cookies.set('job',job._id);navigate(`/${job._id}/applications`)}}
                    >view applications</Button>
                  }
                </React.Fragment>
              :
                <Link to='/register'><Button>Create account to interact</Button></Link>
              }
            </div>
          </div>
        </React.Fragment>
      }
    </div>
  );
}

export default JobCard;
