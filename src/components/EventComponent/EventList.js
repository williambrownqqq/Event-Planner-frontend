import '../../styles/EventList.css';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import EventDetail from './EventDetail';
import EventService from '../../services/event.service.js';
// import authHeader from '../../services/auth-header.js';

function EventList() {
  //const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRespond, setSearchRespond] = useState([]);
  const navigate = useNavigate();
  
  // useEffect(() => {
  //   // Fetch the event list using the getEventList() function from UserService
  //   EventService.getEventList()
  //     .then(response => {
  //       const eventList = response.data.events;
  //       // console.log(response.data);
  //       // console.log(response.data.events);
  //       // console.log(eventList);
  //       setEvents(eventList);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching event list:', error);
  //     });
  // }, []); // Empty dependency array means this effect will run once on component mount


  useEffect(() => {
    EventService.searchEvents(searchQuery)
      .then((response) => {
        console.log(searchQuery);
        const searchRespond = response.data;
        console.log(searchRespond);
        // setEvents(searchRespond)
        setSearchRespond(searchRespond);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [searchQuery]); // This effect will run whenever the searchQuery changes
  
  const goToEventDetail = (eventId) => {
    navigate(`/events/${eventId}`);
    EventService.getEventsDetails(eventId)
      .then(response => {
        const detailedEventData = response.data;
        console.log(detailedEventData);
      })
      .catch(error => {
        console.error('Error fetching detailed event data:', error);
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="event-list-container">
      <h1 className="event-list-title">List of Events</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search events by name..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="event-list">
        {searchRespond.map(event => (
          <div key={event.id} onClick={() => goToEventDetail(event.id)} className="card">
            <img src={event.photoURL} alt="event" className="card-img-top" />
            <div className="card-content">
              <h3>{event.eventTitle}</h3>
              {/* If you have additional properties or logic to handle, you can add them here */}
            </div>
          </div>
        ))}
      </div>
      
      <Routes>
        <Route path="/events/:id" element={<EventDetail />} />
      </Routes>
    </div>
  );
}

export default EventList;


