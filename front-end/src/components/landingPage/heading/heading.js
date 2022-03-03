import React from "react";
import "animate.css";
import "./heading.css";

function Heading(props) {
  return (
    <div className="headingDiv animate__animated animate__zoomIn">
      <h1 className="mainHeaading">
        Welcome To <br /> Automatic Cheque Recognition System
      </h1>
      <a href={props.id}>
        <i className="fas fa-chevron-down animate__animated animate__heartBeat animate__slower animate__delay-3s animate__repeat-3"></i>
      </a>
    </div>
  );
}

export default Heading;
