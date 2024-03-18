import '../../styles/FacilityDetails.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import facilityService from '../../services/facility.service';

function FacilityDetail() {
  const { facilityId } = useParams();
  const [facility, setFacility] = useState(null);
  const [events, setEvents] = useState([]);
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
    facilityService.updateFacility(facilityId, )
      .then(() => {
        navigate(`/facilities/${facilityId}/edit`);
      })
      .catch(error => {
        console.error('Error editing facility:', error);
      });
  };

  const goToEventDetail = (eventId) => {
    navigate(`/events/${eventId}`);
    facilityService.getFacilityDetails(eventId)
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
    <div className="team-detail-container">
      <h2>{facility.facilityTitle} Detail Page</h2>
      <div className="team-detail">
        <div className="image">
          <img src={facility.photoURL} alt="Team" className="team-img" />
          <div className="content">
            <h1> {facility.facilityTitle} </h1>
            {/* <p className="team-description">{facility.description}</p> */}
          </div>
        </div>

        <h3 className="team-name">{facility.teamName}</h3>
        <p className="team-description">
          <ul className="characteristics-list">
          <div className="player-list-container">
            <h1 className="player-list-title">List of Events</h1>
              <div className="player-list">
                {events.map(event => (
                  <div key={event.id} onClick={() => goToEventDetail(event.id)} className="card">
                    <img src={event.photoURL} alt="event" className="card-img-top" />
                    <div className="card-content">
                      <h3>{event.firstName}</h3>
                      <p>{event.lastName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ul>
        </p>
        <div className="button-container">
          <button className="update-button" onClick={handleUpdate}>Update</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default FacilityDetail;