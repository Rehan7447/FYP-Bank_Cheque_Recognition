import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import WebcamCapture from "../../../components/user/chequeTransaction/webcam";
import UserTemplate from "../userTemplate";
import "./chequeData.css";

function ChequeData() {
  const navigate = useNavigate();
  //   const submit = () => {
  //     navigate("/pin");
  //   };

  return (
    <UserTemplate>
      <form>
        <h1>Cheque Information</h1>
        <br />
        <br />
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
              value="PK87 BAHL 1736 7173 8828 7373"
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
              placeholder="Account No"
              disabled
              value="Basim Ayub"
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
              placeholder="Account No"
              disabled
              value="33000"
              //   onChange={(e) => setRecieverAccount(e.target.value)}
            />
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="form-group chequeDataButtons d-flex justify-content-around">
          <Button
            className="col-sm-2 btn-danger"
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
          >
            Retake Image
          </Button>
          <Button
            className="col-sm-2 btn-success "
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Continue
          </Button>
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
                    value="482629"
                    //   onChange={(e) => setRecieverAccount(e.target.value)}
                  />
                </div>
              </div>
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
