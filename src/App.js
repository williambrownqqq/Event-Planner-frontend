import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";

import BoardAdmin from "./components/board-admin.component";
import EventBus from "./common/EventBus";

import EventList from "./components/EventComponent/EventList";
import FacilityList from "./components/FacilityComponent/FacilityList";
import FacilityDetail from "./components/FacilityComponent/FacilityDetail";
import EventDetail from "./components/EventComponent/EventDetail";
import EventForm from "./components/EventComponent/EventForm";
import FacilityForm from "./components/FacilityComponent/FacilityForm";
import EventEditForm from "./components/EventComponent/EventEditForm";
import FacilityEditForm from "./components/FacilityComponent/FacilityEditForm";
import AdminPanel from "./components/AdminPanelComponent/AdminPanel";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showEventBoard: false,
      showFacilityBoard:false,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showEventBoard: user.roles.includes("ROLE_USER"),
        showFacilityBoard: user.roles.includes("ROLE_USER"),

      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
      showEventBoard: false,
      showFacilityBoard:false,
    });
  }

  render() {
    //const { currentUser, showModeratorBoard, showAdminBoard, showEventBoard, showFacilityBoard } = this.state;
    const { currentUser, showAdminBoard, showEventBoard, showFacilityBoard } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Event Planner
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {/* {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )} */}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {showFacilityBoard && (
              <li className="nav-item">
                <Link to={"/facilities"} className="nav-link">
                  Facility Board
                </Link>
              </li>
            )}

            {showEventBoard && (
              <li className="nav-item">
                <Link to={"/events"} className="nav-link">
                  Events Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  Monitoring
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3 container-wide">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            {/* <Route path="/mod" element={<BoardModerator />} /> */}
            <Route path="/admin" element={<BoardAdmin />} />

            <Route path="/facilities/new" element={<FacilityForm />} />
            <Route path="/facilities/:facilityId/edit" element={<FacilityEditForm />} />
            <Route path="/facilities/:facilityId" element={<FacilityDetail />} />
            <Route path="/facilities/*" element={<FacilityList />} />

            <Route path="/events/new" element={<EventForm />} />
            <Route path="/events/:eventId" element={<EventDetail />} />
            <Route path="/events/:eventId/edit" element={<EventEditForm />} />
            <Route path="/events" element={<EventList />} />   

            <Route path="/users/manage" element={<AdminPanel />} />
          
          </Routes>
        </div>
         
      </div>
    );
  }
}

export default App;
