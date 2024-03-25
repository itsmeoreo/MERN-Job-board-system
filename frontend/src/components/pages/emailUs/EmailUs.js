import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, createTheme, TextField, ThemeProvider } from '@mui/material';
import Cookies from 'js-cookie'
import React from 'react'
import Appbar from '../../navbar/Appbar';
import SendIcon from '@mui/icons-material/Send';
import LandingPageAppBar from '../../navbar/Navbar';
import {faFaceSmile} from '@fortawesome/free-solid-svg-icons'
import emailjs from '@emailjs/browser'
import './EmailUs.css'

function EmailUs() {

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

  function HandleSubmit(event){
    event.preventDefault()
    emailjs.sendForm("service_w6d1l1m", "template_3meir7a", event.target, "UxilKB-ZRu5wdpmqh")
    alert("email sent")
  }

  const loggedin= Cookies.get('token') ? true : false;

  return (
    <ThemeProvider theme={theme}>
      <div className='email-us' onSubmit={HandleSubmit}>
        {loggedin ?
        <Appbar />
        :
        <LandingPageAppBar inHome={true}/>
        }
        <h1 style={{color: "darkcyan", textDecoration: "underline"}}>Send us a mail<FontAwesomeIcon icon={faFaceSmile}/></h1>
        <div className='css-email-us-main-container'>
          <form >
            <TextField
              className="css-email-us-email"
              label="email-Id"
              variant="outlined"
              type="email"
              name='email_from'
              fullWidth
              required
              style={{
                backgroundColor: "white",
                borderRadius: "1.3rem",
                marginBottom: "3rem",
                maxWidth: "30rem"
              }}
            />
            <TextField
              className='css-email-us-message'
              size="large"
              type="text"
              label="message"
              name='message'
              rows={7}
              required
              fullWidth
              multiline
              style={{ 
                backgroundColor: "white",
                borderRadius: "1.3rem",
                marginBottom: "3rem",
                maxWidth: "30rem"
              }}
            /> <br/>
            <Button
              type='submit'
              style={{
                backgroundColor: "darkcyan",
                color: "white",
                borderRadius: "1.3rem",
                paddingLeft: "1rem",
                paddingRight: "1rem"
              }}
            >
              Send
              <SendIcon fontSize='x-small' style={{marginLeft: ".5rem"}} />
            </Button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default EmailUs