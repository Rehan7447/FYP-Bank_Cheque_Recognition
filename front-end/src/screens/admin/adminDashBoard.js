import React, { useEffect } from "react";
import "../../components/admin/dashboard/dashboard.css";
import Side from "../../components/admin/sideNav";
import Top from "../../components/admin/topNav";
import CustomBody from "../../components/admin/dashboard/dashboardBody";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
//   useEffect(() => {
//     if (!localStorage.getItem("userInfo")) {
//       navigate("/login");
//     }
//   });
  return (
    <div id="wrapper">
      <Side />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Top />
          <CustomBody></CustomBody>
        </div>
      </div>
    </div>
  );
}
