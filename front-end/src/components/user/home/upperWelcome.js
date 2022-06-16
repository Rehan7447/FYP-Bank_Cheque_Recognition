import React, { useState, useEffect } from "react";
import axios from "axios";
import Clock from "../../clock";
import "./upperWelcome.css";
import Loading from "../../loading";
import { Link } from "react-router-dom";

function WelcomeMenu() {
  const [userInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
  const [userAccountInfo, setUserAccountInfo] = useState({
    balance: "Loading...",
    IBAN: "Loading...",
  });
  const [loading, setLoading] = useState(false);

  const getAccountInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/users/account`, {
        params: { accountHolder: userInfo._id },
      });
      setLoading(false);
      localStorage.setItem("userAccountInfo", JSON.stringify(data));
      setUserAccountInfo(data);
    } catch (error) {
      console.log("Error fecthing user account details" + error);
    }
  };

  useEffect(() => {
    setTimeout(() => getAccountInfo(), 1000);
  }, []);

  return (
    <div className="mainDiv">
      <div className="welcomeDiv">
        <div>
          <span className="iban">{userAccountInfo.IBAN}</span>
          <h2>Welcome, {userInfo.name}!</h2>
        </div>
        <h5 className="clock">
          <Clock />
        </h5>
      </div>
      <div className="amountDiv">
        <div className="subAmountDiv">
          <a href="/user">
            {loading ? (
              <Loading />
            ) : (
              <h1 className="amount">
                {userAccountInfo.balance + " "}
                <span>Rs</span>{" "}
              </h1>
            )}
          </a>
          <br />
          <h5 className="balanceHeading">Current Balance</h5>
        </div>
        <div className="subMenu">
          <Link to="/transferHistory">Transfer History</Link>
          <Link to="/transactionHistory">Recent Cheque Transactions</Link>
        </div>
      </div>
    </div>
  );
}

export default WelcomeMenu;
