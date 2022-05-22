import React from "react";
import { Link } from "react-router-dom"

export default function CahierNavbars() {
	return (
		<ul
			className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
			id="accordionSidebar"
		>
			<Link
				to="/cashier"
				className="sidebar-brand d-flex align-items-center justify-content-center"
			>
				<div className="sidebar-brand-icon">
					<i className="fas fa-university"></i>
				</div>
				<div className="sidebar-brand-text mx-3">Bank App</div>
			</Link>

			<hr className="sidebar-divider my-0" />

			<li className="nav-item active">
				<Link to="/cashier" className="nav-link">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>Dashboard</span>
				</Link>
			</li>

			<hr className="sidebar-divider" />

			<div className="sidebar-heading">View Record</div>

			<li className="nav-item">
				<a
					className="nav-link collapsed"
					href="#"
					data-toggle="collapse"
					data-target="#collapseTwo"
					aria-expanded="true"
					aria-controls="collapseTwo"
				>
					<i className="fas fa-fw fa-eye"></i>
					<span>View</span>
				</a>
				<div
					id="collapseTwo"
					className="collapse"
					aria-labelledby="headingTwo"
					data-parent="#accordionSidebar"
				>
					<div className="bg-white py-2 collapse-inner rounded">
						<h6 className="collapse-header">View Record:</h6>
						<Link to="/cashier/Customers" className="collapse-item">
							Customers
						</Link>
						<Link to="/cashier/Employees" className="collapse-item">
							Employees
						</Link>
						<Link to="/cashier/Cashiers" className="collapse-item">
							Cashiers
						</Link>
					</div>
				</div>
			</li>

			<hr className="sidebar-divider" />

			<div className="sidebar-heading">Add Record</div>

			<li className="nav-item">
				<a
					className="nav-link collapsed"
					href="#"
					data-toggle="collapse"
					data-target="#collapseUtilities"
					aria-expanded="true"
					aria-controls="collapseUtilities"
				>
					<i className="fas fa-fw fa-plus"></i>
					<span>Add</span>
				</a>
				<div
					id="collapseUtilities"
					className="collapse"
					aria-labelledby="headingUtilities"
					data-parent="#accordionSidebar"
				>
					<div className="bg-white py-2 collapse-inner rounded">
						<h6 className="collapse-header">Add Record:</h6>
						<Link to="/cashier/addCustomer" className="collapse-item">
							Customer
						</Link>
						<Link to="/cashier/addEmployee" className="collapse-item">
							Employee
						</Link>
						<Link to="/cashier/addCashier" className="collapse-item">
							Cashier
						</Link>
					</div>
				</div>
			</li>

			<div className="text-center d-none d-md-inline">
				<button
					className="rounded-circle border-0"
					id="sidebarToggle"
					// type="button"
					// data-toggle="collapse"
					// data-target="#accordionSidebar"
					// aria-controls="accordionSidebar"
					// aria-expanded="false"
					// aria-label="Toggle navigation"
				></button>
			</div>
		</ul>
	);
}
