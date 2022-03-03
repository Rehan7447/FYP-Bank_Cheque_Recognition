import React, { useEffect, useState } from "react";
import "./adminBody.css";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function CustomerTable() {
	const [, setLoading] = useState(false);
	const [, setError] = useState(false);
	const [customers, setCustomers] = useState([]);

	const fetchCustomers = async () => {
		const { data } = await axios.get(`/admin/customers`);
		setCustomers(data);
	};

	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this?")) {
			try {
				const config = {
					headers: {
						"content-type": "application/json",
					},
				};
				setLoading(true);
				await axios.delete(`/admin/deleteCustomer/${id}`, config);
				setLoading(false);
				window.location.reload(false);
			} catch (error) {
				setError(error.response.data.message);
			}
		}
	};

	useEffect(() => {
		fetchCustomers();
	}, []);

	return (
		<div className="row table-row">
			<div className="col-md-12">
				<div className="card">
					<div className="card-body">
						<div className="card-title">
							<h3>Customers</h3>
						</div>
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th>S.No.</th>
										<th>Profile Pic</th>
										<th>Account No</th>
										<th>Name</th>
										<th>Email</th>
										<th>Phone No</th>
										<th>Address</th>
										<th>CNIC</th>
										<th>DOB</th>
										<th>Status</th>
										<th>Opening Date</th>
										<th>Balance</th>
										<th>Operation</th>
									</tr>
								</thead>
								<tbody>
									{customers.map((customer, i) => (
										<tr key={customer._id}>
											<th>{i + 1}</th>
											<td>
												<img
													src={customer.pic}
													alt="Profile Pic of Customer"
													style={{
														width: "50px",
														height: "50px",
														borderRadius: "50%",
													}}
												/>
											</td>
											<td>account</td>
											<td>{customer.name}</td>
											<td>{customer.email}</td>
											<td>{customer.phoneNumber}</td>
											<td>{customer.address}</td>
											<td>{customer.CNIC}</td>
											<td>{customer.dob}</td>
											<td>
												<span className="badge badge-primary px-2 py-1">
													Active
												</span>
											</td>
											<td>{customer.createdAt}</td>
											<td>Rs: 211,356.0</td>
											<td style={{ textAlign: "center" }}>
												<Button
													variant="secondary"
													className="mx-1"
													href={`admin/updateCustomer/${customer._id}`}
												>
													<i
														className="fas fa-eye"
														style={{ color: "black" }}
													></i>
												</Button>
												<Button
													variant="danger"
													className="mx-1"
													onClick={() => deleteHandler(customer._id)}
												>
													<i className="fa fa-trash"></i>
												</Button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
