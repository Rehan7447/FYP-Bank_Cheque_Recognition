import React, { useEffect, useState } from "react";
import "./adminBody.css";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function EmployeeTable() {
	const [, setLoading] = useState(false);
	const [, setError] = useState(false);
	const [employees, setEmployees] = useState([]);
	const fetchEmployees = async () => {
		const { data } = await axios.get(`/admin/employees`);
		setEmployees(data);
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
				await axios.delete(`/admin/deleteEmployee/${id}`, config);
				setLoading(false);
				window.location.reload(false);
			} catch (error) {
				setError(error.response.data.message);
			}
		}
	};
	useEffect(() => {
		fetchEmployees();
	}, []);
	return (
		<div className="row table-row">
			<div className="col-md-12">
				<div className="card">
					<div className="card-body">
						<div className="card-title">
							<h3>Employees</h3>
						</div>
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th>S.No.</th>
										<th>Profile Pic</th>
										<th>Name</th>
										<th>Email</th>
										<th>Phone No</th>
										<th>Address</th>
										<th>CNIC</th>
										<th>DOB</th>
										<th>Designation</th>
										<th>Role</th>
										<th>Status</th>
										<th>Joining Date</th>
										<th>Salary</th>
										<th>Operation</th>
									</tr>
								</thead>
								<tbody>
									{employees.map((employee, i) => (
										<tr key={employee._id}>
											<th>{i + 1}</th>
											<td>
												<img
													src={employee.user.pic}
													alt="Profile Pic of Cashier"
													style={{
														width: "50px",
														height: "50px",
														borderRadius: "50%",
													}}
												/>
											</td>
											<td>{employee.user.name}</td>
											<td>{employee.user.email}</td>
											<td>{employee.user.phoneNumber}</td>
											<td>{employee.user.address}</td>
											<td>{employee.user.CNIC}</td>
											<td>{employee.user.dob}</td>
											<td>{employee.designation}</td>
											<td>{employee.role}</td>
											<td>
												<span className="badge badge-success px-2 py-1">
													Present
												</span>
											</td>
											<td>{employee.createdAt}</td>
											<td>{employee.salary}</td>
											<td style={{ textAlign: "center" }}>
												<Button
													variant="secondary"
													className="mx-1"
													href={`admin/updateEmployee/${employee._id}`}
												>
													<i
														className="fas fa-eye"
														style={{ color: "black" }}
													></i>
												</Button>
												<Button
													variant="danger"
													className="mx-1"
													onClick={() => deleteHandler(employee._id)}
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
