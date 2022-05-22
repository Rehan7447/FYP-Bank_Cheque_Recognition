import React from "react";
import Side from "../../../components/cashier/sideNav";
import Top from "../../../components/cashier/topNav";
import EmployeeTable from "../../../components/cashier/employeeTable";

export default function AdminViewEmployee() {
	return (
		<div id="wrapper">
			<Side />
			<div id="content-wrapper" class="d-flex flex-column">
				<div id="content">
					<Top />
					<div className="container-fluid">
						<div className="d-sm-flex align-items-center justify-content-between mb-4">
							<h1 className="h3 mb-0 text-gray-800">Employees</h1>
						</div>
						<EmployeeTable />
					</div>
				</div>
			</div>
		</div>
	);
}
