import "./bank.css";
import OTPInput from "otp-input-react";
import axios from "axios";
import { useState } from "react";
import Loading from "../../components/loading";

export default function Bank() {
  const [OTP, setOTP] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState();
  const [withdrawnAmount, setWithdrawnAmount] = useState("");

  const withDraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (OTP) {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      try {
        const data = await axios.post(
          "/users/getPin",
          {
            pin: OTP,
          },
          config
        );
        const transactionData = await axios.post(
          "/users/getChequeTransaction",
          {
            id: data.data[0].transactionId,
          },
          config
        );
        if (transactionData) {
          const IBAN = transactionData.data[0].holderAccountNumber;
          const amount = transactionData.data[0].amount;
          setWithdrawnAmount(amount);
          const accountUpdate = await axios.put(
            "/users/updateAccount",
            {
              IBAN: IBAN,
              amount: amount,
              fee: 10,
            },
            config
          );
          if (accountUpdate) {
            const { updated } = axios
              .put(
                "/users/updateChequeTransaction/" + data.data[0].transactionId,
                {
                  status: "complete",
                },
                config
              )
              .then((updateData) => {
                const { updatePin } = axios
                  .put(
                    "/users/updatePin/" + data.data[0]._id,
                    {
                      status: "used",
                    },
                    config
                  )
                  .then((updated) => {
                    setLoading(false);
                    setResponse("success");
                  });
              });
          }
        }
      } catch (error) {
        setLoading(false);
        setResponse(error.response.data.message);
      }
    } else {
      setLoading(false);
      setResponse("Please enter a Pin!");
    }
  };

  return (
    <div className="landMain">
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {response}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {loading ? (
                <Loading />
              ) : (
                <div>
                  {response === "Please enter a Pin!"
                    ? "Please enter a valid pin, pin field can not be empty!"
                    : ""}
                  {response === "expired"
                    ? "Your pin has expired and can not be used!"
                    : ""}
                  {response === "used"
                    ? "Your pin has already been used, you can not use it again!"
                    : ""}
                  {response === "Not Enough Balance"
                    ? "Your account doesnt have enough balance to make the transaction, please recharge!"
                    : ""}
                  {response === "success"
                    ? "You have successfully withdrawn " +
                      withdrawnAmount +
                      " Rupees"
                    : ""}
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <h1>Automatic Cheque Withdrawal</h1>
      <div className="landContent">
        <h2>Enter Your Pin/OTP</h2>
        <form>
          <div className="OTP-Input">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="text"
              disabled={false}
              secure
            />
          </div>
          <button
            className="OTP-submit btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={(e) => {
              withDraw(e);
            }}
          >
            Verify and Withdraw Cash
          </button>
        </form>
      </div>
    </div>
  );
}
