import React, { useEffect, useState } from "react";
import "./transactionHistory.css";
import axios from "axios";
import UserTemplate from "../userTemplate";
import Loading from "../../../components/loading";

export default function TransactionHistory() {
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [pin, setPin] = useState([]);

  const fetchCustomers = async () => {
    setLoading(true);
    const IBAN = JSON.parse(localStorage.getItem("userAccountInfo")).IBAN;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const transactionData = await axios.post(
        "/users/getChequeTransaction",
        {
          iban: IBAN,
        },
        config
      );
      // console.log(transactionData);

      console.log();
      for (let i = 0; i < transactionData.data.length; i++) {
        const transPin = await getPin(transactionData.data[i]._id);
        const temp = pin;
        temp.push(transPin);
        setPin(temp);
      }
      setLoading(false);
      setCustomers(transactionData.data);
    } catch (err) {
      setLoading(false);
      console.log(err.response.message);
    }
  };

  const getPin = async (id) => {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const pinData = await axios.post(
        "/users/getPinByTransaction",
        {
          id: id,
        },
        config
      );
      // console.log(pinData.data[0].pin);
      return pinData.data[0].pin;
    } catch (err) {
      return "-";
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <UserTemplate>
      <div className="row table-row">
        <div className="col-md-12">
          <div className="card">
            {loading ? (
              <Loading />
            ) : (
              <div className="card-body">
                <div className="card-title">
                  <h3>Transaction History</h3>
                </div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Account Number</th>
                        <th>Cheque Number</th>
                        <th>Amount</th>
                        <th>Fee</th>
                        <th>Pin</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((customer, i) => (
                        <tr key={customer._id}>
                          <th>{i + 1}</th>
                          <td>{customer.createdAt.substring(0, 10)}</td>
                          <td>{customer.createdAt.substring(11, 19)}</td>
                          <td>{customer.holderAccountNumber}</td>
                          <td>{customer.chequeNumber}</td>
                          <td>{customer.amount} Rs</td>
                          <td>10 Rs</td>
                          <td>{pin[i]}</td>
                          <td>
                            <span
                              className={
                                customer.status === "error"
                                  ? "badge px-2 py-1 badge-danger"
                                  : "badge px-2 py-1 badge-success"
                              }
                            >
                              {customer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </UserTemplate>
  );
}
