import React from "react";
import "./adminBody.css";
import AdminHeader from "../../components/header/adminHeader";
import CustomerTable from "../../components/admin/customerTable";
import CashierTableTable from "../../components/admin/cashierTable";
import ErrorTable from "../../components/admin/errorTable";
import EmployeeTable from "../../components/admin/employeeTable";
import ApexChart from "../../components/charts/chart";

export default function AdminDashboard() {
	return (
		<div
			style={{
				width: "100%",
				display: "inline-block",
				backgroundColor: "#F3F3F9",
			}}
		>
			<AdminHeader />
			<ApexChart />

			<CustomerTable></CustomerTable>
			<EmployeeTable></EmployeeTable>
			<CashierTableTable></CashierTableTable>
			<ErrorTable></ErrorTable>
		</div>
	);
}
