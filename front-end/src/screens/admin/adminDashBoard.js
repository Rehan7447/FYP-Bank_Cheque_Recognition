import React from "react";
import "../../components/admin/dashboard/dashboard.css"
import Side from "../../components/admin/sideNav";
import Top from "../../components/admin/topNav";
import ErrorTable from "../../components/admin/errorTable";
import CustomBody from "../../components/admin/dashboard/dashboardBody";

export default function AdminDashboard() {
	return (
		<div id="wrapper">
			<Side />
			<div id="content-wrapper" class="d-flex flex-column">
				<div id="content">
					<Top />
					{/* <ErrorTable></ErrorTable> */}
					<CustomBody></CustomBody>
				</div>
			</div>
		</div>
	);
}
