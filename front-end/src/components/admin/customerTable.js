import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function CustomerTable() {
	const [, setLoading] = useState(false);
	const [, setError] = useState(false);
	const [customers, setCustomers] = useState([]);
	const [accounts, setAccounts] = useState([]);

	const fetchCustomers = async () => {
		const { data } = await axios.get(`/admin/accounts`);
		setAccounts(data);
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
				await axios.delete(`/admin/deleteAccount/${id}`, config);
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
					{accounts.map((account, i) => (
						<tr key={account._id}>
							<th className="m-0 font-weight-bold text-primary">{i + 1}</th>
							<td>
								<img
									src={account.accountHolder.pic}
									alt="Profile Pic of Customer"
									style={{
										width: "50px",
										height: "50px",
										borderRadius: "50%",
									}}
								/>
							</td>
							<td>{account.accountHolder.IBAN}</td>
							<td>{account.accountHolder.name}</td>
							<td>{account.accountHolder.phoneNumber}</td>
							<td>{account.accountHolder.CNIC}</td>
							<td>{account.accountHolder.dob}</td>
							<td>
								<span className="badge badge-primary px-2 py-1">Active</span>
							</td>
							<td>{account.createdAt.substring(0, 10)}</td>

							<td>{account.balance}</td>
							<td style={{ textAlign: "center" }}>
								<Button
									className="mx-1 bg-gray-500 border-0"
									href={`admin/updateCustomer/${account.accountHolder._id}`}
								>
									<i className="fas fa-eye" style={{ color: "black" }}></i>
								</Button>
								<Button
									variant="danger"
									className="mx-1 border-0"
									onClick={() => deleteHandler(account._id)}
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
