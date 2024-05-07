import axios from 'axios';
import authHeader from './auth-header';

const MONITORING_URL = 'http://localhost:8080/monitoring';

class MonitoringService {

  getData() {
    return axios.get(MONITORING_URL + '/get-data', { headers: authHeader() });  
  }


}

export default new MonitoringService();
