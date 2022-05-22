import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function CashierTable() {
	// const navigate = useNavigate();
	const [cashiers, setCashiers] = useState([]);
	const [, setLoading] = useState(false);
	const [, setError] = useState(false);
	const fetchCashiers = async () => {
		const { data } = await axios.get(`/admin/cashiers`);
		setCashiers(data);
	};
	useEffect(() => {
		fetchCashiers();
	}, []);

	const deleteHandler = async (id) => {
		if (window.confirm("Are you sure you want to delete this?")) {
			try {
				const config = {
					headers: {
						"content-type": "application/json",
					},
				};
				setLoading(true);
				await axios.delete(`/admin/deleteCashier/${id}`, config);
				setLoading(false);
				window.location.reload(false);
			} catch (error) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th className="m-0 font-weight-bold text-primary">S.No.</th>
						<th className="m-0 font-weight-bold text-primary">Profile Pic</th>
						<th className="m-0 font-weight-bold text-primary">Name</th>
						<th className="m-0 font-weight-bold text-primary">Phone No</th>
						<th className="m-0 font-weight-bold text-primary">CNIC</th>
						<th className="m-0 font-weight-bold text-primary">DOB</th>
						<th className="m-0 font-weight-bold text-primary">Status</th>
						<th className="m-0 font-weight-bold text-primary">Joining Date</th>
						<th className="m-0 font-weight-bold text-primary">Salary</th>
						<th className="m-0 font-weight-bold text-primary">Operation</th>
					</tr>
				</thead>
				<tbody>
					{cashiers.map((cashier, i) => (
						<tr key={cashier._id}>
							<th className="m-0 font-weight-bold text-primary">{i + 1}</th>
							<td>
								<img
									src={cashier.user.pic}
									alt="Profile Pic of Cashier"
									style={{
										width: "50px",
										height: "50px",
										borderRadius: "50%",
									}}
								/>
							</td>
							<td>{cashier.user.name}</td>
							<td>{cashier.user.phoneNumber}</td>
							<td>{cashier.user.CNIC}</td>
							<td>{cashier.user.dob}</td>
							<td>
								<span className="badge badge-success px-2 py-1">Present</span>
							</td>
							<td>{cashier.createdAt.substring(0, 10)}</td>
							<td>
								<CurrencyFormat
									value={cashier.salary}
									displayType={"text"}
									thousandSeparator={true}
									prefix={"Rs: "}
								/>
							</td>
							<td style={{ textAlign: "center" }}>
								<Button
									className="mx-1 bg-gray-500 border-0"
									href={`admin/updateCashier/${cashier._id}`}
								>
									<i className="fas fa-eye" style={{ color: "black" }}></i>
								</Button>
								<Button
									variant="danger"
									className="mx-1 border-0"
									onClick={() => deleteHandler(cashier._id)}
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
