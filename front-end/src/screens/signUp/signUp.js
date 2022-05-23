import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import ErrorMessage from "../../components/errorMessage";
import axios from "axios";
import Loading from "../../components/loading";
// import "./signUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [CNIC, setCNIC] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");

  const [message, setMessage] = useState(null);
  const [, setPicMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      navigate("/user");
    }
  });

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
          "/users",
          { name, email, phoneNumber, address, CNIC, dob, pic, password, IBAN },
          config
        );
        setLoading(false);
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/login");
      } catch (error) {
        setLoading(false);
        setError(error.ErrorMessage);
      }
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please Select an image");
    }
    console.log(pics);
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
        // console.log(data.url.toString());
        setPic(data.url.toString());
      })
      .catch((err) => {
        console.log("Error is: " + err);
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
                    <div className="login-form-group text-center">
                      {pic ? (
                        <img
                          className="img-fluid img-thumbnail rounded-lg"
                          src={pic}
                          alt="User Profile"
                          style={{ height: "50%", width: "50%" }}
                        />
                      ) : (
                        <span>Please select an image</span>
                      )}
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
                        required
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
                      <CurrencyFormat
                        className="login-form-control"
                        placeholder="Contact No."
                        value={phoneNumber}
                        format="+92 (###) #######"
                        mask="_"
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
                      <CurrencyFormat
                        className="login-form-control"
                        placeholder="CNIC"
                        value={CNIC}
                        format="#####-#######-#"
                        mask="_"
                        onChange={(e) => setCNIC(e.target.value)}
                      />
                    </div>
                    <div className="login-form-group">
                      <CurrencyFormat
                        className="login-form-control"
                        placeholder="IBAN"
                        format="PK## ABPL  #### #### #### ####"
                        mask="_"
                        onChange={(e) => setIBAN(e.target.value)}
                      />
                    </div>
                    <div className="login-form-group">
                      <input
                        type="date"
                        class="login-form-control"
                        placeholder="Date of Birth"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
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
                      Sign Up
                    </button>
                  </form>
                  <p className="login-form-footer">
                    Already have account?{" "}
                    <a href="/login" className="text-primary">
                      Login
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
