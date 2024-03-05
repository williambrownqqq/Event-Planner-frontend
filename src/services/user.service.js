import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/test/';

const FACILITY_URL = 'http://localhost:8080/facilities';
const EVENTS_URL = 'http://localhost:8080/events';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }

  getFacilityList() {
    return axios.get(FACILITY_URL);
  }

  getEventList() {
    return axios.get(EVENTS_URL);
  }
}

export default new UserService();
