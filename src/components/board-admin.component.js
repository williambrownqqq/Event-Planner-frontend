// import React, { useState, useEffect } from "react";

// import AdminService from "../services/admin.service.js";

// import EventBus from "../common/EventBus";
import "../styles/AdminBoardStyles.css";
import { useNavigate} from "react-router-dom";

function BoardAdmin() {

  const navigate = useNavigate();

  const goToAddEvents = () => {
    navigate("/events/new");
  };
  const goToAddFacilities = () => {
    navigate("/facilities/new");
  };
  const goToManageUsers = () => {
    navigate("/users/manage");
  };

  return (
    <div className="container">
      <div id="manage-events" onClick={goToAddEvents} className="section">
        <div className="content">
          <h1>Manage Events</h1>
        </div>
        <div className="overlay"></div>
      </div>
      <div id="manage-facilities" onClick={goToAddFacilities} className="section">
        <div className="content">
          <h1>Manage Facilities</h1>
        </div>
        <div className="overlay"></div>
      </div>
      <div id="manage-users" onClick={goToManageUsers} className="section">
        <div className="content">
          <h1>Manage Users</h1>
        </div>
        <div className="overlay"></div>
      </div>
      {/* <div>
        <Routes>
          <Route path="/events/new" element={<EventForm />} />
          <Route path="/facilities/new" element={<FacilityForm />} />
          <Route path="/events/:eventId/edit" element={<EventEditForm />} />
          <Route path="/facilities/:facilityId/edit" element={<FacilityEditForm />} />
 
        </Routes>
      </div> */}
    </div>
  );
}

export default BoardAdmin;
