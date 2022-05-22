import React, { useEffect, useState } from "react";
import WelcomeMenu from "../../../components/user/home/upperWelcome";
import UserCardMenu from "../../../components/user/home/userCardMenu";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import IosShareIcon from "@mui/icons-material/IosShare";
import SendIcon from "@mui/icons-material/Send";
import ReportIcon from "@mui/icons-material/Report";
import "./userHome.css";
import UserTemplate from "../userTemplate";
import { useNavigate } from "react-router-dom";

export default function User() {
  const chatBot = React.createRef();
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      navigate("/login");
    } else {
      setWelcome(true);
    }
  }, []);

  function chatBotBut() {
    if (chatBot.current.style.display !== "none") {
      chatBot.current.style.display = "none";
    } else {
      chatBot.current.style.display = "inline-block";
    }
  }

  return (
    <UserTemplate>
      <div className="mainSub">
        {welcome ? <WelcomeMenu /> : ""}
        <hr className="horizontalRow" />
        <div className="mainMenu">
          <h2 className="menuHeading">Menu</h2>
          <div className="menu row">
            <div className="col-md-4 menuCardMain">
              <UserCardMenu
                NavigateTo="/chequeTransaction"
                iconName={<DocumentScannerIcon sx={{ fontSize: 40 }} />}
                name="Cheque Transaction"
              />
            </div>
            {/* <UserCardMenu
              NavigateTo="/chequeDeposit"
              iconName={<IosShareIcon sx={{ fontSize: 40 }} />}
              name="Cheque Deposit"
            /> */}
            <div className="col-md-4 menuCardMain">
              <UserCardMenu
                NavigateTo="/transferMoney"
                iconName={<SendIcon sx={{ fontSize: 40 }} />}
                name="Transfer Money"
              />
            </div>
            <div className="col-md-4 menuCardMain">
              <UserCardMenu
                NavigateTo="/registerComplain"
                iconName={<ReportIcon sx={{ fontSize: 40 }} />}
                name="Register Complain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="botDiv">
        <iframe
          className="chatBot"
          ref={chatBot}
          name="ChatBot"
          title="Ask Anything"
          width="90%"
          height="430"
          allow="microphone;"
          src="https://console.dialogflow.com/api-client/demo/embedded/1bebf071-b8c1-4f62-bd3c-1f24cec93f20"
        ></iframe>
        <a className="float" id="chatButton" onClick={chatBotBut}>
          <i className="fa-solid fa-comments my-float"></i>
        </a>
      </div>
    </UserTemplate>
  );
}
