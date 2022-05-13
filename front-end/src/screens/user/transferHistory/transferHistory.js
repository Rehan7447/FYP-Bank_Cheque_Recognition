import React, { useEffect, useState } from "react";
import "./transferHistory.css";
import axios from "axios";
import { Button } from "react-bootstrap";
import UserTemplate from "../userTemplate";

export default function TransferHistory() {
  const [, setLoading] = useState(false);
  const [, setError] = useState(false);
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    const { data } = await axios.get(`/users/getTransferHistory`, {IBAN: JSON.parse(localStorage.getItem("userAccountInfo")).IBAN});
    setCustomers(data);
  };

  useEffect(() => {
    console.log();
    fetchCustomers();
  }, []);

  return (
    <UserTemplate>
      <div className="row table-row">
        <div className="col-md-12">
          <div className="card">
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
                      <th>Sender Account</th>
                      <th>Reciever Account</th>
                      <th>Amount</th>
                      <th>Fee</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((customer, i) => (
                      <tr key={customer._id}>
                        <th>{i + 1}</th>
                        <td>{customer.createdAt}</td>
                        <td>{customer.senderAccount}</td>
                        <td>{customer.recieverAccount}</td>
                        <td>{customer.amount}</td>
                        <td>{customer.fee}</td>

                        <td>
                          <span className="badge badge-success px-2 py-1">
                            {customer.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserTemplate>
  );
}
