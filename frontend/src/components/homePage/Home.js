import React, { useEffect, useState } from "react";
import Appbar from "../navbar/Appbar";
import "./Home.css";
import Footer from "../footer/Footer";
import ProfileCard from "../cards/ProfileCard";
import HeaderHomePage from "../header/HeaderHomePage";
import JobCard from "../cards/JobCard";
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  Autocomplete,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { darken, lighten, styled } from "@mui/system";
import ApplicantCard from "../cards/ApplicantCard";
import axios from "axios";
import Loading from "../pages/loading/Loading";
import home_page_header from '../../services/images/home_page_header.jpg'
import Cookies from "js-cookie";

function Home() {
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

  const usertype= Cookies.get('user')
  const [jobs,setJobs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);

  useEffect(() => {
    async function getJobs(){
      await  axios
        .get("http://localhost:3333/job/all_jobs")
        .then(response=>setJobs(response.data))
        .catch(error=>console.log(error))
    }
    getJobs()
  }, []);

  const fetchMoreJobs=async ()=> {
    await axios
      .get(`http://localhost:3333/job/all_jobs?offset=${index}0&limit=5`)
      .then(response=>{
        setJobs((prevJobs)=>[...prevJobs, ...response.data]);
        response.data.length > 0 ? setHasMore(true) : setHasMore(false)
      })
      .catch(error=>console.log(error))
      setIndex((prevIndex) => prevIndex + 1);
  }

  const GroupHeader = styled("div")(({ theme }) => ({
    position: "sticky",
    top: "-8px",
    padding: "4px 10px",
    color: "white",
    backgroundColor: "darkcyan",
  }));

  const GroupItems = styled("ul")({
    padding: 0,
  });

  const filters = [
    { option: "full time", type: "type" },
    { option: "part time", type: "type" },
    { option: "work from home", type: "type" },
    { option: "0-2", type: "experience" },
    { option: "2-4", type: "experience" },
    { option: "4-6", type: "experience" },
    { option: "6", type: "experience" },
  ];

  function renderGroup() {
    const options = filters.map((option) => {
      const type = option.type;
      return {
        type,
        ...option,
      };
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="css-home">
        <Appbar/>
        <div className="css-home-main-container">
          <div className="css-home-first-container">
          {usertype==='seeker'? 
            <React.Fragment>
              <HeaderHomePage />
                <Autocomplete
                  style={{
                    margin: "0 0 1rem 0",
                    position: "sticky",
                    top: "8vh",
                    backgroundColor: "rgb(213,233,233)",
                    boxShadow: " rgb(213,233,233) 0px 10px 20px",
                  }}
                  multiple
                  id=""
                  options={filters}
                  groupBy={(option) => option.type}
                  getOptionLabel={(option) => option.option}
                  renderInput={(params) => <TextField {...params} label="Filter" />}
                  renderGroup={(params) => (
                    <li key={params.key}>
                      <GroupHeader>{params.group}</GroupHeader>
                      <GroupItems>{params.children}</GroupItems>
                    </li>
                  )}
                />
            </React.Fragment>
          : 
            <div className='header-home-page' style={{backgroundImage: `url(${home_page_header})`, maxHeight: "25vh"}}>
              <h1 style={{color: "white"}}>The applications for the jobs you posted</h1>
            </div>
          }
            
            {usertype==='seeker'?
              <InfiniteScroll
                dataLength={jobs.length}
                next={fetchMoreJobs}
                hasMore={hasMore}
                loader={<Loading style={{padding: "5vh 42%"}} />}
              >
                {jobs && jobs.map((job)=> <JobCard key={job.id} job={job} />)}
              </InfiniteScroll>
            :
              <ApplicantCard />
            }
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            className="css-home-second-container"
          >
            <ProfileCard />
              <div className="css-homepage-footer" style={{ margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              <a href="">Search jobs</a>
              <a href="">Create free account</a>
              <br />
              <a href="">Support</a>
              <a href="">Help center</a>
              <a href="">About</a>
              <br />
              <a href="">Privacy policy</a>
              <a href="">Rules to post jobs</a>
            </div>
          </div>
          <div className="css-home-messagebox"></div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
