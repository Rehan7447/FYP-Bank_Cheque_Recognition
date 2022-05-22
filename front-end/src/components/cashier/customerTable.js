import React, { useEffect, useState } from "react";
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
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th className="m-0 font-weight-bold text-primary">S.No.</th>
						<th className="m-0 font-weight-bold text-primary">Profile</th>
						<th className="m-0 font-weight-bold text-primary">Account No</th>
						<th className="m-0 font-weight-bold text-primary">Name</th>
						<th className="m-0 font-weight-bold text-primary">Contact</th>
						<th className="m-0 font-weight-bold text-primary">CNIC</th>
						<th className="m-0 font-weight-bold text-primary">DOB</th>
						<th className="m-0 font-weight-bold text-primary">Status</th>
						<th className="m-0 font-weight-bold text-primary">
							Account Opened
						</th>
						<th className="m-0 font-weight-bold text-primary">Balance</th>
						<th className="m-0 font-weight-bold text-primary">Operation</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((customer, i) => (
						<tr key={customer._id}>
							<th className="m-0 font-weight-bold text-primary">{i + 1}</th>
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
							<td>{customer.phoneNumber}</td>
							<td>{customer.CNIC}</td>
							<td>{customer.dob}</td>
							<td>
								<span className="badge badge-primary px-2 py-1">Active</span>
							</td>
							<td>{customer.createdAt}</td>
							<td>Rs: 211,356.0</td>
							<td style={{ textAlign: "center" }}>
								<Button
									className="mx-1 bg-gray-500 border-0"
									href={`admin/updateCustomer/${customer._id}`}
								>
									<i className="fas fa-eye" style={{ color: "black" }}></i>
								</Button>
								<Button
									variant="danger"
									className="mx-1 border-0"
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
	);
}
