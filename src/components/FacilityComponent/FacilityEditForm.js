import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/FacilityForm.css';

function FacilityEditForm() {
    const { facilityId } = useParams();
    const [formData, setFormData] = useState({
        facilityName: '',
        photoURL: '',
        description: ''
    });
    const [errors, setErrors] = useState({
    facilityName: '',
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
    axios.get(`http://localhost:8080/facilities/${facilityId}`)
      .then(response => {
        const facilityData = response.data;
        console.log(facilityData);
        setFormData(facilityData);
      })
      .catch(error => {
        console.error('Error fetching facility data:', error);
      });

  }, [facilityId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios.put(`http://localhost:8080/facilities/${facilityId}/edit`, formData)
      .then(response => {
        console.log('Facility updated:', response.data);
        navigate('/facilities');
        setErrors({});
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log('Validation errors:', error.response.data);
          setErrors(error.response.data);
        } else {
          console.error('Failed to save facility:', error);
        }
      });
  };

  return (
    <div className="team-form-container">
      <h2>Edit {formData.facilityName} Facility</h2>
      <form className="team-form" onSubmit={handleSubmit}>
        <label>
          Facility Name:
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

export default FacilityEditForm;