import React from "react";
import { Link } from "react-router-dom";

export default function adminHeader() {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<Link to="/" className="navbar-brand">
				Banking System
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<Link to="/admin" className="nav-link">
							Dashboard <span className="sr-only">(current)</span>
						</Link>
					</li>
					<li className="nav-item dropdown">
						<button
							className="btn btn-secondary dropdown-toggle"
							type="button"
							id="dropdownMenuButton"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							Add
						</button>
						<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<Link to="/admin/addCustomer" className="dropdown-item">
								Customer
							</Link>
							<Link to="/admin/addEmployee" className="dropdown-item">
								Employee
							</Link>
							<Link to="/admin/addCashier" className="dropdown-item">
								Cashier
							</Link>
						</div>
					</li>
					<li className="nav-item dropdown pl-2">
						<button
							className="btn btn-secondary dropdown-toggle"
							type="button"
							id="dropdownMenuButton"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							View
						</button>
						<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<Link to="/admin/Customers" className="dropdown-item">
								Customers
							</Link>
							<Link to="/admin/Employees" className="dropdown-item">
								Employees
							</Link>
							<Link to="/admin/Cashiers" className="dropdown-item">
								Cashiers
							</Link>
						</div>
					</li>
				</ul>
				<form className="form-inline my-2 my-lg-0">
					<input
						className="form-control mr-sm-2"
						type="search"
						placeholder="Search"
						aria-label="Search"
					/>
					<button
						className="btn btn-outline-success my-2 my-sm-0"
						type="submit"
					>
						Search
					</button>
				</form>
			</div>
		</nav>
	);
}
