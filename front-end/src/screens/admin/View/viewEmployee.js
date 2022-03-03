import React from "react";
import Header from "../../../components/header/adminHeader";
import EmployeeTable from "../../../components/admin/employeeTable";
import "../adminBody.css";

export default function AdminViewEmployee() {
	return (
		<div>
			<Header />
			<EmployeeTable />
		</div>
	);
}
