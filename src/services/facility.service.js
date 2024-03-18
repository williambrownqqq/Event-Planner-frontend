import axios from 'axios';
import authHeader from './auth-header';

const FACILITY_URL = 'http://localhost:8080/facilities';

class FacilityService {

  getFacilityList() {
    return axios.get(FACILITY_URL, { headers: authHeader() });  
  }

  getFacilityDetails(facilityId){
    return axios.get(FACILITY_URL + `/${facilityId}`, { headers: authHeader() });
  }

  getFacilityEvents(facilityId){
    return axios.get(FACILITY_URL + `/${facilityId}/events`, { headers: authHeader() });
  }

  updateFacility(facilityId, facilityData){
    return axios.put(FACILITY_URL + `/${facilityId}/edit`, facilityData, { headers: authHeader() });
  }

  deleteFacility(facilityId){
    return axios.delete(FACILITY_URL + `/${facilityId}`, { headers: authHeader() });
  }

  searchFacilities(searchQuery){
    return axios.get(FACILITY_URL + `/search?query=${searchQuery}`, { headers: authHeader() });
  }

//   getFacilityEvents(facilityID){
//     return axios.get(FACILITY_URL + `/${facilityID}/events`, { headers: authHeader() });
//   }
}

export default new FacilityService();
