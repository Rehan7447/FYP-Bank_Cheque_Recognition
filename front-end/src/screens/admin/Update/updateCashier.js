import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/header/adminHeader";
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
			navigate("/admin");
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
		<div className="login-body">
			<Header />
			{message && <ErrorMessage variant="danger"> {message} </ErrorMessage>}
			{error && <ErrorMessage variant="danger"> Error </ErrorMessage>}
			{loading && <Loading />}
			<div className="container h-100">
				<div className="row login-form-area">
					<div className="col-xl-6">
						<div className="login-form-input-content">
							<div className="login-card mb-0">
								<div className="login-card-body">
									<h4 className="text-center">Edit Profile</h4>
									<form className="login-input" onSubmit={submitHandler}>
										<div
											className="login-form-group"
											style={{
												textAlign: "center",
											}}
										>
											<img
												src={pic}
												alt="User Profile"
												style={{
													width: "150px",
													height: "150px",
													borderRadius: "50%",
												}}
											/>
											<br></br>
											<br></br>
											<label
												htmlFor="image"
												className="btn login-form-btn submit w-10"
												style={{
													padding: "10px 10px",
												}}
											>
												Change Profile Picture
											</label>
											<input
												style={{
													color: "rgba(0, 0, 0, 0)",
													visibility: "hidden",
												}}
												className="login-form-control"
												type={"file"}
												id="image"
												accept="image/png,image/PMG, image/jpeg, image/jfif, image/JPG,image/jpg"
												onChange={(e) => postDetails(e.target.files[0])}
											/>
										</div>
										<div className="login-form-group">
											<label htmlFor="name">Name:</label>
											<br></br>
											<input
												type="name"
												className="login-form-control bg-secondary"
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
												className="login-form-control bg-secondary"
												placeholder="Name"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<label htmlFor="phoneNumber">Contact No:</label>
											<input
												type="tel"
												className="login-form-control bg-secondary"
												placeholder="Contact No."
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<label htmlFor="Address">Address:</label>
											<input
												type="text"
												className="login-form-control bg-secondary"
												placeholder="Address"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<label htmlFor="CNIC">CNIC:</label>
											<br></br>
											<input
												type="CNIC"
												className="login-form-control bg-secondary"
												placeholder="CNIC"
												value={CNIC}
												onChange={(e) => setCNIC(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<label htmlFor="dob">Date of Birth:</label>
											<br></br>
											<input
												type="dob"
												className="login-form-control bg-secondary"
												placeholder="Date of Birth"
												value={dob}
												onChange={(e) => setDob(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<label htmlFor="salary">Salary:</label>
											<br></br>
											<input
												type="salary"
												className="login-form-control bg-secondary"
												placeholder="Salary"
												value={salary}
												onChange={(e) => setSalary(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<label htmlFor="designation">Designation:</label>
											<br></br>
											<input
												type="designation"
												className="login-form-control bg-secondary"
												placeholder="Designation"
												value={designation}
												onChange={(e) => setDesignation(e.target.value)}
											/>
										</div>
										{/* <div className="login-form-group">
											<label htmlFor="password">password:</label>
											<br></br>
											<input
												type="password"
												className="login-form-control bg-secondary"
												placeholder="password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div> */}
										<div
											className="login-form-group"
											style={{ textAlign: "center" }}
										>
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
	);
}
