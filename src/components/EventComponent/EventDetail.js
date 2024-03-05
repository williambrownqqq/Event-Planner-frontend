import '../styles/PlayerDetails.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function PlayerDetail() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8085/players/${playerId}`)
      .then(response => {
        const playerData = response.data;
        setPlayer(playerData);
        console.log(response.data)
        console.log(playerData)
      })
      .catch(error => {
        console.error('Error fetching player detail:', error);
      });
  }, [playerId]);

  const handleDelete = () => {
    axios.delete(`http://localhost:8085/players/${playerId}/delete`)
      .then(() => {
        navigate('/players'); // Use navigate to redirect after deletion
      })
      .catch(error => {
        console.error('Error deleting player:', error);
      });
  };

  if (!player) {
    return <div>Loading player detail...</div>;
  }

  const handleUpdate = () => {
    axios.get(`http://localhost:8085/players/${playerId}/edit`)
      .then(() => {
        navigate(`/players/${playerId}/edit`);
      })
      .catch(error => {
        console.error('Error editing player:', error);
      });
  };

  const goToTeamDetail = (teamId) => {
    navigate(`/teams/${teamId}`);

    axios.get(`http://localhost:8085/teams/${teamId}`)
      .then(response => {
        const detailedTeamData = response.data;
        console.log(detailedTeamData);
      })
      .catch(error => {
        console.error('Error fetching detailed player data:', error);
      });
  };

  return (
    <div className="player-detail-container">
      <h2>{player.firstName} {player.lastName} Detail Page</h2>
      <div className="player-detail">
        <div class="image">
          <img src={player.photoURL} alt="Player" className="player-img" />
          <div class="content">
            <h1> {player.firstName} {player.lastName} </h1>
            <p> {player.playerPosition}</p>
          </div>
        </div>

        <h3 className="player-name">{player.firstName} {player.lastName}</h3>
        <p className="player-description">
          <ul className="characteristics-list">
          <li><strong>Nicknames:</strong> {player.nicknames.map(nickname => nickname.nickname).join(', ')}</li>
            <li>
              <strong>Team:   </strong>
               <span className="team-link" onClick={() => goToTeamDetail(player.team.id)} >
               {player.team.teamName} 
               </span>
            </li>
            <li><strong>Player Position:</strong> {player.playerPosition}</li>
            <li><strong>Player Status:</strong> {player.status}</li>
            <li><strong>Height:</strong> {player.height} cm</li>
            <li><strong>Weight:</strong> {player.weight} kg</li>
            <li><strong>Eye Color:</strong> {player.eyeColor}</li>
            <li><strong>Hair Color:</strong> {player.hairColor}</li>
            <li><strong>Birth Date:</strong> {player.dateOfBirth}</li>
            <li><strong>Place of Birth:</strong> {player.placeOfBirth}</li>
            <li><strong>Citizenship:</strong> {player.citizenship}</li>
            <li><strong>Languages Spoken:</strong> {player.languages.map(language => language.language).join(', ')}</li>
          </ul>
        </p>
        <div className="button-container">
          <button className="update-button" onClick={handleUpdate}>Update</button>
          <button className="delete-button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default PlayerDetail;