import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrencyFormat from "react-currency-format";
import Chart from "../chart";
import EmployeeTable from "../employeeTable";
import CustomerTable from "../customerTable";
import CashierTable from "../cashierTable";
import ErrorTable from "../errorTable";
import PieChart from "../piechart";

export default function Dashboard() {
	const [cheques, setCheques] = useState([]);
	const [employees, setEmployees] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [errors, setErrors] = useState([]);
	const [salaries, setSalaries] = useState();
	const [pending, setPending] = useState();
	const fetchCheques = async () => {
		const { data } = await axios.get(`/admin/cheques`);
		setCheques(data);
		var total = 0;
		data.map((cheque) => {
			if (cheque.status == "pending") total++;
		});
		setPending(total);
	};
	const fetchEmployees = async () => {
		const { data } = await axios.get(`/admin/employees`);
		// setEmployees(data);
		var total = 0;
		data.map((employee) => (total = total + employee.salary));
		setSalaries(total);
	};
	const fetchErrors = async () => {
		const { data } = await axios.get(`/admin/errors`);
		setErrors(data);
	};
	const fetchCustomers = async () => {
		const { data } = await axios.get(`/admin/customers`);
		setCustomers(data);
	};
	useEffect(() => {
		fetchCheques();
		fetchEmployees();
		fetchErrors();
		fetchCustomers();
	}, []);
	return (
		<div>
			<div className="container-fluid">
				<div className="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
				</div>

				<div className="row">
					<div className="col-xl-3 col-md-6 mb-4">
						<div className="card border-left-primary shadow h-100 py-2">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
											Cheques Processed
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{cheques.length}
										</div>
									</div>
									<div className="col-auto">
										<i class="fas fa-solid fa-check fa-2x text-gray-300"></i>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-3 col-md-6 mb-4">
						<div className="card border-left-success shadow h-100 py-2">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-success text-uppercase mb-1">
											Salaries (Monthly)
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											<CurrencyFormat
												value={salaries}
												displayType={"text"}
												thousandSeparator={true}
												prefix={"Rs: "}
											/>
											{/* {salaries} */}
										</div>
									</div>
									<div className="col-auto">
										<i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-3 col-md-6 mb-4">
						<div className="card border-left-info shadow h-100 py-2">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-info text-uppercase mb-1">
											Cutomers
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{customers.length}
										</div>
									</div>
									<div className="col-auto">
										<i class="fa fa-users fa-2x text-gray-300"></i>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-3 col-md-6 mb-4">
						<div className="card border-left-warning shadow h-100 py-2">
							<div className="card-body">
								<div className="row no-gutters align-items-center">
									<div className="col mr-2">
										<div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
											Pending Requests
										</div>
										<div className="h5 mb-0 font-weight-bold text-gray-800">
											{pending}
										</div>
									</div>
									<div className="col-auto">
										<i class="fas fa-solid fa-hourglass fa-2x text-gray-300"></i>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-xl-8 col-lg-7">
						<div className="card shadow mb-4">
							<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
								<h6 className="m-0 font-weight-bold text-primary">
									Transactions Overview
								</h6>
							</div>

							<div className="card-body">
								<div className="chart-area">
									<Chart chartType="line" />
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-4 col-lg-5">
						<div className="card shadow mb-4">
							<div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
								<h6 className="m-0 font-weight-bold text-primary">
									Revenue Sources
								</h6>
							</div>

							<div className="card-body">
								<div className="chart-pie pt-4 pb-2">
									<PieChart />
								</div>
								<div className="mt-4 text-center small">
									<span className="mr-2">
										<i className="fas fa-circle text-primary"></i> Direct
									</span>
									<span className="mr-2">
										<i className="fas fa-circle text-success"></i> Social
									</span>
									<span className="mr-2">
										<i className="fas fa-circle text-info"></i> Referral
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-xl-4 col-lg-5">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h6 className="m-0 font-weight-bold text-primary">
									Pending Requests
								</h6>
							</div>
							<div className="card-body">
								<h4 className="small font-weight-bold">
									Error ratio
									<span className="float-right">
										{(cheques.length / pending) * 100}%
									</span>
								</h4>
								<div className="progress mb-4">
									<div
										className="progress-bar progress-bar-striped bg-danger"
										role="progressbar"
										style={{
											width: `${pending}%`,
										}}
										aria-valuenow="20"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<h4 className="small font-weight-bold">
									Pending <span className="float-right">{pending * 100}%</span>
								</h4>
								<div className="progress mb-4">
									<div
										className="progress-bar progress-bar-striped bg-warning"
										role="progressbar"
										style={{
											width: `${pending}%`,
										}}
										aria-valuenow="40"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
								<h4 className="small font-weight-bold">
									Completed <span className="float-right">100%</span>
								</h4>
								<div className="progress mb-4">
									<div
										className="progress-bar progress-bar-striped"
										role="progressbar"
										style={{
											width: `${errors.length}%`,
										}}
										aria-valuenow="60"
										aria-valuemin="0"
										aria-valuemax="100"
									></div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-8 col-lg-7">
						<div className="card shadow mb-4">
							<div className="card-header py-3">
								<h6 className="m-0 font-weight-bold text-primary">
									Transactions Overview
								</h6>
							</div>
							<div className="card-body">
								<div className="chart-area">
									<Chart chartType="bar" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h6 className="m-0 font-weight-bold text-primary">Employees</h6>
					</div>
					<div className="card-body">
						<EmployeeTable />
					</div>
				</div>
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h6 className="m-0 font-weight-bold text-primary">Customers</h6>
					</div>
					<div className="card-body">
						<CustomerTable />
					</div>
				</div>
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h6 className="m-0 font-weight-bold text-primary">Cashiers</h6>
					</div>
					<div className="card-body">
						<CashierTable />
					</div>
				</div>
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h6 className="m-0 font-weight-bold text-primary">
							Transaction Requests
						</h6>
					</div>
					<div className="card-body">
						<ErrorTable />
					</div>
				</div>

				<footer className="sticky-footer bg-white">
					<div className="container my-auto">
						<div className="copyright text-center my-auto">
							<span>Copyright &copy; Bank App 2022</span>
						</div>
					</div>
				</footer>
			</div>
		</div>
	);
}
