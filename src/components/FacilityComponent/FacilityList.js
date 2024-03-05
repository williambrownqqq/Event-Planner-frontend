import '../styles/FacilityList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FacilityDetail from './FacilityDetail';

function FacilityList() {
  // const [teams, setTeams] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRespond, setSearchRespond] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get('http://localhost:8085/teams')
  //     .then(response => {
  //       const teamsData = response.data.teams;
  //       setTeams(teamsData);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/facilities/search?query=${searchQuery}`)
      .then((response) => {
        console.log(searchQuery);
        const searchRespond = response.data;
        console.log(searchRespond);
        setSearchRespond(searchRespond);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [searchQuery]);

  const goToFacilityDetail = (facilityId) => {
    navigate(`/facilities/${facilityId}`); 

    axios.get(`http://localhost:8081/facilities/${facilityId}`)
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
              <h3>{facility.gangName}</h3>
              <p>{facility.description}</p>
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

