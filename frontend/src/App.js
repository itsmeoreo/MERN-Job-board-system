import './App.css';
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/landingPage/LandingPage.js';
import LoginPage from './components/authPages/LoginPage.js';
import RegisterPage from './components/authPages/RegisterPage.js';
import RegisterPageEmployer from './components/authPages/RegisterPageEmployer.js';
import Home from './components/homePage/Home.js';
import ProfilePage from './components/pages/profilePages/ProfilePage.js';
import JobPage from './components/pages/jobPage/JobPage';
import NewJopPage from './components/pages/newJobPage/NewJopPage';
import ErrorPage from './components/pages/errorPage/ErrorPage';
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import EmailUs from './components/pages/emailUs/EmailUs';
import ForgotPassword from './components/authPages/forgot password/ForgotPassword';
import AdminPage from './components/pages/adminPage/AdminPage';
import AdminLogin from './components/authPages/AdminLogin';
import ApplicationPage from '../src/components/pages/applicationPage/ApplicationPage'

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(Cookies.get('token'))
  }, [Cookies]);

  return (
    <div className="App">
      <Routes>
        <Route path='/email_us' element={<EmailUs />} />
        <Route path='/' element={<LandingPage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/admin_login' element={<AdminLogin />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/contact_us' element={<EmailUs />}/>
        <Route path='/employer_register' element={<RegisterPageEmployer />}/>
        <Route path='/reset_password' element={<ForgotPassword />} />
        {token ?
          <React.Fragment>
            <Route path='/home' element={<Home />} />
            <Route path='/user' element={<ProfilePage/>} />
            <Route path='/admin_page' element={<AdminPage />} />
            <Route path='/job/:job_id' element={<JobPage/>} />
            <Route path='/new_job' element={<NewJopPage />} />
            <Route path='/:job/applications' element={<ApplicationPage />}/>
          </React.Fragment>
        :
          ""
        }
        <Route path='/*' element={<ErrorPage />} />       
      </Routes>  
    </div>
  );
}

export default App;

