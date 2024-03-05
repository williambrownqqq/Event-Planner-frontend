import '../styles/TeamDetails.css'; 
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


function TeamDetail() {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    axios.get(`http://localhost:8085/teams/${teamId}`)
      .then(response => {
        const teamData = response.data;
        setTeam(teamData);  
        console.log(teamData);
      })
      .catch(error => {
        console.error('Error fetching team detail:', error);
      });
      axios.get(`http://localhost:8085/teams/${teamId}/players`)
      .then(response => {
        const playerData = response.data;
        setPlayers(playerData);
      })
      .catch(error => {
        console.error('Error fetching players:', error);
      });
  }, [teamId]);

  
  const handleDelete = () => {
    axios.delete(`http://localhost:8085/teams/${teamId}/delete`)
      .then(() => {
        navigate(`/teams`);
      })
      .catch(error => {
        console.error('Error deleting team:', error);
      });
  };

  const handleUpdate = () => {
    axios.get(`http://localhost:8085/teams/${teamId}/edit`)
      .then(() => {
        navigate(`/teams/${teamId}/edit`);
      })
      .catch(error => {
        console.error('Error editing team:', error);
      });
  };

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

  if (!team) {
    return <div>Loading team detail...</div>;
  }

  return (
    <div className="team-detail-container">
      <h2>{team.teamName} Detail Page</h2>
      <div className="team-detail">
        <div class="image">
          <img src={team.photoURL} alt="Team" className="team-img" />
          <div class="content">
            <h1> {team.description} </h1>
            <p className="team-description">{team.teamName}</p>
          </div>
        </div>

        <h3 className="team-name">{team.teamName}</h3>
        <p className="team-description">
          <ul className="characteristics-list">
          <div className="player-list-container">
            <h1 className="player-list-title">List of Players</h1>
              <div className="player-list">
                {players.map(player => (
                  <div key={player.id} onClick={() => goToPlayerDetail(player.id)} className="card">
                    <img src={player.photoURL} alt="player" className="card-img-top" />
                    <div className="card-content">
                      <h3>{player.firstName}</h3>
                      <p>{player.lastName}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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

export default TeamDetail;