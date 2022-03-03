import React, { Component } from "react";
import UserHeader from "../../components/header/userHeader";
import "./userTemplate.css";

class UserTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem("userInfo"),
    };
  }

  componentDidMount() {
    this.isLogged();
  }

  isLogged() {
    if (this.state.isLoggedIn === null) {
      window.location.href = "/login";
    }
  }

  render() {
    return (
      <div className="userMain">
        <UserHeader />
        <div className="userMainContent">{this.props.children}</div>
        <div>footer</div>
      </div>
    );
  }
}

export default UserTemplate;
