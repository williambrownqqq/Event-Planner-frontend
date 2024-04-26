import '../../styles/FacilityDetails.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import facilityService from '../../services/facility.service';
import eventService from '../../services/event.service';
import AuthService from "../../services/auth.service";

function FacilityDetail() {
  const { facilityId } = useParams();
  const [facility, setFacility] = useState(null);
  const [events, setEvents] = useState([]);
  const currentUser = AuthService.getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    facilityService.getFacilityDetails(facilityId)
      .then(response => {
        const facilityData = response.data;
        setFacility(facilityData);  
        console.log(facilityData);
      })
      .catch(error => {
        console.error('Error fetching facility detail:', error);
      });
    
  }, [facilityId]); // that's array of dependencies.  When you pass dependencies to this array, the effect will re-run whenever any of the dependencies change.
  // In your case, [facilityId] is an array containing a single element, facilityId. 
  // This means that the effect will re-run whenever the value of facilityId changes.
  
  useEffect(() => {
    facilityService.getFacilityEvents(facilityId)
      .then(response => {
        console.log("events ")
        const eventData = response.data;
        setEvents(eventData);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [facilityId]);

  const handleDelete = () => {
    facilityService.deleteFacility(facilityId)
      .then(() => {
        navigate(`/facilities`);
      })
      .catch(error => {
        console.error('Error deleting facility:', error);
      });
  };

  const handleUpdate = () => {
    navigate(`/facilities/${facilityId}/edit`);
  };

  const goToEventDetail = (eventId) => {
    navigate(`/events/${eventId}`);
    eventService.getEventsDetails(eventId)
      .then(response => {
        const detailedEventData = response.data;
        console.log(detailedEventData);
      })
      .catch(error => {
        console.error('Error fetching detailed event data:', error);
      });
  };

  if (!facility) {
    return <div>Loading facility detail...</div>;
  }

  return (
    <div className="facility-detail-container">
      <h2>{facility.facilityTitle} Detail Page</h2>
      <div className="facility-detail">
        <div className="image">
          <img src={facility.photoURL} alt="Facility" className="facility-img" />
          <div className="content">
            <h1> {facility.facilityTitle} </h1>
            {/* <p className="team-description">{facility.description}</p> */}
          </div>
        </div>

        {/* <h3 className="facility-name">{facility.facilityTitle}</h3> */}
        <p className="facility-description">
          <ul className="characteristics-list">
          <div className="event-list-container">
            <h1 className="event-list-title">List of Events</h1>
              <div className="event-list">
                {events.map(event => (
                  <div key={event.id} onClick={() => goToEventDetail(event.id)} className="card">
                    <img src={event.photoURL} alt="event" className="card-img-top" />
                    <div className="card-content">
                      <h3>{event.eventTitle}</h3>
                      <p>Urgency: {event.urgency}</p>
                      <p>Date: {event.openEventDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ul>
        </p>
        <div className="button-container">
          {currentUser && (currentUser.roles.includes("ROLE_ADMIN") || currentUser.roles.includes("ROLE_MODERATOR")) && (
            <>
              <button className="update-button" onClick={handleUpdate}>Update</button>
              <button className="delete-button" onClick={handleDelete}>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default FacilityDetail;