import React, { Component } from "react";
import joi from "joi-browser";
import validator from "validator";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { apiEndPoint } from "../config.json";

axios.defaults.headers.common["x-auth"] = localStorage.getItem("token");
class Logout extends Component {
  logoutHandler = () => {
    localStorage.removeItem("token");
    // setTimeout(() => {
    //   window.location = "/LoginForm";
    // }, 2000);
    // toast.error("Logout successfull", { autoClose: 1500 });

    toast.error("Logout successfull", { autoClose: 1500 });
    this.props.history.push("/LoginForm");
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        {this.logoutHandler()}
      </React.Fragment>
    );
  }
}

export default Logout;
