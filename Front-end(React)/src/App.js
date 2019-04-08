import React, { Component } from "react";
import Movies from "../src/components/movies";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/navigaion";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import LoginForm from "./components/LoginForm";

import AddMovie from "./components/AddMovie";
import RegisterForm from "./components/Register";
import Logout from "./components/Logout";
const token = localStorage.getItem("token");

class App extends Component {
  state = {};
  componentDidMount() {
    console.log("jwt token = ", token);
  }

  render() {
    return (
      <React.Fragment>
        <Navigation />

        <Switch>
          {!token && <Route path="/RegisterForm" component={RegisterForm} />}

          <Route path="/LoginForm" component={LoginForm} />
          <Route path="/Movies" component={Movies} />

          <Route path="/Customers" component={Customers} />
          <Route path="/Rentals" component={Rentals} />
          <Route path="/NewMovie" component={AddMovie} />
          <Route path="/Logout" component={Logout} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
