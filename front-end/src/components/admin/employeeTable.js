import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
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
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th className="m-0 font-weight-bold text-primary">S.No.</th>
						<th className="m-0 font-weight-bold text-primary">Name</th>
						<th className="m-0 font-weight-bold text-primary">Profile Pic</th>
						<th className="m-0 font-weight-bold text-primary">Phone No</th>
						<th className="m-0 font-weight-bold text-primary">CNIC</th>
						<th className="m-0 font-weight-bold text-primary">DOB</th>
						<th className="m-0 font-weight-bold text-primary">Designation</th>
						<th className="m-0 font-weight-bold text-primary">Status</th>
						<th className="m-0 font-weight-bold text-primary">Joining Date</th>
						<th className="m-0 font-weight-bold text-primary">Salary</th>
						<th className="m-0 font-weight-bold text-primary">Operation</th>
					</tr>
				</thead>
				<tbody>
					{employees.map((employee, i) => (
						<tr key={employee._id}>
							<th className="m-0 font-weight-bold text-primary">{i + 1}</th>
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
							<td>{employee.user.phoneNumber}</td>
							<td>{employee.user.CNIC}</td>
							<td>{employee.user.dob}</td>
							<td>{employee.designation}</td>
							<td>
								<span className="badge badge-success px-2 py-1">Present</span>
							</td>
							<td>{employee.createdAt}</td>

							<td>
								<CurrencyFormat
									value={employee.salary}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"Rs: "}
								/>
							</td>
							<td style={{ textAlign: "center" }}>
								<Button
									className="mx-1 bg-gray-500 border-0"
									href={`admin/updateEmployee/${employee._id}`}
								>
									<i className="fas fa-eye" style={{ color: "black" }}></i>
								</Button>
								<Button
									variant="danger"
									className="mx-1 border-0"
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
	);
}
