import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/TeamForm.css';

function TeamEditForm() {
    const { teamId } = useParams();
    const [formData, setFormData] = useState({
        teamName: '',
        photoURL: '',
        description: ''
    });
    const [errors, setErrors] = useState({
    teamName: '',
    photoURL: '',
    description: ''
    });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8085/teams/${teamId}`)
      .then(response => {
        const teamData = response.data;
        console.log(teamData);
        setFormData(teamData);
      })
      .catch(error => {
        console.error('Error fetching team data:', error);
      });

  }, [teamId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.put(`http://localhost:8085/teams/${teamId}/edit`, formData)
      .then(response => {
        console.log('Team updated:', response.data);
        navigate('/teams');
        setErrors({});
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log('Validation errors:', error.response.data);
          setErrors(error.response.data);
        } else {
          console.error('Failed to save team:', error);
        }
      });
  };

  return (
    <div className="team-form-container">
      <h2>Edit {formData.teamName} Team</h2>
      <form className="team-form" onSubmit={handleSubmit}>
        <label>
          Team Name:
          <input type="text" name="teamName" value={formData.teamName} onChange={handleChange} />
          {errors.teamName && <div className="error">{errors.teamName}</div>}
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
          {errors.description && <div className="error">{errors.description}</div>}
        </label>
        <label>
          Photo URL:
          <input type="text" name="photoURL" value={formData.photoURL} onChange={handleChange} />
          {errors.photoURL && <div className="error">{errors.photoURL}</div>}
        </label>
        
        <button type="submit">Edit Team</button>
      </form>
    </div>
  );
}

export default TeamEditForm;