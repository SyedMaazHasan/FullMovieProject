import React, { Component } from "react";
import { apiEndPoint } from "../config.json";
import axios from "axios";
import joi from "joi-browser";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
class AddMovie extends Component {
  state = {
    error: "",
    DailyRentalRate: "",
    Genre: "",
    NumberInStock: "",
    Title: ""
  };

  schema = {
    Title: joi.string().required(),
    NumberInStock: joi.number().required(),
    DailyRentalRate: joi.number().required(),
    Genre: joi.string().required()
  };
  add = async e => {
    e.preventDefault();
    const valid = joi.validate(this.state, this.schema);
    const error = valid.error.details[0].message;
    if (
      this.state.error !== "" &&
      this.state.error !== '"error" is not allowed'
    ) {
      this.setState({ error });
      console.log("error is there");
      return 0;
    }

    //call server
    console.log("hehheheeh");
    const data = {
      DailyRentalRate: this.state.DailyRentalRate,
      Genre: this.state.Genre,
      NumberInStock: this.state.NumberInStock,
      Title: this.state.Title
    };
    try {
      const result = await axios.post(apiEndPoint + "/movies/add", data);
      console.log(result.data);
      //const result = e.currentTarget.title;
      this.props.history.replace("/movies");
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("known error occourred", ex);
      } else {
        console.log("unknown error occourred", ex);
      }
    }
  };
  setValue = e => {
    const property = e.currentTarget.id;

    let scheme = {
      [property]: this.schema[property]
    };
    this.setState(
      {
        [property]: e.currentTarget.value
      },
      () => {
        const valid = joi.validate(this.state, scheme, {
          abortEarly: false
        });
        console.log("hello");
        const error = valid.error.details[0].message;

        this.setState({ error });
      }
    );
  };
  render() {
    return (
      <React.Fragment>
        {this.state.error !== "" &&
          this.state.error !== '"error" is not allowed' && (
            <ToastContainer position="top-center">
              {toast.error(this.state.error)}
            </ToastContainer>
          )}

        <form>
          <div className="form-group">
            <label htmlFor="Title">Title</label>
            <input
              type="text"
              className="form-control"
              id="Title"
              placeholder="Enter Title"
              onChange={this.setValue}
            />
          </div>

          <div className="form-group">
            <label htmlFor="NumberInStock">NumberInStock</label>
            <input
              type="text"
              className="form-control"
              id="NumberInStock"
              placeholder="Enter NumberInStock"
              onChange={this.setValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="DailyRentalRate">DailyRentalRate</label>
            <input
              type="text"
              className="form-control"
              id="DailyRentalRate"
              placeholder="enter DailyRentalRate"
              onChange={this.setValue}
            />
          </div>
          <div className="form-group">
            <label htmlFor="GenreId">Genre</label>
            <input
              type="text"
              className="form-control"
              id="Genre"
              placeholder="Enter Genre"
              onChange={this.setValue}
            />
          </div>

          <button type="submit" className="btn btn-primary" onClick={this.add}>
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}

export default AddMovie;
