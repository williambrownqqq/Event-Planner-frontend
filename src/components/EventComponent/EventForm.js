import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PlayerForm.css';

function PlayerForm() {
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
    });
    const [errors, setErrors] = useState({
      firstName: '',
      lastName: '',
      citizenship: '',
      weight: null,
      height: null,
      placeOfBirth: '',
    });
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    const [eyeColors, setEyeColors] = useState([]);
    const [hairColors, setHairColors] = useState([]);
    const [playerPositions, setPlayerPositions] = useState([]);
    const [playerStatuses, setPlayerStatuses] = useState([]);

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
        const nickNamesArray = value.split(',').map(nickname => nickname.trim());
        setFormData({
          ...formData,
          nicknames: nickNamesArray, 
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
    axios.get('http://localhost:8085/teams')
      .then(response => {
        const teamsData = response.data.teams;
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

  }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      axios.post('http://localhost:8085/players/new', formData)
        .then(response => {
          console.log('Player created:', response.data);
          navigate('/players');
          setErrors({});
        })
        .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log('Validation errors:', error.response.data);
          setErrors(error.response.data);
        } else {
          console.error('Failed to save player:', error);
        }
      });
    };
  
    return (
        <div className="player-form-container">
          <h2>Create New Player</h2>
          <form className="player-form" onSubmit={handleSubmit}>
            <label>
              First Name:
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
              {errors.firstName && <div className="error">{errors.firstName}</div>}
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
              {errors.lastName && <div className="error">{errors.lastName}</div>}
            </label>
            <label>
              Photo URL:
              <input type="text" name="photoURL" value={formData.photoURL} onChange={handleChange} />
              {errors.photoURL && <div className="error">{errors.photoURL}</div>}
            </label>
            <label>
              Nicknames:
              <input
                type="text"
                name="nicknames"
                value={formData.nicknames.join(', ')} // Convert array to a comma-separated string
                onChange={handleChange}
              />
            </label>
            <label>
              weight:
              <input type="text" name="weight" value={formData.weight} onChange={handleChange} />
              {errors.weight && <div className="error">{errors.weight}</div>}
            </label>
            <label>
              height:
              <input type="text" name="height" value={formData.height} onChange={handleChange} />
              {errors.height && <div className="error">{errors.height}</div>}
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
                  <option key={team.id} value={team.id}>
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
          {errors.citizenship && <div className="error">{errors.citizenship}</div>}
        </label>
        <label>
            Languages spoken:
              <input
                type="text"
                name="languages"
                value={formData.languages.join(', ')} // Convert array to a comma-separated string
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
          {errors.placeOfBirth && <div className="error">{errors.placeOfBirth}</div>}
        </label>

            <button type="submit">Create Player</button>
          </form>
        </div>
      );
  }
  
  export default PlayerForm;