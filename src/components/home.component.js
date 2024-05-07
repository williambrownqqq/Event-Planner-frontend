import React, { Component } from "react";
import UserService from "../services/user.service";
import "../styles/HomeStyles.css"
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
              <img src="https://i.pinimg.com/originals/44/53/19/445319a608846806e2bc12d8046204bd.jpg" alt="Big Photo" className="img-fluid" style={{filter: 'contrast(50%)'}} />
            </div>
            {/* <div className="col-md-6">
              <h3>{this.state.content}</h3>
              <p>{this.state.info}</p>
            </div> */}
            <div class="text-info">
                  <h1>Welcome to the hub of extraordinary events!</h1>
                  <p>Whether you're envisioning a grand wedding, a corporate gala, or a community fundraiser, you've arrived at the perfect destination. At our event planning headquarters, creativity meets precision to transform your dreams into unforgettable experiences.</p>
                  <p>Here, we specialize in curating moments that linger in memories long after the final toast. With a meticulous attention to detail and a passion for innovation, our team of seasoned professionals is dedicated to bringing your vision to life, surpassing expectations every step of the way.</p>
                  <p>Navigate through our information home page to discover the array of services we offer, testimonials from delighted clients, and insights into our unique approach to event planning. Whether you're seeking inspiration or ready to embark on the journey of creating your next spectacular event, you've come to the right place. Let's embark on this exciting adventure together!</p>
            </div>
          </div>
        </header>
      </div>
    );
  }
}