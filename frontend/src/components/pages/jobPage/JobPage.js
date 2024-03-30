import {
  faBriefcase,
  faClockRotateLeft,
  faCoins,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appbar from "../../navbar/Appbar";
import LandingPageAppBar from "../../navbar/Navbar";
import Loading from "../loading/Loading";
import "./JobPage.css";

function JobPage() {

  const navigate= useNavigate()

  const userType= Cookies.get('user')

  const [applied, setApplied] = useState(null)
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [provider, setProvider] = useState(null);
  const [postedDate, setPostedDate] = useState(new Date());
  const [monthsBefore, setMonthsBefore] = useState(false);

  const currentDate = new Date();
  const seeker = Cookies.get("user") === "seeker";
  const token = Cookies.get("token");

  useEffect(() => {
    async function getJob() {
      await axios
        .get(`http://localhost:3333/job/single_job/${Cookies.get("job")}`)
        .then((response) => setJob(response.data))
        .catch((error) => console.log(error));
    }
    getJob();
  }, []);

  useEffect(() => {
    if (job !== null) {
      console.log(job);
      console.log(job.start_date);
      setPostedDate(new Date(job.start_date));
      setMonthsBefore(currentDate.getMonth() !== postedDate.getMonth());
    }
  }, [job]);

  async function HandleApply(){
    setLoading(true)
    await axios
      .post(`http://localhost:3333/seekers/apply/${job._id}`, "application", {withCredentials: true})
      .then(response=>{alert("application successful");setLoading(false)})
      .catch(error=>{console.log(error);alert("something went wrong");setLoading(false)})
  }

  useEffect(() => {
    async function getProvider() {
      if (job)
        await axios
          .get(
            `http://localhost:3333/providers/users/${job.company_or_provider}`
          )
          .then((response) => setProvider(response.data))
          .catch((error) => console.log(error));
    }
    getProvider();
  }, [job]);

  useEffect(() => {
    if (provider) {
      setLoading(false);
    }
  }, [provider]);

  useEffect(() => {
    async function getapplication(){
      if(userType==="seeker" && job)
        await axios
          .get(`http://localhost:3333/job/${job._id}/single_application`, {withCredentials: true})
          .then(response=>setApplied(response.data))
          .catch(error=>console.log(error))
    }
    getapplication();
    if(job && provider && (applied!==null || userType!=='seeker')) setLoading(false)
  }, [provider]);

  return (
    <div className="css-job-page" style={loading ? { padding: "0" } : null}>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          {Cookies.get("user") ? <Appbar /> : <LandingPageAppBar />}
          <div className="css-job-page-main-container">
            <div className="css-job-page-header">
              <h1>{job.position}</h1>
              <p>
                by <a href="">{provider.company_name || provider.username}</a>
              </p>
            </div>
            <div className="css-job-page-body">
              <div className="css-job-page-essentials">
                <p>
                  <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    icon={faLocationDot}
                  />
                  {job.location}
                </p>
                <p>
                  <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    icon={faBriefcase}
                  />
                  {job.experience} years
                </p>
                {job.salary?
                  <p>
                    <FontAwesomeIcon
                      style={{ marginRight: "5px" }}
                      icon={faCoins}
                    />
                    {job.salary} LPA
                  </p>
                :
                  ""
                }
                <p>
                  <FontAwesomeIcon
                    style={{ marginRight: "5px" }}
                    icon={faClockRotateLeft}
                  />
                  {monthsBefore
                    ? `${
                        currentDate.getMonth() - postedDate.getMonth()
                      } month/s before`
                    : `${
                        currentDate.getDate() - postedDate.getDate()
                      } day/s before`}
                </p>
              </div>
              <h2>Job Description</h2>
              <ul>
                {job.job_description.map((option,index)=> (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              {job.job_responsibilities ?
                <React.Fragment>
                  <h2>Job Responsibilities</h2>
                  <ul>
                    {job.job_responsibilities.map((option,index)=>(
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </React.Fragment>
              :
                ""
              }
              <h2>Required skills</h2>
              <div className="css-job-page-skills">
                {job.skills_required.map((skill)=>(
                  <div className="skills">
                    <p>{skill}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="css-job-page-footer">
              {seeker ? (
                applied ?
                  <Button
                    style={{
                      backgroundColor: "darkcyan",
                      color: "white",
                      borderRadius: "1.5rem",
                    }}
                    // onClick={HandleApply}
                  >
                    applied
                  </Button>
                :
                  <Button
                    style={{
                      backgroundColor: "darkcyan",
                      color: "white",
                      borderRadius: "1.5rem",
                    }}
                    onClick={HandleApply}
                  >
                    Apply
                  </Button>
              ) : (
                <Button
                  onClick={()=>{Cookies.set('job',job._id);navigate(`/${job._id}/applications`)}}
                  style={{
                    backgroundColor: "darkcyan",
                    color: "white",
                    borderRadius: "1.5rem",
                  }}
                >
                  view applications
                </Button>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default JobPage;
