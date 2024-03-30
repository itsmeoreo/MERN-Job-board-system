import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RegisterLevelOne from './registerlevels/RegisterLevelOne.js';
import RegisterLevelTwo from './registerlevels/RegisterLevelTwo.js';
import RegisterLevelThreeExperienced from './registerlevels/RegisterLevelThreeExperienced.js'
import RegisterLevelThreeFresher from './registerlevels/RegisterLevelThreeFresher.js'
import axios from 'axios'
import Cookies from 'js-cookie';

function RegisterLevels(props) {


  const navigate= useNavigate();

  const [resume, setResume] = useState(null);
  const [linkedin_url, setLinkedin_url]= useState(null)
  const [name, setName] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [phone_number, setPhone_number]= useState(null);
  const [current_location_state, seturrent_location_state]= useState('');
  const [current_location_city, setCurrent_location_city]= useState('');
  const [gender, setGender]= useState(null);
  //level2
  const [professional_detail, setProfessional_detail]= useState(null);
  //level3.1
  const [current_designation,setCurrent_designation] = useState('');
  const [company_name, setCompany_name] = useState('');
  const [currently_inhere, setCurrently_inhere] = useState(true);
  const [start_date, setStart_date] = useState('');
  const [current_salary, setCurrent_salary] = useState('');
  const [hide_salary, setHide_salary] = useState(false);
  const [notice_period, setNotice_period] = useState('');
  //level3.2
  const [heighest_qualification, setHeighest_qualification] = useState('');
  const [major, setMajor] = useState('');
  const [university, setUniversity] = useState('');
  const [graduation_year, setGraduation_year] = useState('');
  const [education_type, setEducation_type] = useState('');

  function HandleResume(file){
    setResume(file);
  }
  
  async function HandleContinueBtn(event){ 
    // event.preventDefault();
    // props.SetRegisterLevel(props.RegisterLevel+ 1);
    switch (props.RegisterLevel) {
      case 0:{
        if( name!==null && username!==null && email!==null && password!==null && phone_number!==null && gender!==null ){
          props.SetRegisterLevel(props.RegisterLevel+ 1);
        }
        break;
      }
      case 1:{
        if (professional_detail!==null)
          props.SetRegisterLevel(props.RegisterLevel+ 1);
        break;
      }
      case 2:{
        props.SetRegisterLevel(props.RegisterLevel+ 1);
        break;
      }
      case 3:{
        const seeker= new FormData();
        try{
          if (professional_detail==="experienced") {
            seeker.append('resume', resume);
            seeker.append('linkedin_url', linkedin_url);
            seeker.append('username', username);
            seeker.append('name', name);
            seeker.append('email', email);
            seeker.append('password', password);
            seeker.append('phone_number', phone_number);
            seeker.append('current_location_state', current_location_state);
            seeker.append('current_location_city', current_location_city);
            seeker.append('gender', gender);
            seeker.append('professional_detail', professional_detail);
            seeker.append('current_designation', current_designation);
            seeker.append('company_name', company_name);
            seeker.append('currently_inhere', currently_inhere)
            seeker.append('start_date', start_date)
            seeker.append('current_salary', current_salary)
            seeker.append('hide_salary', hide_salary)
            seeker.append('notice_period', notice_period)
          }
          else{
            seeker.append('resume', resume);
            seeker.append('linkedin_url', linkedin_url);
            seeker.append('username', username);
            seeker.append('name', name);
            seeker.append('email', email);
            seeker.append('password', password);
            seeker.append('phone_number', phone_number);
            seeker.append('current_location_state', current_location_state);
            seeker.append('current_location_city', current_location_city);
            seeker.append('gender', gender);
            seeker.append('professional_detail', professional_detail);
            seeker.append('heighest_qualification', heighest_qualification);
            seeker.append('major', major);
            seeker.append('university', university);
            seeker.append('graduation_year', graduation_year);
            seeker.append('education_type', education_type);
          }
        }
        catch(error){
          console.log(error.messahe);
        }

        await axios
        .post('http://localhost:3333/seekers/register', seeker, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response=> {
          Cookies.set("token",response.data.token)
          Cookies.set('user',"seeker")
          navigate('/home');
        })
        .catch((error)=>console.error(error))
      
        break;
      }
    }
  }
    

  return (
    <div>
      {
        props.RegisterLevel=== 0?
          <RegisterLevelOne 
            HandleFunc={HandleContinueBtn}
            HandleResume={HandleResume}
            SetLinkedinUrl={setLinkedin_url}
            SetName={setName}
            SetUsername={setUsername}
            SetEmail={setEmail}
            SetPassword={setPassword}
            SetPhoneNumber={setPhone_number}
            SetState={seturrent_location_state}
            SetCity={setCurrent_location_city}
            SetGender={setGender}
          />
        :
          props.RegisterLevel===1?
            < RegisterLevelTwo
            HandleFunc={HandleContinueBtn}
            SetProfessionalDetail= {setProfessional_detail}
            />
          :
            professional_detail==="experienced" ?
              <RegisterLevelThreeExperienced 
                HandleFunc={HandleContinueBtn}
                SetCurrent_designation={setCurrent_designation}
                SetCompany_name={setCompany_name}
                SetCurrently_inhere={setCurrently_inhere}
                SetStart_date={setStart_date}
                SetCurrent_salary={setCurrent_salary}
                SetHide_salary={setHide_salary}
                SetNotice_period={setNotice_period}
              />
            :
              <RegisterLevelThreeFresher 
                HandleFunc={HandleContinueBtn}
                SetHeighest_qualification={setHeighest_qualification}
                SetMajor={setMajor}
                SetUniversity={setUniversity}
                SetGraduation_year={setGraduation_year}
                SetEducation_type={setEducation_type}
              />
      }
    </div>
  )
}

export default RegisterLevels