import React, { Component } from "react";
import joi from "joi-browser";
import validator from "validator";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { apiEndPoint } from "../config.json";

axios.defaults.headers.common["x-auth"] = localStorage.getItem("token");
class Form extends Component {
  state = {
    Email: "",
    Password: "",
    error: "",
    login: false
  };
  schema = {
    Email: joi.string(),
    Password: joi.string()
  };
  change = e => {
    this.setState({ error: "" });
    e.preventDefault();
    const key = e.currentTarget.id;
    this.setState({ [key]: e.currentTarget.value });
  };
  submit = async e => {
    e.preventDefault();

    const result = validator.isEmail(this.state.Email);
    console.log(result);
    if (result === false) {
      this.setState({ error: "please enter valid email including @ " });
      return 0;
    } else {
      this.setState({ error: "" });
    }
    try {
      const data = {
        Email: this.state.Email,
        Password: this.state.Password
      };
      const result = await axios.post(apiEndPoint + "/login", data);
      console.log("inside login form=", result.headers["x-auth-token"]);
      localStorage.setItem("token", result.headers["x-auth-token"]);
      //const result = e.currentTarget.title;
      //this.props.history.replace("/Customers");
      // window.location = "/Movies";
      // toast.success("Logging in");
      setTimeout(() => {
        window.location = "/Movies";
      }, 2000);
      toast.success("Logging in", { autoClose: 1500 });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("known error occourred", ex);
        toast.error("incorrect details");
      } else {
        console.log("unknown error occourred", ex);
      }
    }

    //set token in localstorage
    // localStorage.setItem("token", result.headers["x-auth-token"]);
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        {this.state.error && (
          <ToastContainer position="top-center">
            {toast.error(this.state.error)}
          </ToastContainer>
        )}

        <form>
          <div className="form-group">
            <label htmlFor="Email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="Email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={this.change}
            />
          </div>
          <div className="form-group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              className="form-control"
              id="Password"
              placeholder="Password"
              onChange={this.change}
            />
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.submit}
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default Form;
