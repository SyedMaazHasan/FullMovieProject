import React, { Component } from "react";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
class Like extends Component {
  state = {
    heart: "fa fa-heart-o"
  };
  heartChange = () => {
    if (this.state.heart === "fa fa-heart-o") {
      this.setState({ heart: "fa fa-heart" });
    } else {
      this.setState({ heart: "fa fa-heart-o" });
    }
  };
  render() {
    return <i className={this.state.heart} onClick={this.heartChange} />;
  }
}

export default Like;
