import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/PlayerForm.css';

function PlayerEditForm() {
  const { playerId } = useParams();
  const navigate = useNavigate();

  const [teams, setTeams] = useState([]);
  const [eyeColors, setEyeColors] = useState([]);
  const [hairColors, setHairColors] = useState([]);
  const [playerPositions, setPlayerPositions] = useState([]);
  const [playerStatuses, setPlayerStatuses] = useState([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    photoURL: '',
    teamId: null,
    team: null,
    nicknames: [],
    weight: null,
    height: null,
    eyeColor: null,
    hairColor: null,
    citizenship: '',
    dateOfBirth: '',
    placeOfBirth: '',
    languages: [],
    playerPosition: null,
    status: null,
    // teamname: null,
    // nicks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'teamId') {
      const selectedTeam = teams.find(team => team.id === parseInt(value));
      setFormData({
        ...formData,
        team: selectedTeam,
        [name]: parseInt(value), // Update teamId separately
      });
    } else if (name === 'nicknames') {
      // const nickNamesArray = delimitedStringToArray(value, ', '); 
      
      const nickNamesArray = value.split(',').map(nickname => nickname.trim());
      setFormData({
        ...formData,
        nicknames: nickNamesArray, 
        // nicks: value,
      });
    } else if (name === 'languages') {
        const languagesArray = value.split(',').map(language => language.trim());
        setFormData({
          ...formData,
          languages: languagesArray, 
        });
    } else {
        setFormData({
        ...formData,
        [name]: value,
      });
      }
  };

  useEffect(() => {
    // Fetch player data based on playerId and set it in formData
    axios.get(`http://localhost:8085/players/${playerId}`)
      .then(response => {
        const playerData = response.data;
        // const selectedTeam = playerData.team;
        // setFormData({
        //     ...playerData,
        //     teamId: selectedTeam ? selectedTeam.id : '', // Set the selected team's id if available
        //     team: selectedTeam ? selectedTeam.teamName : '', // Set the selected team name if available
        //   });
        // console.log('team: '+ selectedTeam);
        // const selectedTeamName = playerData.team.teamName;
        // console.log('teamName: ' + selectedTeamName);
        // console.log(playerData);

        // const selectedTeam = playerData.team;
        // const selectedTeamName = selectedTeam ? selectedTeam.teamName : null; // Set teamName to null if there's no selected team
        // console.log('team: ' + selectedTeam);
        // console.log('teamName: ' + selectedTeamName);
        // console.log(playerData);
        // setFormData({
        //     ...playerData,
        //     teamName: selectedTeamName, // Set the teamName in formData
        // });
        console.log(playerData);
        setFormData(playerData);
        // const nicknamesString = playerData.nicknames.map(nicknameObj => nicknameObj.nickname).join(', ');
        // setFormData(f => ({
        //   ...f,
        //   nicks: nicknamesString,
        // }));
        // console.log(formData.nicks)
      })
      .catch(error => {
        console.error('Error fetching player data:', error);
      });

      axios.get('http://localhost:8085/teams')
      .then(response => {
        const teamsData = response.data.teams;
        console.log(teamsData)
        setTeams(teamsData);
      })
      .catch(error => {
        console.error('Error fetching teams:', error);
      });

        // Fetch the list of eye colors from the backend
      axios.get('http://localhost:8085/players/eye-colors')
      .then(response => {
        const eyeColorsData = response.data;
        setEyeColors(eyeColorsData);
  
      })
      .catch(error => {
        console.error('Error fetching eye colors:', error);
      });

      axios.get('http://localhost:8085/players/hair-colors')
          .then(response => {
            const hairColorsData = response.data; // Assuming the API directly returns an array of strings
            setHairColors(hairColorsData);
      })
      .catch(error => {
          console.error('Error fetching hair colors:', error);
      });

        // Fetch the list of eye colors from the backend
      axios.get('http://localhost:8085/players/playerPositions')
      .then(response => {
        const playersPositionsData = response.data;
        setPlayerPositions(playersPositionsData);    
      })
      .catch(error => {
        console.error('Error fetching players Positions:', error);
      });

      axios.get('http://localhost:8085/players/playerStatuses')
      .then(response => {
        const playersStatusesData = response.data;
        setPlayerStatuses(playersStatusesData);    
      })
      .catch(error => {
        console.error('Error fetching players Statuses:', error);
      });


  }, [playerId]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Send a PUT request to update the player data on the server
    axios.put(`http://localhost:8085/players/${playerId}/edit`, formData)
      .then(response => {
        console.log('Player updated:', response.data);
        navigate('/players');
      })
      .catch(error => {
        console.error('Error updating player:', error);
      });
  };

  return (
    <div className="player-form-container">
      <h2>Update {formData.firstName} {formData.lastName}</h2>
      <form className="player-form" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <label>
          Photo URL:
          <input type="text" name="photoURL" value={formData.photoURL} onChange={handleChange} />
        </label>
        <label>
          Nicknames:
          <input
            type="text"
            name="nicknames"
            value={formData.nicknames.map(nicknameObj => nicknameObj.nickname).join(', ')} // Convert array to a comma-separated string
            onChange={handleChange}
          />
        </label>
        <label>
          weight:
          <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
        </label>
        <label>
          height:
          <input type="text" name="height" value={formData.height} onChange={handleChange} />
        </label>
        <label>
          Eye Color: 	&nbsp;
          <select name="eyeColor" value={formData.eyeColor} onChange={handleChange}>
            <option value="">Select eye color</option>
            {eyeColors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <label>
          Hair Color: 	&nbsp;
          <select name="hairColor" value={formData.hairColor} onChange={handleChange}>
            <option value="">Select hair color</option>
            {hairColors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>
        <label>
          Team:	&nbsp;
          <select name="teamId" value={formData.teamId} onChange={handleChange}>
            <option value="">Select a team</option>
            {teams.map(team => (
              <option key={team.id} value={team.id} >
                {team.teamName}
              </option>
            ))}
          </select>
        </label>
        <label>
          Player Position: 	&nbsp;
          <select name="playerPosition" value={formData.playerPosition} onChange={handleChange}>
            <option value="">Select player position</option>
            {playerPositions.map(position => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </label>
        <label>
          Player Status:	&nbsp;
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="">Select player status</option>
            {playerStatuses.map(playerStatus => (
              <option key={playerStatus} value={playerStatus}>
                {playerStatus}
              </option>
            ))}
          </select>
        </label>

        <label>
      Date of Birth:
      <input
        type="date"
        name="dateOfBirth"
        value={formData.dateOfBirth}
        onChange={handleChange}
      />
    </label>
    
    <label>
      Citizenship:
      <input
        type="text"
        name="citizenship"
        value={formData.citizenship}
        onChange={handleChange}
      />
    </label>
    <label>
        Languages spoken:
          <input
            type="text"
            name="languages"
            value={formData.languages.map(language => language.language).join(', ')} // Convert array to a comma-separated string
            onChange={handleChange}
          />
    </label>
    <label>
      Place of Birth:
      <input
        type="text"
        name="placeOfBirth"
        value={formData.placeOfBirth}
        onChange={handleChange}
      />
    </label>

        <button type="submit">Update Player</button>
      </form>
    </div>
  );
}

export default PlayerEditForm;