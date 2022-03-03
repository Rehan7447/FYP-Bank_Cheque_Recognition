import React from "react";
import UserTemplate from "../userTemplate";
import "./moneyTransfer.css";
function MoneyTransfer() {
  return (
    <UserTemplate>
      <div className="mainDivMT">
        <h1>Money Transfer</h1>
        <form>
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Recipient Bank Name:
            </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="inputEmail3"
                placeholder="Bank Name"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="inputEmail3" class="col-sm-2 col-form-label">
              Recipient Account No:
            </label>
            <div class="col-sm-10">
              <input
                type="email"
                class="form-control"
                id="inputEmail3"
                placeholder="Account No"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Amount to send:
            </label>
            <div class="col-sm-10">
              <input
                type="number"
                class="form-control"
                id="inputPassword3"
                placeholder="Amount"
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="inputPassword3" class="col-sm-2 col-form-label">
              Reason:
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                id="inputPassword3"
                placeholder="Reason for sending"
              />
            </div>
          </div>

          <div class="form-group row submitDiv">
            <div class="col-sm-10 text-right">
              <button type="submit" class="btn btn-success">
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
