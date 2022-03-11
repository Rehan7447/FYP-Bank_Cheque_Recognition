import React, { useState } from "react";
import UserTemplate from "../userTemplate";
import "./moneyTransfer.css";
import axios from "axios";
import asyncHandler from "express-async-handler";

function MoneyTransfer() {
  const [amount, setAmount] = useState();
  const [senderAccount, setSenderAccount] = useState();
  const [recieverAccount, setRecieverAccount] = useState();
  const [recieverBank, setRecieverBank] = useState();
  const [senderBank, setSenderBank] = useState();
  const [reason, setReason] = useState();
  const [senderAccountId, setSenderAccountId] = useState();
  const [recieverAccountId, setRecieverAccountId] = useState();
  const [fee, setFee] = useState();

  const submit = asyncHandler(async (e) => {
    e.preventDefault();
    setSenderAccount(JSON.parse(localStorage.getItem("userAccountInfo")).IBAN);
    const sender = JSON.parse(
      localStorage.getItem("userAccountInfo")
    ).IBAN.substring(5, 9);
    if (sender[0] == "H") {
      setSenderBank("HBL");
    } else if (sender[0] == "A") {
      setSenderBank("ABL");
    } else if (sender[0] == "B") {
      setSenderBank("BAHL");
    } else {
      setSenderBank("MBL");
    }
    if(senderBank==recieverBank){
      setFee(amount%10)
    }else{
      setFee(0)
    }
    const { data } = await axios.post("/users/transferRequest", {
      amount,
      senderAccount,
      recieverAccount,
      reason,
      senderBank,
      recieverBank,
      fee,
    });
    if (data) {
      const { senderAccountUpdate } = await axios.put(
        "/users/updateAccount/:" + senderAccountId,
        {
          IBAN: senderAccount,
          amount,
          fee,
        }
      );
      if (senderAccountUpdate) {
        const { recieverAccountUpdate } = await axios.put(
          "/users/updateAccount/:" + recieverAccountId,
          {
            IBAN: recieverAccount,
            amount,
          }
        );
        if (recieverAccountUpdate) {
          const { requestUpdate } = await axios.put(
            "/users/editMoneyTransfer/:" + data._id,
            {
              status: "complete",
            }
          );
          if (requestUpdate) {
            console.log("success money tranfered!!");
          } else {
            throw new Error("Error Updating Transfer Request");
          }
        } else {
          throw new Error("Error Updating Reciever Account");
        }
      } else {
        throw new Error("Error Updating Sender Account");
      }
    } else {
      throw new Error("Error creating transfer request");
    }
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
                <option value="ABL" >Allied Bank Limited</option>
                <option value="MBL" >Meezan Bank Limited</option>
                <option value="BAHL" >Bank Al Habib Limited</option>
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
            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                id="inputPassword3"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
              />
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
              <button type="submit" className="btn btn-success">
                Transfer
              </button>
            </div>
          </div>
        </form>
      </div>
    </UserTemplate>
  );
}

export default MoneyTransfer;
