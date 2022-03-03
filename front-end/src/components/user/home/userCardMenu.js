import React from "react";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import "./userMenu.css";
function UserCardMenu(props) {
  const navigate = useNavigate();
  return (
    <Paper
      elevation={5}
      sx={{ width: "150px" }}
      onClick={() => {
        navigate(props.NavigateTo);
      }}
    >
      <div className="paperContent">
        <div className="icon">{props.iconName}</div>
        <h5>{props.name}</h5>
      </div>
    </Paper>
  );
}

export default UserCardMenu;
