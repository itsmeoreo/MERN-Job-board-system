import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { faBook, faBriefcase, faBuilding, faBuildingCircleArrowRight, faBuildingColumns, faBuildingLock, faEnvelope, faGraduationCap, faLocationDot, faPhone, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Loading from '../pages/loading/Loading';
import { Link } from 'react-router-dom';

function ProfileCard() {


  const token= Cookies.get('token')
  const userType= Cookies.get('user')

  const [loading,setLoading] = useState(true)
  const [user,setUser] = useState(null)

  useEffect(() => {
    switch (userType) {
      case 'seeker':
        setLoading(true);
        axios
          .get("http://localhost:3333/seekers/user", { withCredentials: true })
          .then((response) => setUser(response.data))
          .catch((error) => console.log(error.message));
        break;
      case 'free-lancer':
        axios
          .get("http://localhost:3333/providers/user", {withCredentials: true})
          .then(response=>setUser(response.data))
          .catch(error=>console.log(error))
        break;
      case 'company':
        axios
          .get("http://localhost:3333/company/user", {withCredentials: true})
          .then(response=>setUser(response.data))
          .catch(error=>console.log(error))
        break;
    }
  }, []);

  useEffect(() => {
    if(user) setLoading(false)
  }, [user]);

  return (
    <React.Fragment>
      {loading ? 
        <Loading style={{padding: "10rem 5rem"}}/>
      :
        <Link style={{textDecoration: "none", color: "unset", backgroundColor: "white", width: "100%", borderRadius: "2rem", padding: "2rem 0" }} to='/user' >
          <div style={{ display: "inline-flex", borderRadius: "50%", height:"8rem", width: "8rem", backgroundColor: "grey" }}>
            <img style={{ borderRadius: "50%", height:"8rem", width: "8rem" }} src={user.profile_picture}/>
          </div>
          <h2>Welcome <br />{userType==='company'? user.recruiter_name : user.name}</h2>
          {userType==='company'? 
            <h4 style={{marginLeft: "2rem"}}><FontAwesomeIcon style={{marginRight: ".5rem"}} icon={faBuilding} />{user.company_name}</h4>
          :
            <h5><FontAwesomeIcon style={{marginRight: ".5rem"}} icon={faLocationDot} />{user.current_location_city}, {user.current_location_state}</h5>
          }
          {userType==='company'? 
            <p style={{textAlign: "start"}}>{user.moto}</p>
          :
            <React.Fragment >
              {userType==='seeker'?
                <React.Fragment>
                {user.professional_detail==='experienced' ?
                  <p style={{textAlign: "start", color: "black"}}><FontAwesomeIcon style={{marginRight: ".5rem"}} icon={faBriefcase}/>{user.current_designation}</p>
                :
                  userType === 'fresher' ?
                    <p style={{textAlign: "start", color: "black"}}><FontAwesomeIcon style={{marginRight: ".5rem"}} icon={faGraduationCap}/>{user.heighest_qualification}</p>
                  :
                    <p style={{textAlign: "start", color: "black"}}><FontAwesomeIcon style={{marginRight: ".5rem"}} icon={faBook}/>{user.heighest_qualification}</p>
                }
                </React.Fragment>
              :
                
            <p style={{textAlign: "start", color: "black"}}><FontAwesomeIcon style={{marginRight: ".5rem"}} icon={faUserTie}/>free-lancer</p>
              }
              <p style={{textAlign: "start", color: "black"}}><FontAwesomeIcon style={{marginRight: ".5rem"}} icon={faPhone} />{user.phone_number}</p>
              <p style={{textAlign: "start", color: "black"}}><FontAwesomeIcon style={{marginRight: ".5rem"}} icon={faEnvelope} />{user.email}</p>
            </React.Fragment>
          }
        </Link>
      }
    </React.Fragment>
  )
}

export default ProfileCard