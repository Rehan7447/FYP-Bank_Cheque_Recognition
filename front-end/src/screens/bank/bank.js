import "./bank.css";
import OTPInput from "otp-input-react";
import axios from "axios";
import { useState } from "react";

export default function Bank() {
  const [OTP, setOTP] = useState("");

  const withDraw = async (e) => {
    e.preventDefault();
    // setFlag(true);
    // setLoading(true);
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/users/getPin",
        {
          pin: OTP,
        },
        config
      );
      if (data) {
        const transactionData = await axios.post(
          "/users/getChequeTransaction",
          {
            id: data[0].transactionId,
          },
          config
        );
        if (transactionData) {
          const IBAN = transactionData.data[0].holderAccountNumber;
          const amount = transactionData.data[0].amount;
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
                "/users/updateChequeTransaction/" + data[0].transactionId,
                {
                  status: "complete",
                },
                config
              )
              .then((updateData) => {
                const { updatePin } = axios
                  .put(
                    "/users/updatePin/" + data[0]._id,
                    {
                      status: "Used",
                    },
                    config
                  )
                  .then((updated) => {
                    console.log(updated);
                  });
              });
          }
        }
      }
    } catch (e) {
      console.log("Error is: " + e);
    }
  };

  return (
    <div className="landMain">
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
