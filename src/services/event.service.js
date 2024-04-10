import axios from 'axios';
import authHeader from './auth-header';

const EVENT_URL = 'http://localhost:8080/events';

class EventService {

  getEventList() {
    return axios.get(EVENT_URL , { headers: authHeader() });  
  }

//   getEventDetails(eventId){
//     return axios.get(EVENT_URL + `/${eventId}`, { headers: authHeader() });
//   }

  getEventsDetails(eventID){
    return axios.get(EVENT_URL + `/${eventID}`, { headers: authHeader() });
  }

  createEvent(eventData){
    return axios.post(EVENT_URL + `/new`, eventData, { headers: authHeader() });
  }

  updateEvent(eventId, eventData){
    return axios.put(EVENT_URL + `/${eventId}/edit`, eventData, { headers: authHeader() });
  }

  deleteEvent(eventId){
    return axios.delete(EVENT_URL + `/${eventId}/delete`, { headers: authHeader() });
  }

  searchEvents(searchQuery){
    return axios.get(EVENT_URL  + `/search?query=${searchQuery}`, { headers: authHeader() })
  }
}

export default new EventService();
