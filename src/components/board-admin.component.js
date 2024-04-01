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
          <h1>Manage Facilitie</h1>
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

// export default class BoardAdmin extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       content: ""
//     };
//   }

//   componentDidMount() {
//     UserService.getAdminBoard().then(
//       response => {
//         this.setState({
//           content: response.data
//         });
//       },
//       error => {
//         this.setState({
//           content:
//             (error.response &&
//               error.response.data &&
//               error.response.data.message) ||
//             error.message ||
//             error.toString()
//         });

//         if (error.response && error.response.status === 401) {
//           EventBus.dispatch("logout");
//         }
//       }
//     );
//   }

//   goToAddEvents = () => {
//     this.props.history.push("/new");
//   };

//   render() {
//     return (
//       <div class="container">
//         <div id="manage-events" onClick={this.goToAddEvents} className="section">
//           <div className="content">
//             <h1>Manage Events</h1>
//           </div>
//           <div className="overlay"></div>
//         </div>
//         <div id="manage-facilities" className="section">
//           <div className="content">
//             <h1>Manage Facilities</h1>
//           </div>
//           <div className="overlay"></div>
//         </div>
//         <div id="manage-users" className="section">
//           <div className="content">
//             <h1>Manage Users</h1>
//           </div>
//           <div className="overlay"></div>
//         </div>




//         <div>
//           <Routes>
//             <Route path="/events/new" element={<EventForm />} />
//             <Route path="/facilities/new" element={<FacilityForm />} />
//             <Route path="/events/:eventId/edit" element={<EventEditForm />} />
//             <Route path="/facilities/:facilityId/edit" element={<FacilityEditForm />} />
//           </Routes>
//         </div>
//       </div>


//       // <div className="container">
//       //   <header className="jumbotron">
//       //     <h3>{this.state.content}</h3>
//       //   </header>
//       // </div>  



//     );
//   }
// }
