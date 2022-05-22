import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/male1.svg";
import image2 from "../../assets/male2.svg";
import image3 from "../../assets/female1.svg";
import image4 from "../../assets/female2.svg";

export default function AdminNavbars() {
	const [name, setName] = useState("");
	return (
		<nav class="navbar navbar-expand-lg navbar-light bg-white topbar mb-4 shadow border-0 py-0">
			<button
				class="btn-link d-md-none ml-auto border-0 bg-transparent"
				type="button"
				data-toggle="collapse"
				data-target="#topNavbar"
				aria-controls="topNavbar"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<i class="fa fa-bars"></i>
			</button>

			<div class="collapse navbar-collapse bg-white" id="topNavbar">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item dropdown no-arrow mx-1">
						<a
							class="nav-link dropdown-toggle"
							href="#"
							id="navbarDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<i className="fas fa-bell fa-fw"></i>{" "}
							<span class="badge badge-danger badge-counter">3+</span>
						</a>
						<div
							className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="alertsDropdown"
						>
							<h6 className="dropdown-header">Alerts Center</h6>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="mr-3">
									<div className="icon-circle bg-primary">
										<i className="fas fa-file-alt text-white"></i>
									</div>
								</div>
								<div>
									<div className="small text-gray-500">May 19, 2022</div>
									<span className="font-weight-bold">
										A new account has been generated!
									</span>
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="mr-3">
									<div className="icon-circle bg-success">
										<i className="fas fa-donate text-white"></i>
									</div>
								</div>
								<div>
									<div className="small text-gray-500">May 20, 2022</div>
									Rs: 20,000 has been deposited into account
									PK36SCBL0000001123456702
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="mr-3">
									<div className="icon-circle bg-warning">
										<i className="fas fa-exclamation-triangle text-white"></i>
									</div>
								</div>
								<div>
									<div className="small text-gray-500">May 18, 2022</div>
									Unauthorised user tried to withdraw cash.
								</div>
							</a>
							{/* <a
								className="dropdown-item text-center small text-gray-500"
								href="#"
							>
								Show All Alerts
							</a> */}
						</div>
					</li>
					<li className="nav-item dropdown no-arrow mx-1">
						<a
							className="nav-link dropdown-toggle"
							href="#"
							id="messagesDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<i className="fas fa-envelope fa-fw"></i>
							<span className="badge badge-danger badge-counter">7</span>
						</a>

						<div
							className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="messagesDropdown"
						>
							<h6 className="dropdown-header">Message Center</h6>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="dropdown-list-image mr-3">
									<img className="rounded-circle" src={image1} alt="..." />
									<div className="status-indicator bg-success"></div>
								</div>
								<div className="font-weight-bold">
									<div className="text-truncate">
										Hi there! I am wondering if you can help me with a problem
										I've been having.
									</div>
									<div className="small text-gray-500">Basim Ayub · 58m</div>
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="dropdown-list-image mr-3">
									<img className="rounded-circle" src={image2} alt="..." />
									<div className="status-indicator"></div>
								</div>
								<div>
									<div className="font-weight-bold">
										<div className="text-truncate">
											How to upload torn cheque?
										</div>
									</div>
									<div className="small text-gray-500">Rehan Ashraf · 1d</div>
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="dropdown-list-image mr-3">
									<img className="rounded-circle" src={image3} alt="..." />
									<div className="status-indicator bg-warning"></div>
								</div>
								<div>
									<div className="font-weight-bold">
										<div className="text-truncate">
											Where to get my cheque book?
										</div>
									</div>
									<div className="small text-gray-500">Ali Zafar · 2d</div>
								</div>
							</a>
							<a className="dropdown-item d-flex align-items-center" href="#">
								<div className="dropdown-list-image mr-3">
									<img className="rounded-circle" src={image4} alt="..." />
									<div className="status-indicator bg-success"></div>
								</div>
								<div>
									<div className="font-weight-bold">
										<div className="text-truncate">
											How to apply for ATM card?
										</div>
									</div>
									<div className="small text-gray-500">Junaid Khan · 2w</div>
								</div>
							</a>
							{/* <a
								className="dropdown-item text-center small text-gray-500"
								href="#"
							>
								Read More Messages
							</a> */}
						</div>
					</li>
					<div className="topbar-divider d-none d-sm-block"></div>

					<li className="nav-item dropdown no-arrow">
						<a
							className="nav-link dropdown-toggle"
							href="#"
							id="userDropdown"
							role="button"
							data-toggle="dropdown"
							aria-haspopup="true"
							aria-expanded="false"
						>
							<span className="mr-2 d-none d-lg-inline text-gray-600 small">
								{name}
							</span>
							<img className="img-profile rounded-circle" src={image1} />
						</a>

						<div
							className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
							aria-labelledby="userDropdown"
						>
							<Link to="/cashier/profile" className="dropdown-item">
								<i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
								Profile
							</Link>
							<div className="dropdown-divider"></div>
							{/* <Link
								to="/cashier/Customers"
								className="dropdown-item"
								data-toggle="modal"
								data-target="#logoutModal"
							>
								<i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
								Logout
							</Link> */}
							<a
								className="dropdown-item"
								href="#"
								data-toggle="modal"
								data-target="#logoutModal"
							>
								<i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
								Logout
							</a>
						</div>
					</li>
				</ul>
			</div>
			{/* <!-- Logout Modal--> */}
			<div
				class="modal fade"
				id="logoutModal"
				tabindex="-1"
				role="dialog"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">
								Ready to Leave?
							</h5>
							<button
								class="close"
								type="button"
								data-dismiss="modal"
								aria-label="Close"
							>
								<span aria-hidden="true">×</span>
							</button>
						</div>
						<div class="modal-body">
							Select "Logout" below if you are ready to end your current
							session.
						</div>
						<div class="modal-footer">
							<button
								class="btn btn-secondary"
								type="button"
								data-dismiss="modal"
							>
								Cancel
							</button>
							<a class="btn btn-primary" href="/login">
								Logout
							</a>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
