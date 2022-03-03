import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/header/adminHeader";
import ErrorMessage from "../../../components/errorMessage";
import axios from "axios";
import Loading from "../../../components/loading";

export default function AdminAddCashier() {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [address, setAddress] = useState("");
	const [CNIC, setCNIC] = useState("");
	const [dob, setDob] = useState("");
	const [salary, setSalary] = useState("");
	const [designation, setDesignation] = useState("");
	const [password, setPassword] = useState("");
	const [pic, setPic] = useState("");

	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);
	const [, setPicMessage] = useState(null);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			setMessage("Passwords does not match");
		} else {
			setMessage();
			try {
				const config = {
					headers: {
						"Content-type": "application/json",
					},
				};

				setLoading(true);
				// console.log(name, email, phoneNumber, address, CNIC, dob, pic,password);
				const { data } = await axios.post(
					"/admin/addCashier",
					{
						name,
						email,
						phoneNumber,
						address,
						password,
						CNIC,
						dob,
						pic,
						salary,
						designation,
					},
					config
				);
				setLoading(false);
				localStorage.setItem("userInfo", JSON.stringify(data));
				navigate("/admin");
			} catch (error) {
				setError(error.ErrorMessage);
			}
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
									<h4 className="text-center">Sign Up</h4>
									<form className="login-input" onSubmit={submitHandler}>
										<div className="login-form-group">
											<span>Upload Clear Picture of Cashier: </span>
											<input
												className="login-form-control"
												type="file"
												id="image"
												name="image"
												required
												accept="image/png, image/jpeg, image/jfif, image/JPG"
												onChange={(e) => postDetails(e.target.files[0])}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="name"
												className="login-form-control"
												placeholder="Name"
												value={name}
												onChange={(e) => setName(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="email"
												className="login-form-control"
												placeholder="Email"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="tel"
												className="login-form-control"
												placeholder="Contact No."
												value={phoneNumber}
												onChange={(e) => setPhoneNumber(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="text"
												className="login-form-control"
												placeholder="Address"
												value={address}
												onChange={(e) => setAddress(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="text"
												className="login-form-control"
												placeholder="CNIC"
												value={CNIC}
												onChange={(e) => setCNIC(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="text"
												className="login-form-control"
												placeholder="Date of Birth"
												value={dob}
												onChange={(e) => setDob(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="text"
												className="login-form-control"
												placeholder="Salary"
												value={salary}
												onChange={(e) => setSalary(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="text"
												className="login-form-control"
												placeholder="Designation"
												value={designation}
												onChange={(e) => setDesignation(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="password"
												className="login-form-control"
												placeholder="Password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<div className="login-form-group">
											<input
												type="password"
												className="login-form-control"
												placeholder="Confirm Password"
												value={confirmPassword}
												onChange={(e) => setConfirmPassword(e.target.value)}
											/>
										</div>
										<button
											className="btn login-form-btn submit w-100"
											type="submit"
										>
											Add Cashier
										</button>
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
