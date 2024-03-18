import '../../styles/FacilityList.css';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FacilityDetail from './FacilityDetail';
// import UserService from '../../services/user.service.js';
// import authHeader from '../../services/auth-header.js';
import FacilityService  from '../../services/facility.service.js';

function FacilityList() {
  // const [facilities, setFacilities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRespond, setSearchRespond] = useState([]);
  const navigate = useNavigate();


  // useEffect(() => {
  //   FacilityService.getFacilityList()
  //     .then(response => {
  //       const facilityList = response.data.facilities;
  //       console.log(response.data);
  //       setFacilities(facilityList);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching facility list:', error);
  //     });
  // }, []);



  useEffect(() => {
    FacilityService.searchFacilities(searchQuery)
      .then((response) => {
        console.log(searchQuery);
        const searchRespond = response.data;
        // console.log(searchRespond);
        setSearchRespond(searchRespond);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [searchQuery]);

  const goToFacilityDetail = (facilityId) => {
    navigate(`/facilities/${facilityId}`); 
    FacilityService.getFacilityDetails(facilityId)
      .then(response => {
        const detailedFacilityData = response.data;
        console.log(detailedFacilityData);
      })
      .catch(error => {
        console.error('Error fetching detailed facility data:', error);
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="team-list-container">
      <h1 className="team-list-title">List of Facilities</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search facilities by name..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="team-list">
        {searchRespond.map(facility => (
          <div key={facility.id} onClick={() => goToFacilityDetail(facility.id)} className="card">
            <img src={facility.photoURL} alt="facility" className="card-img-top" />
            <div className="card-content">
              <h3>{facility.facilityTitle}</h3>
              {/* <p>{facility.description}</p> */}
            </div>
          </div>
        ))}
      </div>
      
        <Routes>
           <Route path="/facilities/:id" element={<FacilityDetail />} />
        </Routes>
    </div>
  );
}

export default FacilityList;

