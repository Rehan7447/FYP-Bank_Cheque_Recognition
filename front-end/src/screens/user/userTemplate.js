import { useNavigate } from "react-router-dom";
import React, {useEffect } from "react";
import UserHeader from "../../components/header/userHeader";
import "./userTemplate.css";

function UserTemplate (props) {
  const navigate = useNavigate();

  useEffect(()=>{
    if(!localStorage.getItem("userInfo")){
			navigate("/login")
		}
  });
  
    return (
      <div className="userMain">
        <UserHeader />
        <div className="userMainContent">{props.children}</div>
        <div>footer</div>
      </div>
    );
  
}

export default UserTemplate;
