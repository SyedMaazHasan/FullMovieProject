import React, { Component } from "react";
import validator from "validator";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import axios from "axios";
import { apiEndPoint } from "../config.json";
class RegisterForm extends Component {
  state = {
    Email: "",
    Password: "",
    ConfirmPassword: "",
    error: ""
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

    if (result == false) {
      this.setState({ error: "please enter valid email including @ " });
      return 0;
    } else if (this.state.Password !== this.state.ConfirmPassword) {
      this.setState({ error: "password mismatched" });
      return 0;
    } else {
      this.setState({ error: "" });
    }
    try {
      const data = {
        Email: this.state.Email,
        Password: this.state.Password
      };
      const result = await axios.post(apiEndPoint + "/register", data);
      console.log(result.data);
      console.log("result in register=", result);
      toast.success(result.data, { autoClose: 1500 });
      //const result = e.currentTarget.title;
      setTimeout(() => {
        this.props.history.replace("/movies");
      }, 2000);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("known error occourred", ex);
      } else {
        console.log("unknown error occourred", ex);
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        {this.state.error != "" && (
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
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
          <div className="form-group">
            <label htmlFor="ConfirmPassword">Confirm Password</label>
            <input
              type="ConfirmPassword"
              className="form-control"
              id="ConfirmPassword"
              placeholder="ConfirmPassword"
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
            Register
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default RegisterForm;
