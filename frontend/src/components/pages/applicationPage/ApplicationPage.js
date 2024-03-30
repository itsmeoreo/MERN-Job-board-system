import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import Appbar from '../../navbar/Appbar'
import Loading from '../loading/Loading'
import ApplicantCard from '../../cards/ApplicantCard'
import './ApplicationPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'

function ApplicationPage() {

  const jobId= Cookies.get('job')
  const [openResume, setOpenResume] = useState(false)
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState(null)
  const [applications, setApplications] = useState(null)

  useEffect(() => {
    async function getJob(){
      await axios
        .get(`http://localhost:3333/job/single_job/${jobId}`, {withCredentials: true})
        .then(response=> setJob(response.data))
        .catch(error=> console.log(error.response.data))
    }
    getJob()
  }, []);

  useEffect(() => {
    async function getApplication(){
      await axios
        .get(`http://localhost:3333/job/${jobId}/applications`, {withCredentials: true})
        .then(response=> setApplications(response.data))
        .catch(error=>console.log(error.response.data))
    }
    if(job) getApplication()
  }, [job]);

  useEffect(() => {
    if(applications && job) setLoading(false)
  }, [applications]);

  return (
    <React.Fragment>
      {loading?
        <Loading style={{padding: "25% 45%"}}/>
      :
        openResume?
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
          <div className='application-page'>
              <Appbar />
              <div className='css-application-page-main-coontainer'>
                <div className='css-application-page-job-container'>
                  <h1>Applications for position: {job.position}</h1>
                  {applications.map((application)=>(
                    <ApplicantCard Application={application} SetResume={setResume} SetOpenResume={setOpenResume}/>
                  ))}

                </div>
              </div>
          </div>
        }
      </React.Fragment>
  )
}

export default ApplicationPage