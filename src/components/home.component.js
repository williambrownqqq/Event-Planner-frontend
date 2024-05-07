import React, { Component } from "react";
import UserService from "../services/user.service";
import "../styles/HomeStyles.css";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      info: "Some information about the page"
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <div className="row">
            <div className="col-md-6">
              <div className="image-container">
                <img
                  src="https://i.pinimg.com/originals/44/53/19/445319a608846806e2bc12d8046204bd.jpg"
                  alt="Big Photo"
                  className="img-fluid"
                  style={{ filter: "contrast(50%)" }}
                />
                <div className="text-over-image">
                  <h1>Welcome to the Event Planner!</h1>
                  
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}