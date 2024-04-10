import axios from 'axios';
import authHeader from './auth-header';

const EVENT_URL = 'http://localhost:8080/events';

class EventFormService {

 getEventUrgency(){
    return axios.get(EVENT_URL + `/urgencies`, { headers: authHeader() });
  }

  getEventType(){
    return axios.get(EVENT_URL + `/event-types`, { headers: authHeader() });
  }
  getEventState(){
    return axios.get(EVENT_URL + `/event-state`, { headers: authHeader() });
  }

  getEventUpdateData(eventId){
    return axios.get(EVENT_URL + `/${eventId}/edit`, { headers: authHeader() });
  }

  submitEventForm(eventForm){
    return axios.post(EVENT_URL + `/new`, eventForm, { headers: authHeader() });
  }

  updateEvent(eventId, eventData){
    return axios.put(EVENT_URL + `/${eventId}/edit`, eventData, { headers: authHeader() });
  }

}

export default new EventFormService();
