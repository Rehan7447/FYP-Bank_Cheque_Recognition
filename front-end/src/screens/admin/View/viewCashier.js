import React from "react";
import Side from "../../../components/admin/sideNav";
import Top from "../../../components/admin/topNav";
import CashierTable from "../../../components/admin/cashierTable";

export default function AdminViewCashier() {
	return (
		<div id="wrapper">
			<Side />
			<div id="content-wrapper" class="d-flex flex-column">
				<div id="content">
					<Top />
					<div className="container-fluid">
						<div className="d-sm-flex align-items-center justify-content-between mb-4">
							<h1 className="h3 mb-0 text-gray-800">Cashiers</h1>
						</div>
						<CashierTable />
					</div>
				</div>
			</div>
		</div>
	);
}
