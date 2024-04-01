import axios from 'axios';
import authHeader from './auth-header';

const EVENT_URL = 'http://localhost:8080/events';

class AdminService {

  getAdminManageFaciitiesBoard() {
    return 'Manage Facilities';
  }

  getAdminManageEventsBoard() {
    return 'Manage Events';
  }

  getAdminManageUsersBoard() {
    return 'Manage Users';
  }

  submitEventForm(){
    return axios.get(EVENT_URL + `/new`, { headers: authHeader() });
  }

}

export default new AdminService();

