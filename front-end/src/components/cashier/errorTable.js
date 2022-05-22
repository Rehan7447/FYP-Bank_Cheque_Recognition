import React, { useEffect, useState } from "react";
// import CurrencyFormat from "react-currency-format";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function ErrorTable() {
	const [, setLoading] = useState(false);
	const [, setError] = useState(false);
	const [cheques, setCheques] = useState([]);

	const fetchCheques = async () => {
		const { data } = await axios.get(`/admin/cheques`);
		setCheques(data);
	};

	const ZoomIt = (i) => {
		if (
			document.fullscreenElement != null ||
			document.webkitFullscreenElement != null
		) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else {
				document.webkitCancelFullScreen();
			}
		}

		// (B2) ENTER FULLSCREEN
		else {
			if (i.requestFullscreen) {
				i.requestFullscreen();
			} else {
				i.webkitRequestFullScreen();
			}
		}
	};

	const resolveHandler = async (e, id) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			setLoading(true);
			axios.put(
				"/users/updateChequeTransaction/" + id,
				{
					status: "pending",
				},
				config
			);

			try {
				const config = {
					headers: {
						"Content-type": "application/json",
					},
				};
				const { data } = await axios.post(
					"/users/createPin",
					{ id: id },
					config
				);
				console.log(data);
			} catch (error) {}

			setLoading(false);
			window.location.reload(false);
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	const rejectHandler = async (e, id) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};
			setLoading(true);
			axios.put(
				"/users/updateChequeTransaction/" + id,
				{
					status: "rejected",
				},
				config
			);
			setLoading(false);
			window.location.reload(false);
		} catch (error) {
			setError(error.response.data.message);
		}
	};

	useEffect(() => {
		fetchCheques();
	}, []);

	return (
		<div className="table-responsive">
			<table className="table">
				<thead>
					<tr>
						<th className="m-0 font-weight-bold text-primary">S.No.</th>
						<th className="m-0 font-weight-bold text-primary">Image</th>
						<th className="m-0 font-weight-bold text-primary">Date</th>
						<th className="m-0 font-weight-bold text-primary">Time</th>
						<th className="m-0 font-weight-bold text-primary">
							Account Number
						</th>
						<th className="m-0 font-weight-bold text-primary">Cheque Number</th>
						<th className="m-0 font-weight-bold text-primary">Amount</th>
						<th className="m-0 font-weight-bold text-primary">Fee</th>
						<th className="m-0 font-weight-bold text-primary">Status</th>
						<th className="m-0 font-weight-bold text-primary">Action</th>
					</tr>
				</thead>
				<tbody>
					{cheques.map((transaction, i) => (
						<tr key={transaction._id}>
							<th className="m-0 font-weight-bold text-primary">{i + 1}</th>
							<td>
								<img
									onClick={(e) => {
										ZoomIt(e.target);
									}}
									src={transaction.chequeImage}
									alt="Cheque image"
									style={{
										width: "50px",
										height: "50px",
									}}
								/>
							</td>
							<td>{transaction.createdAt.substring(0, 10)}</td>
							<td>{transaction.createdAt.substring(11, 19)}</td>
							<td>{transaction.holderAccountNumber}</td>
							<td>{transaction.chequeNumber}</td>
							<td>{transaction.amount} Rs</td>
							<td>10 Rs</td>
							<td>
								<span
									className={
										transaction.status === "error"
											? "badge px-2 py-1 badge-danger"
											: "badge px-2 py-1 badge-success"
									}
								>
									{transaction.status}
								</span>
							</td>
							{transaction.status === "error" ? (
								<td>
									<Button
										variant="primary"
										className="mx-1 border-0"
										onClick={(e) => {
											resolveHandler(e, transaction._id);
										}}
									>
										<i class="fas fa-solid fa-check"></i>
									</Button>

									<Button
										variant="danger"
										className="mx-1 border-0"
										onClick={(e) => {
											rejectHandler(e, transaction._id);
										}}
									>
										<i class="fa fa-ban" aria-hidden="true"></i>
									</Button>
								</td>
							) : (
								""
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
