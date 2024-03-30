import React, { useState } from "react";
import Footer from "../footer/Footer";
import HeaderLandingPage from "../header/HeaderLandingPage";
import LandingPageAppBar from "../navbar/Navbar";
import ServiceSection from "./ServiceSection";
import "./LandingPage.css";
import HeaderQuote from "../../services/images/HeaderQuote.png";
import JobCard from "../cards/JobCard";
import axios from "axios";

function LandingPage() {

  const [jobs, setJobs] = useState(null)
  const [position, setPosition] = useState(null)
  const [location, setLocation] = useState(null)

  async function handleSearch(){
    await axios
      .get(`http://localhost:3333/job/search?position=${position}&location=${location}&limit=5`)
      .then(response=>{setJobs(response.data);setPosition(null);setLocation(null)})
      .catch(error=>console.log(error.response.data))
  }

  return (
    <div>
      <LandingPageAppBar inHome={true} />
      <HeaderLandingPage SetPosition={setPosition} SetLocation={setLocation} HandleSearch={handleSearch} />
      {(jobs && jobs.map((job)=> 
        <React.Fragment>
          <JobCard key={job.id} job={job} />
          <hr />
        </React.Fragment>
      ))}
      {jobs && <h3>To explore more jobs create an account</h3>}
      <img src={HeaderQuote} style={{ maxWidth: "100%" }} />
      <ServiceSection />
      <Footer />
    </div>
  );
}

export default LandingPage;
