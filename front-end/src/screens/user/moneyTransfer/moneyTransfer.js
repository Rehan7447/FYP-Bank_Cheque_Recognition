import React, { useEffect, useState } from "react";
import UserTemplate from "../userTemplate";
import "./moneyTransfer.css";
import axios from "axios";
import asyncHandler from "express-async-handler";
import Loading from "../../../components/loading";
import { useNavigate } from "react-router-dom";

function MoneyTransfer() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState();
  const [senderAccount, setSenderAccount] = useState();
  const [recieverAccount, setRecieverAccount] = useState();
  const [recieverBank, setRecieverBank] = useState();
  const [senderBank, setSenderBank] = useState();
  const [reason, setReason] = useState();
  const [fee, setFee] = useState(0);
  // const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transferInfo, setTransferInfo] = useState({
    senderAccount: "",
    recieverAccount: "",
    amount: "",
    fee: "",
    reason: "",
    status: "",
  });

  useEffect(() => {
    setSenderAccount(JSON.parse(localStorage.getItem("userAccountInfo")).IBAN);
    const sender = JSON.parse(
      localStorage.getItem("userAccountInfo")
    ).IBAN.substring(5, 9);
    if (sender[0] === "H") {
      setSenderBank("HBL");
    } else if (sender[0] === "A") {
      setSenderBank("ABL");
    } else if (sender[0] === "B") {
      setSenderBank("BAHL");
    } else {
      setSenderBank("MBL");
    }
    if (amount && senderBank !== recieverBank) {
      setFee(amount * (5 / 100));
    } else {
      setFee(0);
    }
  });

  const submit = asyncHandler(async (e) => {
    e.preventDefault();
    // setFlag(true);
    setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/users/transferRequest",
      {
        amount,
        senderAccount,
        recieverAccount,
        reason,
        senderBank,
        recieverBank,
        fee,
      },
      config
    );
    const { senderAccountUpdate } = await axios.put(
      "/users/updateAccount",
      {
        IBAN: senderAccount,
        amount,
        fee,
      },
      config
    );
    const { recieverAccountUpdate } = await axios.put(
      "/users/updateAccount",
      {
        IBAN: recieverAccount,
        amount,
      },
      config
    );
    const { updated } = axios
      .put(
        "/users/editMoneyTransfer/" + data._id,
        {
          status: "complete",
        },
        config
      )
      .then((updateData) => {
        setTransferInfo(updateData.data);
        setLoading(false);
      });
  });

  return (
    <UserTemplate>
      <div className="mainDivMT">
        <h1>Money Transfer</h1>
        <form onSubmit={submit}>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Recipient Bank Name:
            </label>
            <div className="col-sm-10">
              <input
                list="bankNames"
                name="bankNames"
                placeholder="Bank Name"
                className="form-control"
                pattern="HBL|ABL|MBL|BAHL"
                title="Choose from the banks available"
                onChange={(e) => setRecieverBank(e.target.value)}
              />
              <datalist id="bankNames">
                <option value="HBL">Habib Bank Limited</option>
                <option value="ABL">Allied Bank Limited</option>
                <option value="MBL">Meezan Bank Limited</option>
                <option value="BAHL">Bank Al Habib Limited</option>
              </datalist>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Recipient Account No:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputEmail3"
                placeholder="Account No"
                onChange={(e) => setRecieverAccount(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Amount to send:
            </label>
            <div className="col-sm-6">
              <input
                type="number"
                className="form-control"
                id="inputPassword3"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <label htmlFor="inputPassword6" className="col-sm-2 col-form-label">
              Fee:
            </label>
            <div className="col-sm-2">
              <span id="inputPassword6" className="form-control">
                {fee}
              </span>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Reason:
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="inputPassword3"
                placeholder="Reason for sending"
                onChange={(e) => setReason(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row submitDiv">
            <div className="col-sm-10 text-right">
              <button
                type="submit"
                className="btn btn-success"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                Transfer
              </button>
            </div>
          </div>
        </form>
      </div>

      <div
        className="modal fade"
        id="exampleModalLong"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLongTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Transfer Overview
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
              {loading ? (
                <Loading />
              ) : (
                <div>
                  <p>To: {transferInfo.recieverAccount}</p>
                  <p>From: {transferInfo.senderAccount}</p>
                  <p>Amount: {transferInfo.amount}</p>
                  <p>Fee: {transferInfo.fee}</p>
                  <p>Reason: {transferInfo.reason}</p>
                  <p>Status: {transferInfo.status}</p>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={() => {
                  navigate("/user");
                }}
              >
                Home
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
}

export default MoneyTransfer;
