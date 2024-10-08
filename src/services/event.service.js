import axios from 'axios';
import authHeader from './auth-header';

const EVENT_URL = 'http://localhost:8080/events';
const MANAGEMENT_URL = 'http://localhost:8080/assign-event';
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
    return axios.get(EVENT_URL  + `/search?query=${searchQuery}`, { headers: authHeader() });
  }

  selfAssignExecutor(eventId, executorId) {
    return axios.put(MANAGEMENT_URL + `/${eventId}/self-assign/${executorId}`, { headers: authHeader() });
  }

  selfUnassignExecutor(eventId, executorId) {
    return axios.put(MANAGEMENT_URL + `/${eventId}/self-unassign/${executorId}`, { headers: authHeader() });
  }

  adminExecutorsAssignment(eventId, executors) {
    return axios.put(MANAGEMENT_URL + `/${eventId}/assign`, executors, { headers: authHeader() });
  }
}

export default new EventService();
