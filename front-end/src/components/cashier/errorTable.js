import React from "react";
// import "./adminBody.css";
import "./dashboard/dashboard.css";

export default function errorTable() {
	return (
		<div className="row table-row">
			<div className="col-md-12">
				<div className="card">
					<div className="card-body">
						<div className="card-title">
							<h3>Errors</h3>
						</div>
						<div className="table-responsive">
							<table className="table">
								<thead>
									<tr>
										<th>#</th>
										<th>Description</th>
										<th>Time</th>
										<th>Date</th>
										<th>Status</th>
										<th>Operation</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>1</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-danger px-2 py-1">
												Pending
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>2</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-danger px-2 py-1">
												Pending
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>3</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-success px-2 py-1">
												Resolved
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>4</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-danger px-2 py-1">
												Pending
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>5</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-danger px-2 py-1">
												Pending
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>6</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-success px-2 py-1">
												Resolved
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>7</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-danger px-2 py-1">
												Pending
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>8</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-danger px-2 py-1">
												Pending
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>9</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-success px-2 py-1">
												Resolved
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>10</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-danger px-2 py-1">
												Pending
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>11</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-danger px-2 py-1">
												Pending
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
									<tr>
										<th>12</th>
										<td>Cheque Scan Failed</td>
										<td>12:56:32</td>
										<td>Jan 12, 2019</td>
										<td>
											<span className="badge badge-success px-2 py-1">
												Resolved
											</span>
										</td>
										<td>
											<i
												className="fas fa-eye"
												style={{ marginRight: "1rem" }}
											></i>
											<i className="fa fa-trash"></i>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
