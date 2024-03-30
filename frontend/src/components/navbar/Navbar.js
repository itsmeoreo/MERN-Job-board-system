import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Landing_page_logo from '../../services/images/Landing_page_logo.png'
import {Link, NavLink} from 'react-router-dom'

function LandingPageAppBar(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        className='css-appbar'
        style={ 
          props.inHome? 
            {backgroundColor: "darkcyan"}
          :
            {backgroundColor: "white", borderBottom: "solid .1rem black"}
          }
        position="fixed"
      >
        <Toolbar>
          <img style={{height: "3rem", marginLeft: "3rem"}} src={Landing_page_logo} alt="loo" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            href="/"
            sx={{
              flexGrow: 1,
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link 
              to='/' 
              style={props.inHome?
                { color: "white", textDecoration: "none" }
              :
                { color: "black", textDecoration: "none" }
              }
            >
              <strong style={{color: "red"}}>R</strong>ed Tie
            </Link>
          </Typography>
          {props.inHome?
            <div>
              <NavLink to='/employer_register' style={{color: "white"}}>
                <Button 
                  style={{marginRight: "1rem", borderRadius: "2rem"}} 
                  color="inherit"
                >
                  Provide Jobs
                </Button>
              </NavLink>
              <NavLink to='/register' style={{color: "white"}}>
                <Button 
                  style={{marginRight: "1rem", borderRadius: "2rem"}} 
                  color="inherit"
                >
                  Register
                </Button>
              </NavLink>
              <NavLink to='/login' style={{color: "white"}}>
                <Button 
                  style={{marginRight: "4rem", borderRadius: "2rem"}} 
                  color="inherit"
                >
                  Login
                </Button>
              </NavLink>
            </div>
          :
            props.inLogin ?
              <React.Fragment>
                <NavLink to='/admin_login' style={{color: "white"}}>
                  <Button 
                    style={{
                      marginRight: "4rem", 
                      borderRadius: "2rem", 
                      backgroundColor: "darkcyan",
                      padding: ".5rem 1rem"
                    }} 
                    color="inherit"
                  >
                    admin
                  </Button>
                </NavLink>
                <NavLink to='/register' style={{color: "white"}}>
                  <Button 
                    style={{
                      marginRight: "4rem", 
                      borderRadius: "2rem", 
                      backgroundColor: "darkcyan",
                      padding: ".5rem 1rem"
                    }} 
                    color="inherit"
                  >
                    Register
                  </Button>
                </NavLink>
              </React.Fragment>
            :
            <NavLink to='/login' style={{color: "white"}}>
              <Button 
                style={{
                  marginRight: "4rem", 
                  borderRadius: "2rem", 
                  backgroundColor: "darkcyan",
                  padding: ".5rem 1rem"
                }} 
                color="inherit"
              >
                Login
              </Button>
            </NavLink>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default LandingPageAppBar ;