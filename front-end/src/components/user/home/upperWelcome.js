import React, { useState } from "react";
import Clock from "../../clock";
import "./upperWelcome.css";

function WelcomeMenu() {
	const [amount] = useState("5000");
	return (
		<div className="mainDiv">
			<div className="welcomeDiv">
				<h2>Welcome, User!</h2>
				<h5>
					<Clock />
				</h5>
			</div>
			<div className="amountDiv">
				<div className="subAmountDiv">
					<a href="/">
						<h1 className="amount">
							{amount} <span>Rs</span>{" "}
						</h1>
					</a>
					<br />
					<h5 className="balanceHeading">Current Balance</h5>
				</div>
				<div className="subMenu">
					<a href="/">Transfer History</a>
					<a href="/">Recent Cheque Deposits</a>
					<a href="/">Recent Cheque Transactions</a>
				</div>
			</div>
		</div>
	);
}

export default WelcomeMenu;
