import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../pages/loading/Loading";
import "./ApplicantCard.css";

function ApplicantCard({
  Application,
  SetResume,
  SetOpenResume,
  GetApplication,
}) {
  const [loading, setLoading] = useState(true);
  const [applicant, setApplicant] = useState(null);

  async function getApplicant() {
    await axios
      .get(`http://localhost:3333/seekers/applicant/${Application.applicant}`, {
        withCredentials: true,
      })
      .then((response) => setApplicant(response.data))
      .catch((error) => console.log(error.response.data));
  }

  useEffect(() => {
    getApplicant();
  }, []);

  useEffect(() => {
    if (applicant) {
      setLoading(true);
      SetResume(applicant.resume);
      setLoading(false);
      console.log(Application.selected);
    }
  }, [applicant, Application.selected]);

  async function HandleSelect() {
    setLoading(true);
    function postNotification() {
      axios
        .post(
          `http://localhost:3333/notifications/new/2/${Application.applicant}/${Application.job}`,
          "notification",
          { withCredentials: true }
        )
        .catch((error) => console.log(error));
    }
    await axios
      .put(
        `http://localhost:3333/job/${Application.job}/${Application._id}/true`,
        "",
        { withCredentials: true }
      )
      .then((response) => {
        setLoading(true);
        alert("candidate selected");
        console.log("adangomtha");
        postNotification();
        GetApplication();
      })
    .catch(error=>console.log(error.response.data))
  }

  return (
    <div className="applicant-card">
      {loading ? (
        <Loading style={{ padding: "5% 45%" }} />
      ) : (
        <React.Fragment>
          <div className="css-applicant-card-header">
            <img src={applicant.profile_picture} />
            <div className="css-applicant-card-main-info">
              <h3>{applicant.name}</h3>
              <p>{applicant.professional_detail}</p>
            </div>
          </div>
          <div className="css-applicant-card-footer">
            <Button
              style={{
                margin: ".5rem",
                backgroundColor: "darkcyan",
                color: "white",
                borderRadius: "1.5rem",
              }}
              onClick={() => SetOpenResume(true)}
            >
              view resume
            </Button>
            {Application.selected ? (
              <Button
                style={{
                  borderRadius: "1.5rem",
                }}
              >
                selected
              </Button>
            ) : (
              <Button
                onClick={HandleSelect}
                style={{
                  borderRadius: "1.5rem",
                }}
              >
                select
              </Button>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default ApplicantCard;
