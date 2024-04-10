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

  getFacilityUpdateData(facilityId){
    return axios.get(FACILITY_URL + `/${facilityId}/edit`, { headers: authHeader() });
  }

  deleteFacility(facilityId){
    console.log(facilityId);
    return axios.delete(FACILITY_URL + `/${facilityId}/delete`, { headers: authHeader() });
  }

  searchFacilities(searchQuery){
    return axios.get(FACILITY_URL + `/search?query=${searchQuery}`, { headers: authHeader() });
  }

  submitFacilityForm(facilityForm){
    return axios.post(FACILITY_URL + `/new`, facilityForm, { headers: authHeader() });
  }
}

export default new FacilityService();
