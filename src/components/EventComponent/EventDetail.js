import '../../styles/EventDetails.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventService from '../../services/event.service.js';
import facilityService from '../../services/facility.service.js';
import AuthService from "../../services/auth.service";
import adminService from '../../services/admin.service.js';
import UserDropdown from './UserDropdown.js';
import eventService from '../../services/event.service.js';


function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const currentUser = AuthService.getCurrentUser();
  const [isAssigned, setIsAssigned] = useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [executors, setExecutors] = useState({
    executors: []
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
   EventService.getEventsDetails(eventId)
      .then(response => {
        const eventData = response.data;
        setEvent(eventData);
        
        console.log("eventData:");
        console.log(eventData);

        const isCurrentUserExecutor = eventData.executors.some(executor => executor.id === currentUser.id);
        setIsAssigned(isCurrentUserExecutor);
        fetchUsers();
        console.log("current user:");
        console.log(currentUser);
        console.log("event executor:");
        console.log(eventData.executors.map(executor => (executor.username)));
        console.log(eventData.executors.map(executor => (executor.id)));
      })
      .catch(error => {
        console.error('Error fetching event detail:', error);
      });
  }, [eventId]); 

  const fetchUsers = () => {
    adminService.getAllUsers() // Assuming you have a UserService with a getAllUsers method
      .then(response => {
        setUsers(response.data);
        console.log("users")
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  const handleSelectionChange = (selectedUserIds) => {
    console.error("selected users:  " + selectedUserIds);
    setExecutors({ executors: selectedUserIds });
    const executorsPayload = {
      executors: selectedUserIds
    };
    // console.log("executors" + executorsPayload.executors);

    eventService.adminExecutorsAssignment(eventId, executorsPayload)
      .then(() => {
        console.error('Update the event state with the new executors information');
      })
      .catch(error => {
        console.error('Error assigning executors:', error);
      });
  };

  const handleAssign = () => {
    if (isAssigned) {
      EventService.selfUnassignExecutor(event.id, currentUser.id)
        .then(() => {
          // Update the event state with the new executor information
          setEvent(prevEvent => ({
            ...prevEvent,
            executor: null,
          }));
          // Set isAssigned to false
          setIsAssigned(false);
        })
        .catch(error => {
          console.error('Error unassigning executor:', error);
        });
      // Unassign the current user from the event
      // Call the appropriate service method to unassign the user
      // Update the event state with the new executor information
      // Set isAssigned to false
    } else {
      // Assign the current user to the event
      console.log(event.id);
      console.log(currentUser.id);
    EventService.selfAssignExecutor(event.id, currentUser.id)
      .then(() => {
        // Update the event state with the new executor information
        setEvent(prevEvent => ({
          ...prevEvent,
          executor: {
            id: currentUser.id,
            username: currentUser.username,
            // Add other necessary executor properties
          },
        }));
        // Set isAssigned to true
        setIsAssigned(true);
      })
      .catch(error => {
        console.error('Error assigning executor:', error);
      });
      // Assign the current user to the event
      // Call the appropriate service method to assign the user
      // Update the event state with the new executor information
      // Set isAssigned to true
    }
  };

  const handleDelete = () => {
    EventService.deleteEvent(eventId)
      .then(() => {
        navigate('/events');
      })
      .catch(error => {
        console.error('Error deleting event:', error);
      });
  };

 const handleUpdate = () => {
  navigate(`/events/${eventId}/edit`);
  };

  const goToFacilityDetail = (facilityId) => {
    navigate(`/facilities/${facilityId}`); 
    facilityService.getFacilityDetails(facilityId)
      .then(response => {
        const detailedFacilityData = response.data;
        console.log(detailedFacilityData);
      })
      .catch(error => {
        console.error('Error fetching detailed facility data:', error);
      });
  };



 if (!event) {
    return <div>Loading event detail...</div>;
  }


  return (
    <div className="event-detail-container">
      <h2>{event.eventTitle} Detail Page</h2>
      <div className="event-detail">
        <div className="image">
          <img src={event.photoURL} alt={event.eventTitle} className="event-img" />
          <div className="content">
            <p>{event.eventTitle}</p>
          </div>
        </div>
          <p>Description: {event.eventDescription}</p>
          <strong>Facility:   </strong>
               <span className="facility-link" onClick={() => goToFacilityDetail(event.facilityDTO.id)} >
               {event.facilityDTO.facilityTitle} 
               </span>
          <p>Location: {event.eventLocation}</p>
          <p>Event Date: {event.eventDate}</p>
          <p>Urgency: {event.urgency}</p>
          <p>Event type: {event.eventType}</p>
          <p>Event state: {event.eventState}</p>
          {/* <p>Open Event date: {event.openEventDate}</p>
          <p>Closed Event date: {event.closedEventDate}</p> */}

        <div className="tasks-container">
          {event.tasks.length > 0 && <h3>Tasks</h3>}
            <ul>
              {event.tasks.map(task => (
              <li key={task.id}>
                <h4>{task.taskTitle}</h4>
                <p>{task.taskDescription}</p>
                <p>Deadline: {task.deadline}</p>
              </li>
              ))}
            </ul>
        </div>
        <div className="button-container">
          <button className="assign-button" onClick={handleAssign}>
            {isAssigned ? "Unassign" : "Assign"}
          </button>
        {currentUser && (currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_MODERATOR")) && (
            <>
              <button className="update-button" onClick={handleUpdate}>Update</button>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
            </>
        )}
        {currentUser && (currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_MODERATOR")) && (
          <>
            <button className="assign-executors-button" onClick={() => setIsModalOpen(true)}>
              Assign Executors
            </button>
            {isModalOpen && (
              <UserDropdown users={users} onSelectionChange={handleSelectionChange} />
            )}
          </>
        )}

        </div>
      </div>
      
    </div>
  );
}

export default EventDetail;