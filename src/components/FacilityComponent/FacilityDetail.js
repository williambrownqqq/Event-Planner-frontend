import '../styles/FacilityDetails.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function FacilityDetail() {
  const { facilityId } = useParams();
  const [facility, setFacility] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`http://localhost:8080/facilities/${facilityId}`)
      .then(response => {
        const facilityData = response.data;
        setFacility(facilityData);  
        console.log(facilityData);
      })
      .catch(error => {
        console.error('Error fetching facility detail:', error);
      });
      axios.get(`http://localhost:8080/facilities/${facilityId}/events`)
      .then(response => {
        const eventData = response.data;
        setEvents(eventData);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, [facilityId]);

  
  const handleDelete = () => {
    axios.delete(`http://localhost:8080/faciities/${facilityId}/delete`)
      .then(() => {
        navigate(`/facilities`);
      })
      .catch(error => {
        console.error('Error deleting facility:', error);
      });
  };

  const handleUpdate = () => {
    axios.get(`http://localhost:8080/facilities/${facilityId}/edit`)
      .then(() => {
        navigate(`/facilities/${facilityId}/edit`);
      })
      .catch(error => {
        console.error('Error editing facility:', error);
      });
  };

  const goToEventDetail = (eventId) => {
    navigate(`/events/${eventId}`);

    axios.get(`http://localhost:8080/events/${eventId}`)
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
      <h2>{team.teamName} Detail Page</h2>
      <div className="team-detail">
        <div class="image">
          <img src={team.photoURL} alt="Team" className="team-img" />
          <div class="content">
            <h1> {team.description} </h1>
            <p className="team-description">{team.teamName}</p>
          </div>
        </div>

        <h3 className="team-name">{team.teamName}</h3>
        <p className="team-description">
          <ul className="characteristics-list">
          <div className="player-list-container">
            <h1 className="player-list-title">List of Players</h1>
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