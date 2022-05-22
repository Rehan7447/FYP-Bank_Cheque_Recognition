import React from "react";
import Side from "../../components/cashier/sideNav";
import Top from "../../components/cashier/topNav";
import ErrorTable from "../../components/cashier/errorTable";
import CustomBody from "../../components/cashier/dashboard/dashboardBody";

export default function CashierDashboard() {
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
