import React, { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../../components/errorMessage";
import axios from "axios";
import Loading from "../../components/loading";
import UserTemplate from "./userTemplate";

export default function AdminAddCustomer() {
	const navigate = useNavigate();
	const [pic, setPic] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [CNIC, setCNIC] = useState("");
	const [dob, setDob] = useState("");

	// Extract id of user from url
	const data = JSON.parse(localStorage.getItem("userInfo"));
	const id = data._id;
	console.log(id);

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
				`/admin/updateCustomer/${id}`,
				{
					pic,
					name,
					email,
					phoneNumber,
					address,
					CNIC,
					dob,
				},
				config
			);
			setLoading(false);
			localStorage.setItem("userInfo", JSON.stringify(data));
			navigate("/user/profile");
		} catch (err) {
			setError(err.ErrorMessage);
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
				setPic(data.url.toString());
			})
			.catch((err) => {
				console.log("Error is: " + err);
			});
	};

	useEffect(() => {
		const fetchUser = async () => {
			const { data } = await axios.get(`/admin/customer/${id}`);
			setPic(data.pic);
			setName(data.name);
			setEmail(data.email);
			setPhoneNumber(data.phoneNumber);
			setAddress(data.address);
			setCNIC(data.CNIC);
			setDob(data.dob);
		};
		fetchUser();
	}, [id]);

	return (
		<UserTemplate>
			<div className="container-fluid">
				<div className="d-sm-flex align-items-center justify-content-between mb-4">
					<h1 className="h3 mb-0 text-gray-800">Profile</h1>
				</div>
				<div>
					<div className="row">
						<div className="col-xl-12 col-md-12 mb-4">
							<div className="card border-primary shadow h-100 py-2">
								<div className="card-body justify-content-center align-items-center">
									{message && (
										<ErrorMessage variant="danger"> {message} </ErrorMessage>
									)}
									{error && (
										<ErrorMessage variant="danger"> Error </ErrorMessage>
									)}
									{loading && <Loading />}
									<div className="login-form-input-content">
										<div className="login-card mb-0">
											<div className="login-card-body">
												<form className="login-input" onSubmit={submitHandler}>
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
																	Change Profile Picture
																</label>
																<input
																	style={{
																		color: "rgba(0, 0, 0, 0)",
																		visibility: "hidden",
																	}}
																	className="login-form-control px-3"
																	type={"file"}
																	id="image"
																	accept="image/png,image/PMG, image/jpeg, image/jfif, image/JPG,image/jpg"
																	onChange={(e) =>
																		postDetails(e.target.files[0])
																	}
																/>
															</div>
														</div>
														<div className="col-md-6">
															<div className="login-form-group">
																<label htmlFor="name">Name:</label>
																<br></br>
																<input
																	type="name"
																	className="login-form-control px-3 bg-secondary"
																	placeholder="Name"
																	value={name}
																	onChange={(e) => setName(e.target.value)}
																/>
															</div>
															<div className="login-form-group">
																<label htmlFor="email">Email:</label>
																<br></br>
																<input
																	type="email"
																	className="login-form-control px-3 bg-secondary"
																	placeholder="Name"
																	value={email}
																	onChange={(e) => setEmail(e.target.value)}
																/>
															</div>
															<div className="login-form-group">
																<label htmlFor="phoneNumber">Contact No:</label>
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
																<label htmlFor="Address">Address:</label>
																<input
																	type="text"
																	className="login-form-control px-3 bg-secondary"
																	placeholder="Address"
																	value={address}
																	onChange={(e) => setAddress(e.target.value)}
																/>
															</div>
															<div className="login-form-group">
																<label htmlFor="CNIC">CNIC:</label>
																<br></br>
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
																<label htmlFor="dob">Date of Birth:</label>
																<br></br>
																<input
																	type="date"
																	class="login-form-control px-3 bg-secondary"
																	placeholder="Date of Birth"
																	value={dob}
																	onChange={(e) => setDob(e.target.value)}
																/>
															</div>
														</div>
													</div>
													<div className="login-form-group text-center">
														<button
															className="btn login-form-btn submit w-50"
															type="submit"
														>
															Save Changes
														</button>
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
		</UserTemplate>
	);
}
