import '../../styles/EventDetails.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventService from '../../services/event.service.js';
import facilityService from '../../services/facility.service.js';
function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  // const [task, setTask] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   EventService.getEventsDetails(eventId)
      .then(response => {
        const eventData = response.data;
        setEvent(eventData);
        console.log("eventData");
        console.log(eventData);
      })
      .catch(error => {
        console.error('Error fetching event detail:', error);
      });
  }, [eventId]);

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
    EventService.updateEvent(eventId)
      .then(() => {
        navigate(`/events/${eventId}/edit`);
      })
      .catch(error => {
        console.error('Error editing event:', error);
      });
  };

  // const goToEventDetail = (eventId) => {
  //   navigate(`/events/${eventId}`);
  //   EventService.getEventDetails(eventId)
  //     .then(response => {
  //       const detailedEventData = response.data;
  //       console.log(detailedEventData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching detailed event data:', error);
  //     });
  // };

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
          <p>Action: {event.action}</p>
          <p>Open Event date: {event.openEventDate}</p>
          <p>Closed Event date: {event.closedEventDate}</p>

        <div className="tasks-container">
          <h3>Tasks</h3>
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
          <button className="update-button" onClick={handleUpdate}>Update</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
      
    </div>
  );
}

export default EventDetail;