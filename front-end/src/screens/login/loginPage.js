import React, { useState } from "react";
import Header from "../../components/header/header";
import axios from "axios";
import Loading from "../../components/loading";
import ErrorMessage from "../../components/errorMessage";
import "./loginPage.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
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
			const { data } = await axios.post(
				"/users/login",
				{
					email,
					password,
				},
				config
			);
			console.log(data);
			localStorage.setItem("userInfo", JSON.stringify(data));
			setError(false);
			setLoading(false);
			navigate("/user");
		} catch (error) {
			setError(true);
			setLoading(false);
		}
	};

	return (
		<div className="login-body">
			<Header />
			{error && <ErrorMessage variant="danger"> Error </ErrorMessage>}
			{loading && <Loading />}
			<div className="container h-100">
				<div className="row login-form-area">
					<div className="col-xl-6">
						<div className="login-form-input-content">
							<div className="login-card mb-0">
								<div className="login-card-body">
									<h4 className="text-center">Login</h4>
									<form className="login-input" onSubmit={submitHandler}>
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
												type="password"
												className="login-form-control"
												placeholder="Password"
												value={password}
												onChange={(e) => setPassword(e.target.value)}
											/>
										</div>
										<button
											className="btn login-form-btn submit w-100"
											type="submit"
										>
											Login
										</button>
										{/* <div className="row social-login-btn">
											<div className="col-md-6">
												<a
													className="btn google-btn"
													href={"/googleauth"}
													style={{ textTransform: "none" }}
													role="button"
												>
													<img
														style={{
															marginBottom: "3px",
															marginRight: "23px",
															width: "20px",
														}}
														alt={"Google sign-in"}
														src={
															"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
														}
													/>
													Login with Google
												</a>
											</div>
											<div className="col-md-6 social-btn2">
												<a
													className="btn facebook-btn"
													href={"/facebookauth"}
													style={{ textTransform: "none" }}
													role="button"
												>
													<img
														style={{
															marginBottom: "3px",
															marginRight: "5px",
															width: "25px",
															borderRadius: "50%",
														}}
														alt={"Facebook sign-in"}
														src={
															"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEU6VZ////82Up4zUJ1UbKx4ibswTpyMmsQ5V6EtTJupss8nSJnN0+WVosgqSpo4U56eqcyDksDj5vBwgbb3+PxFXqNabqt9jb3S2OhidbC9xdy3v9l0hLjZ3etLY6bq7fTEyt4dQpdJYqekrs2uttK97JEgAAADFUlEQVR4nO3c2XLiMBBAUUZmM3IsFsNgSIAk/P83TsLzjCNbI3c3de9rqlw+BV7VZDIhIiIiIiIiIiIiIiIiIlJeCM4VxbzsrJDey8G50s/3h91ss3jp7LdJYii8262rbfPr545eem/753y9qWJwjypzwqJuT7E6i0JX7459fOaEvn3r5zMmLPy5r8+W0L9Gn15MCkO9GuAzJHSh9xFoS1hcrsOAVoTzdsghaEhYTAcDbQjdfjjQhDAshx6DRoShrhKAFoR+nQI0ICzaJKABYZlyEFoQ1p9pQPVCd0m4UJgQ+lsiULvQXVKB2oW+1ysZg8KwTAYqF5ZpF3sDQr99cqFLvJ3RL0y+2usXDnw1Y0YYUh58TQiL3X8Aql57Kvschs3xdF/9pftC8fphj3vSalZ6X5tbA/axJ5rtzhdBem+HVEeeaKq55s+po1DHAW/vJj+/yfdifdxX1OYX9LuwjxIejH5Fv3LTGOBJ8eXup+KEH056P4cXJby+S+9mQlHCUy29mwlFCddz6d1MKEq4sXsmjRTOEGoOIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQR27+78qYucRX37GFR7Jrb65ddBQz1Hbv2sCjpSixvEcgEitlhcN+cNenRnZxagThm+wK6ghC4TXiEYSr8tmFwstvIwhb2XX+EYR72St+fmEj6htDuBW+a8svPArPauQXnp9e+CI8jZJfKP38mF8ofDnML2wuwsOn2YVX6ena7MKt9PRpduHt6YUr6eHM7MKF9HBmduGr9OvU7MKp9BR4bmEjDcwulJ9zzy2U/+1hbqH0s1N+4afsq8QRhPKT/LmFB+kb7+xC6Tua7ELhdacRhOLPTtmFCv7ZQOY14LP4xWISlh2FqFkM17UF8VPpF7Hjb3HTJl2nSwXAzp5jnqYrhAj1hxCh/hAi1B9ChPpDiFB/CBHqDyFC/SFEqD+ECPWHEKH+ECLUH0KE+kOIUH8IEeoPIUL9IUSoP4QI9YcQof4QItQfQoT6Q4hQfwgR6g8hQv0hRKg/hAj1hxCh/hAi1B9ChD36A+1ASVvVoq0WAAAAAElFTkSuQmCC"
														}
													/>
													Login with Facebook
												</a>
											</div>
										</div> */}
									</form>
									<p className="login-form-footer1">
										<a href="/login" className="text-primary">
											Forgot Password?
										</a>
									</p>
									<p className="login-form-footer">
										Dont have account?{" "}
										<a href="/signup" className="text-primary">
											Sign Up
										</a>{" "}
										now
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
