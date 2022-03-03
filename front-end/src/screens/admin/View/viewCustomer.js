import React from "react";
import Header from "../../../components/header/adminHeader";
import CustomerTable from "../../../components/admin/customerTable";
import "../adminBody.css";

export default function AdminViewCustomer() {
	return (
		<div>
			<Header />
			<CustomerTable />
		</div>
	);
}
