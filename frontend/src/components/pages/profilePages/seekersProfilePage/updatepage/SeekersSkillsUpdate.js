import { TextField } from '@mui/material'
import React from 'react'
import {
  faTrash,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SeekersSkillsUpdate({ skills, setSkills }) {

  const handleAddInput = () => {
    setSkills([...skills, ""]);
  };

  const handleRemoveInput = (index) => {
    const newskills = [...skills];
    newskills.splice(index, 1);
    setSkills(newskills);
  };

  const handleInputChange = (index, value) => {
    const newskills = [...skills];
    newskills[index] = value;
    setSkills(newskills);
  };

  return (
    <div style={{display : "flex", flexWrap: "wrap", justifyContent: "center"}}>
      {skills.map((input, index) => (
        <div style={{ display: "flex", alignItems: "center" }} key={index}>
          <TextField
            size="small"
            type="text"
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
          <button
            onClick={() => handleRemoveInput(index)}
            style={{
              border: "none",
              height: "1rem",
              width: "1rem",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          >
            <FontAwesomeIcon color="red" icon={faTrash} />
          </button>
        </div>
      ))}
      <button
        onClick={handleAddInput}
        style={{
          border: "none",
          width: "1rem",
          cursor: "pointer",
          backgroundColor: "transparent",
        }}
      >
        <FontAwesomeIcon size="xl" color="darkcyan" icon={faCirclePlus} />
      </button>
    </div>
  )
}

export default SeekersSkillsUpdate