import axios from 'axios';
import authHeader from './auth-header';

const EVENT_URL = 'http://localhost:8080/events';
const ADMIN_URL = 'http://localhost:8080/admin-board';
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

  getAllUsers(){
    return axios.get(ADMIN_URL + `/get-users`, { headers: authHeader() });
  }

  promoteUser(userId){
    return axios.get(ADMIN_URL + `/promote/${userId}`, { headers: authHeader() });
  }

  demoteUser(userId){
    return axios.get(ADMIN_URL + `/demote/${userId}`, { headers: authHeader() });
  }
}

export default new AdminService();

