import React from "react";
import Header from "../../../components/header/adminHeader";
import CashierTable from "../../../components/admin/cashierTable";
import "../adminBody.css";

export default function AdminViewCashier() {
	return (
		<div>
			<Header />
			<CashierTable />
		</div>
	);
}
