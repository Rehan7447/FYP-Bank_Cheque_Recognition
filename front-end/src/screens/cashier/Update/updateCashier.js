import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate, useParams } from "react-router-dom";
import Side from "../../../components/cashier/sideNav";
import Top from "../../../components/cashier/topNav";
import ErrorMessage from "../../../components/errorMessage";
import axios from "axios";
import Loading from "../../../components/loading";

export default function AdminAddCashier() {
	const navigate = useNavigate();
	const [pic, setPic] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [CNIC, setCNIC] = useState("");
	const [dob, setDob] = useState("");
	const [salary, setSalary] = useState("");
	const [designation, setDesignation] = useState("");

	// Extract id of user from url
	const { id } = useParams();

	const [message] = useState(null);
	const [, setPicMessage] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const config = {
				headers: {
					"Content-type": "application/json",
				},
			};

			setLoading(true);
			const { data } = await axios.put(
				`/admin/updateCashier/${id}`,
				{
					pic,
					name,
					email,
					phoneNumber,
					address,
					CNIC,
					dob,
					designation,
					salary,
				},
				config
			);
			setLoading(false);
			localStorage.setItem("userInfo", JSON.stringify(data));
			navigate("/cashier");
		} catch (error) {
			setError(error.ErrorMessage);
		}
	};

	const postDetails = (pics) => {
		if (!pics) {
			return setPicMessage("Please Select an image");
		}
		setPicMessage(null);
		const data = new FormData();
		data.append("file", pics);
		data.append("upload_preset", "userAuth");
		data.append("cloud_name", "dxrrifozh");
		fetch("https://api.cloudinary.com/v1_1/dxrrifozh/upload", {
			method: "post",
			body: data,
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data.url.toString());
				setPic(data.url.toString());
			})
			.catch((err) => {
				console.log("Error is: ".error);
			});
	};

	useEffect(() => {
		const fetchCashierWithId = async () => {
			const { data } = await axios.get(`/admin/cashier/${id}`);
			setPic(data.user.pic);
			setName(data.user.name);
			setEmail(data.user.email);
			setPhoneNumber(data.user.phoneNumber);
			setAddress(data.user.address);
			setCNIC(data.user.CNIC);
			setDob(data.user.dob);
			setSalary(data.salary);
			setDesignation(data.designation);
		};
		fetchCashierWithId();
	}, [id]);

	return (
		<div id="wrapper">
			<Side />
			<div id="content-wrapper" class="d-flex flex-column">
				<div id="content">
					<Top />
					<div className="container-fluid">
						<div className="d-sm-flex align-items-center justify-content-between mb-4">
							<h1 className="h3 mb-0 text-gray-800">Edit Cashier</h1>
						</div>
						<div>
							<div className="row">
								<div className="col-xl-12 col-md-12 mb-4">
									<div className="card border-primary shadow h-100 py-2">
										<div className="card-body justify-content-center align-items-center">
											{message && (
												<ErrorMessage variant="danger">
													{" "}
													{message}{" "}
												</ErrorMessage>
											)}
											{error && (
												<ErrorMessage variant="danger"> Error </ErrorMessage>
											)}
											{loading && <Loading />}
											<div className="login-form-input-content">
												<div className="login-card mb-0">
													<div className="login-card-body">
														<form
															className="login-input"
															onSubmit={submitHandler}
														>
															<div className="row">
																<div className="col-md-6 m-auto">
																	<div className="login-form-group text-center">
																		<img
																			className="img-fluid img-thumbnail rounded-lg"
																			src={pic}
																			alt="User Profile"
																			style={{ height: "50%", width: "50%" }}
																		/>
																		<br></br>
																		<br></br>
																		<label
																			htmlFor="image"
																			className="btn login-form-btn submit p-2"
																		>
																			Upload Profile Picture
																		</label>
																		<input
																			style={{
																				color: "rgba(0, 0, 0, 0)",
																				visibility: "hidden",
																			}}
																			className="login-form-control px-3"
																			type={"file"}
																			id="image"
																			accept="image/png, image/jpeg, image/jfif, image/JPG"
																			onChange={(e) =>
																				postDetails(e.target.files[0])
																			}
																		/>
																	</div>
																</div>
																<div className="col-md-6">
																	<div className="login-form-group">
																		<label for="name">Name:</label>
																		<br />
																		<input
																			type="text"
																			placeholder="Name"
																			value={name}
																			class="login-form-control px-3 bg-secondary"
																			onChange={(e) => setName(e.target.value)}
																		/>
																	</div>
																	<div className="login-form-group">
																		<label for="email">Email:</label>
																		<br />
																		<input
																			type="text"
																			placeholder="Email"
																			value={email}
																			class="login-form-control px-3 bg-secondary"
																			onChange={(e) => setEmail(e.target.value)}
																		/>
																	</div>
																	<div className="login-form-group">
																		<label for="contact">Contact No:</label>
																		<br />
																		<CurrencyFormat
																			className="login-form-control px-3 bg-secondary"
																			placeholder="Contact No."
																			value={phoneNumber}
																			format="+92 (###) #######"
																			mask="_"
																			onChange={(e) =>
																				setPhoneNumber(e.target.value)
																			}
																		/>
																	</div>
																	<div className="login-form-group">
																		<label for="address">Address:</label>
																		<br />
																		<input
																			type="text"
																			class="login-form-control px-3 bg-secondary"
																			value={address}
																			placeholder="Address"
																			onChange={(e) =>
																				setAddress(e.target.value)
																			}
																		/>
																	</div>
																	<div className="login-form-group">
																		<label for="CNIC">CNIC:</label>
																		<br />

																		<CurrencyFormat
																			className="login-form-control px-3 bg-secondary"
																			placeholder="CNIC"
																			value={CNIC}
																			format="#####-#######-#"
																			mask="_"
																			onChange={(e) => setCNIC(e.target.value)}
																		/>
																	</div>
																	<div className="login-form-group">
																		<label for="DOB">Date of Birth:</label>
																		<br />
																		<input
																			type="date"
																			class="login-form-control px-3 bg-secondary"
																			placeholder="Date of Birth"
																			value={dob}
																			onChange={(e) => setDob(e.target.value)}
																		/>
																	</div>
																	<div className="login-form-group">
																		<label for="salary">Salary:</label>
																		<br />
																		<CurrencyFormat
																			type="salary"
																			className="login-form-control px-3 bg-secondary"
																			thousandSeparator={true}
																			prefix={"RS: "}
																			placeholder="Salary"
																			value={salary}
																			onChange={(e) => {
																				setSalary(
																					parseInt(
																						e.target.value
																							.replace(/,/g, "")
																							.slice(4, e.target.value.length)
																					)
																				);
																			}}
																		/>
																	</div>
																	<div className="login-form-group">
																		<label for="deeignation">
																			Designation:
																		</label>
																		<br />
																		<input
																			type="text"
																			class="login-form-control px-3 bg-secondary"
																			value={designation}
																			onChange={(e) =>
																				setDesignation(e.target.value)
																			}
																		/>
																	</div>
																</div>
																<div className="login-form-group text-center">
																	<button
																		className="btn login-form-btn submit w-50"
																		type="submit"
																	>
																		Update Cashier
																	</button>
																</div>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
