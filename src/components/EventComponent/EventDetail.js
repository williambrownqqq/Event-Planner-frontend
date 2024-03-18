import '../../styles/EventDetails.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EventService from '../../services/event.service.js';

function EventDetail() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  // const [task, setTask] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   EventService.getEventsDetails(eventId)
      .then(response => {
        const eventData = response.data;
        setEvent(eventData)
        console.log(response.data)
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
    EventService.updateEventevent(eventId)
      .then(() => {
        navigate(`/events/${eventId}/edit`);
      })
      .catch(error => {
        console.error('Error editing player:', error);
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

 if (!event) {
    return <div>Loading event detail...</div>;
  }
  return (
    <div className="player-detail-container">
      <h2>{event.eventTitle} Detail Page</h2>
      <div className="player-detail">
        <div className="image">
          <img src={event.photoURL} alt="Player" className="player-img" />
          <div className="content">
            {/* <h1> {player.firstName} {player.lastName} </h1>
            <p> {player.playerPosition}</p> */}
          </div>
        </div>

        {/* <h3 className="player-name">{player.firstName} {player.lastName}</h3>
        <p className="player-description">
          <ul className="characteristics-list">
          <li><strong>Nicknames:</strong> {player.nicknames.map(nickname => nickname.nickname).join(', ')}</li>
            <li>
              <strong>Team:   </strong>
               <span className="team-link" onClick={() => goToTeamDetail(event.facilityDTO.id)} >
               {player.team.teamName} 
               </span>
            </li>
            <li><strong>Player Position:</strong> {player.playerPosition}</li>
            <li><strong>Player Status:</strong> {player.status}</li>
            <li><strong>Height:</strong> {player.height} cm</li>
            <li><strong>Weight:</strong> {player.weight} kg</li>
            <li><strong>Eye Color:</strong> {player.eyeColor}</li>
            <li><strong>Hair Color:</strong> {player.hairColor}</li>
            <li><strong>Birth Date:</strong> {player.dateOfBirth}</li>
            <li><strong>Place of Birth:</strong> {player.placeOfBirth}</li>
            <li><strong>Citizenship:</strong> {player.citizenship}</li>
            <li><strong>Languages Spoken:</strong> {player.languages.map(language => language.language).join(', ')}</li>
          </ul>
        </p> */}
        <div className="button-container">
          <button className="update-button" onClick={handleUpdate}>Update</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default EventDetail;