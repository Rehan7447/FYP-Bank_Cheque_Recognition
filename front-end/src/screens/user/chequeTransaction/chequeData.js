import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import WebcamCapture from "../../../components/user/chequeTransaction/webcam";
import "./chequeData.css";
import UserTemplate from "../userTemplate";
import "./chequeData.css";

function ChequeData() {
  const navigate = useNavigate();
  //   const submit = () => {
  //     navigate("/pin");
  //   };
  const [date, setDate] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [holderName, setHolderName] = useState("");
  const [name, setName] = useState("");
  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [image, setImage] = useState("");
  const [check, setCheck] = useState(false);
  const [accountBal, setAccountBal] = useState("");
  const [IBAN, setIBAN] = useState("");
  const [id, setId] = useState("");
  const [pin, setPin] = useState("");
  const [flag, setFlag] = useState(true);
  const [errors, setErrors] = useState([]);
  const [report, setReport] = useState();

  useEffect(() => {
    if (!check) {
      const accountData = JSON.parse(localStorage.getItem("userAccountInfo"));
      const data = JSON.parse(sessionStorage.getItem("chequeTransaction"));
      if (data) {
        setDate(data.date);
        setChequeNumber(data.chequeNumber);
        setAccountNumber(data.holderAccountNumber);
        setHolderName(data.holderName);
        setName(data.chequeName);
        setBank(data.holderBankName);
        setAmount(data.amount);
        setImage(data.chequeImage);
        setId(data._id);
      }
      setAccountBal(accountData.balance);
      setIBAN(accountData.IBAN);
      sessionStorage.setItem("chequeTransaction", "");
      setCheck(true);
    }

    if (holderName != name) {
      if (name.toLocaleLowerCase() != "self") {
        var temp = errors;
        temp.push(
          "Account Holder Name and the Payee Name Dont Match, Cheque is invalid"
        );
      }

      setErrors(temp);
      setFlag(false);
    }
    if (parseInt(amount) > parseInt(accountBal)) {
      var temp = errors;
      temp.push("Insufficient Balance");
      setErrors(temp);
      setFlag(false);
    }
    if (accountNumber.replace(/\s*/g, "") != IBAN.replace(/\s*/g, "")) {
      console.log(accountNumber, " ", IBAN);
      var temp = errors;
      temp.push("User account number and Cheque account number dont match");
      setErrors(temp);
      setFlag(false);
    }
  });

  const createOTP = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post("/users/createPin", { id: id }, config);
      setPin(data.pin);
    } catch (error) {}
  };

  const generateError = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios.put(
        "/users/updateChequeTransaction/" + id,
        {
          status: "error",
        },
        config
      );
      setReport("success");
    } catch (error) {
      setReport(error.response);
    }
  };

  const deleteData = (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .delete("/users/deleteChequeTransaction/" + id, {}, config)
        .then((chequeDel) => {
          navigate(-1);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <UserTemplate>
      <form>
        <h1>Cheque Information</h1>
        {/* <div className="d-flex justify-content-center">
          <img src={image} alt="chequeImage" width="500px" className="m-2" />
        </div> */}
        <div className="text-center">
          {errors
            ? errors.map((error) => {
                return <p style={{ color: "red" }}>Error: {error}</p>;
              })
            : ""}
        </div>

        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Date:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              placeholder="Date"
              disabled
              value={date}
              //   onChange={(e) => setRecieverAccount(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Cheque Number:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              placeholder="Cheque No"
              disabled
              value={chequeNumber}
              //   onChange={(e) => setRecieverAccount(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Account Number:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              placeholder="Account No"
              disabled
              value={accountNumber}
              //   onChange={(e) => setRecieverAccount(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Account Holder Name:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              placeholder="Name"
              disabled
              value={name}
              //   onChange={(e) => setRecieverAccount(e.target.value)}
            />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
            Amount:
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="inputEmail3"
              placeholder="Amount"
              disabled
              value={amount + " /-PKR"}
              //   onChange={(e) => setRecieverAccount(e.target.value)}
            />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="form-group chequeDataButtons row">
          <Button
            className="col-sm-2 btn-danger col-md-3 col-sm-12  depositButtons"
            onClick={(e) => {
              deleteData(e);
            }}
          >
            Retake Image
          </Button>
          <Button
            className="col-sm-2 btn-primary col-md-3 col-sm-12 depositButtons"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={(e) => {
              generateError(e);
            }}
          >
            Report Transaction
          </Button>
          {errors ? (
            <Button
              className="col-sm-2 btn-secondary col-md-3 col-sm-12 depositButtons"
              data-toggle="modal"
              data-target="#exampleModal"
              disabled
            >
              Generate Pin
            </Button>
          ) : (
            <Button
              className="col-sm-2 btn-success  col-md-3 col-sm-12 depositButtons"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={createOTP}
            >
              Generate Pin
            </Button>
          )}
        </div>
      </form>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Success
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {report ? (
                report == "success" ? (
                  <p>
                    Your issue has been reported, our staff will look into it
                  </p>
                ) : (
                  <p>failed to generate report</p>
                )
              ) : (
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail3"
                    className="col-sm-2 col-form-label"
                  >
                    Your Pin:
                  </label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail3"
                      placeholder="Account No"
                      disabled
                      value={pin}
                      //   onChange={(e) => setRecieverAccount(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                data-dismiss="modal"
                className="btn btn-primary"
                onClick={() => navigate("/user")}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
}

export default ChequeData;
