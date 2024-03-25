import React, { useState } from "react";
import LandingPageAppBar from "../navbar/Navbar.js";
import "./AuthPage.css";
import RegisterLevels from "./RegisterLevels.js";
import DoneIcon from "@mui/icons-material/Done";

function RegisterPage(props) {
  const [registerLevel, setRegisterLevel] = useState(0);

  return (
    <div className="css-registerpage">
      <LandingPageAppBar inHome={false} inLogin={false} />
      <div className="css-registerpage-wholecontainer">
        <div className="css-registerpage-levels-maincontainer">
          <div className="css-registerpage-levels-subcontainer">
            <div
              style={
                registerLevel === 0
                  ? {
                      marginLeft: "-2.15rem",
                      borderRadius: "50%",
                      border: ".5rem solid darkcyan",
                      color: "darkcyan",
                      width: "50px",
                      height: "50px",
                      verticalAlign: "middle",
                      backgroundColor: "white",
                    }
                  : {
                      marginLeft: "-1.85rem",
                      borderRadius: "50%",
                      border: ".2rem solid rgba(0, 139, 139, 0.461)",
                      color: "rgba(0, 139, 139, 0.461)",
                      width: "50px",
                      height: "50px",
                      verticalAlign: "middle",
                      backgroundColor: "white",
                    }
              }
            >
              <p style={{ color: "inherit" }}>
                <b>{registerLevel === 0 ? 1 : <DoneIcon />}</b>
              </p>
            </div>
            {registerLevel === 0 ? (
              <h2
                style={{
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  marginTop: "-2.9rem",
                  marginLeft: "2.2rem",
                  color: "darkcyan",
                }}
              >
                Basic Details
              </h2>
            ) : (
              <h4
                style={{
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  marginTop: "-2.3rem",
                  marginLeft: "2.2rem",
                }}
              >
                Basic Details
              </h4>
            )}
            <p
              style={{
                margin: 0,
                padding: 0,
                position: "absolute",
                marginTop: "-1.3rem",
                marginLeft: "2.2rem",
              }}
            >
              Takes 30 seconds to complete
            </p>
            <div
              style={
                registerLevel === 1
                  ? {
                      marginLeft: "-2.15rem",
                      borderRadius: "50%",
                      border: ".5rem solid darkcyan",
                      color: "darkcyan",
                      width: "50px",
                      height: "50px",
                      verticalAlign: "middle",
                      backgroundColor: "white",
                      marginTop: "3rem",
                    }
                  : {
                      marginLeft: "-1.85rem",
                      borderRadius: "50%",
                      border: ".2rem solid rgba(0, 139, 139, 0.461)",
                      color: "rgba(0, 139, 139, 0.461)",
                      width: "50px",
                      height: "50px",
                      verticalAlign: "middle",
                      backgroundColor: "white",
                      marginTop: "3rem",
                    }
              }
            >
              <p style={{ color: "inherit" }}>
                <b>{registerLevel <= 1 ? 2 : <DoneIcon />}</b>
              </p>
            </div>
            {registerLevel === 1 ? (
              <h2
                style={{
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  marginTop: "-2.9rem",
                  marginLeft: "2.2rem",
                  color: "darkcyan",
                }}
              >
                Professional Details
              </h2>
            ) : (
              <h4
                style={{
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  marginTop: "-2.3rem",
                  marginLeft: "2.2rem",
                }}
              >
                Professional Details
              </h4>
            )}
            <p
              style={{
                margin: 0,
                padding: 0,
                position: "absolute",
                marginTop: "-1.3rem",
                marginLeft: "2.2rem",
              }}
            >
              Takes 30 seconds to complete
            </p>
            <div
              style={
                registerLevel === 2
                  ? {
                      marginLeft: "-2.15rem",
                      borderRadius: "50%",
                      border: ".5rem solid darkcyan",
                      color: "darkcyan",
                      width: "50px",
                      height: "50px",
                      verticalAlign: "middle",
                      backgroundColor: "white",
                      marginTop: "3rem",
                    }
                  : {
                      marginLeft: "-1.85rem",
                      borderRadius: "50%",
                      border: ".2rem solid rgba(0, 139, 139, 0.461)",
                      color: "rgba(0, 139, 139, 0.461)",
                      width: "50px",
                      height: "50px",
                      verticalAlign: "middle",
                      backgroundColor: "white",
                      marginTop: "3rem",
                    }
              }
            >
              <p style={{ color: "inherit" }}>
                <b>{registerLevel <= 2 ? 3 : <DoneIcon />}</b>
              </p>
            </div>
            {registerLevel === 2 ? (
              <h2
                style={{
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  marginTop: "-2.9rem",
                  marginLeft: "2.2rem",
                  color: "darkcyan",
                }}
              >
                Employment Details
              </h2>
            ) : (
              <h4
                style={{
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  marginTop: "-2.3rem",
                  marginLeft: "2.2rem",
                }}
              >
                Employment Details
              </h4>
            )}
            <p
              style={{
                margin: 0,
                padding: 0,
                position: "absolute",
                marginTop: "-1.3rem",
                marginLeft: "2.2rem",
              }}
            >
              Takes 30 seconds to complete
            </p>
            <div
              style={{
                marginLeft: "-1.85rem",
                borderRadius: "50%",
                border: ".2rem solid rgba(0, 139, 139, 0.461)",
                color: "rgba(0, 139, 139, 0.461)",
                width: "50px",
                height: "50px",
                verticalAlign: "middle",
                backgroundColor: "white",
                marginTop: "3rem",
              }}
            >
              <p style={{ color: "inherit" }}>
                <b>#</b>
              </p>
            </div>
            {registerLevel > 2 ? (
              <h2
                style={{
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  marginTop: "-2.9rem",
                  marginLeft: "2.2rem",
                  color: "darkcyan",
                }}
              >
                Get Started
              </h2>
            ) : (
              <h4
                style={{
                  margin: 0,
                  padding: 0,
                  position: "absolute",
                  marginTop: "-2.3rem",
                  marginLeft: "2.2rem",
                }}
              >
                Get Started
              </h4>
            )}
            <p
              style={{
                margin: 0,
                padding: 0,
                position: "absolute",
                marginTop: "-1.3rem",
                marginLeft: "2.2rem",
              }}
            >
              Takes 2 minutes to register
            </p>
          </div>
        </div>
        <div className="css-registerpage-contents">
          <RegisterLevels
            RegisterLevel={registerLevel}
            SetRegisterLevel={setRegisterLevel}
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
