import '../styles/PlayerList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import PlayerDetail from './PlayerDetail';

function PlayerList() {
  // const [players, setPlayers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRespond, setSearchRespond] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get('http://localhost:8085/players')
  //     .then(response => {
  //       const playerData = response.data.players;
  //       setPlayers(playerData);
  //       console.log(playerData)
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8085/players/search?query=${searchQuery}`)
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
  
  const goToPlayerDetail = (playerId) => {
    navigate(`/players/${playerId}`);

    axios.get(`http://localhost:8085/players/${playerId}`)
      .then(response => {
        const detailedPlayerData = response.data;
        console.log(detailedPlayerData);
      })
      .catch(error => {
        console.error('Error fetching detailed player data:', error);
      });
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="player-list-container">
      <h1 className="player-list-title">List of Players</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search players by name..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      <div className="player-list">
        {searchRespond.map(player => (
          <div key={player.id} onClick={() => goToPlayerDetail(player.id)} className="card">
            <img src={player.photoURL} alt="player" className="card-img-top" />
            <div className="card-content">
              <h3>{player.firstName} {player.lastName}</h3>
              <p>{player.nicknames.map(nickname => nickname.nickname).join(', ')}</p>
            </div>
          </div>
        ))}
      </div>
      
      <Routes>
        <Route path="/players/:id" element={<PlayerDetail />} />
      </Routes>
    </div>
  );
}

export default PlayerList;


