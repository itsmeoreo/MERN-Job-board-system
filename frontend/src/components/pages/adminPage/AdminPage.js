import { minWidth } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProgressCard from '../../cards/ProgressCard';
import VerificationCard from '../../cards/VerificationCard';
import AppBar from '../../navbar/Appbar'
import Loading from '../loading/Loading';
import './AdminPage.css'

function AdminPage() {

  const [loading,setLoading] = useState(true)
  const [requests,setRequests] = useState([]);

  async function getRequests(){
    await axios
      .get("http://localhost:3333/administrator/all_requests", {withCredentials: true})
      .then(response=> setRequests(response.data))
      .catch(error=>error.response.data)
  }

  useEffect(() => {
    getRequests()
  }, []);

  useEffect(() => {
    if(requests){
      console.log("into if");
      setLoading(false)
      console.log(requests);
    }
  }, [requests]);

  return (
    <div id='admin-page' className='admin-page' style={{minHeight: "79vh"}}>
      <AppBar  Admin={true}/>
      <h1>Stats about this week</h1>
      <div className='admin-page-main-container'>
        <ProgressCard content={"no of seekers joined this week"} percentage={8}/>
        <ProgressCard content={"no of free-lancers joined this week"} percentage={5} />
        <ProgressCard content={"no of companies joined this week"} percentage={2} />
      </div>
      <h2>Verifications for users representing companies</h2>
      {loading ?
        <Loading style={{padding: "0 45%"}} />
      :
        <div>
          {!requests.length ? (
              <h2>No requests pending for verification</h2>
          ) : (
            requests.map((request)=>(
              <VerificationCard Company={request} GetRequests={getRequests} SetLoading={setLoading} />
            ))
          )}
        </div>
      }
    </div>
  )
}

export default AdminPage