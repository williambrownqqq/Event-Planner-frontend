import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/FacilityForm.css';
import facilityService from '../../services/facility.service';

function FacilityForm() {
  const [formData, setFormData] = useState({
    facilityTitle: '',
    photoURL: '',
    description: '',
    events: []
  });
  const [errors, setErrors] = useState({
    facilityTitle: '',
    photoURL: '',
    description: '',
    events: []
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    facilityService.submitFacilityForm(formData)
      .then(response => {
        console.log('Facility created:', response.data);
        navigate('/facilities');
        setErrors({});
      })
      .catch(error => {
        if (error.response && error.response.status === 400) {
          console.log('Validation errors:', error.response.data);
          // Map the errors to the corresponding fields
          const errors = {};
          for (const key in error.response.data.errors) {
            errors[key] = error.response.data.errors[key];
          }
          setErrors(errors);
        } else {
          console.log("errors");
          console.log(error.response);
          console.error('Failed to save facility:', error);
        }
      });
  };

  return (
    <div className="team-form-container">
      <h2>Create New Facility</h2>
      <form className="team-form" onSubmit={handleSubmit}>
        <label>
          Facility Title:
          <input type="text" name="facilityTitle" value={formData.facilityTitle} onChange={handleChange} />
          {errors.facilityTitle && <div className="error">{errors.facilityTitle}</div>}
        </label>
        <label>
          Photo URL:
          <input type="text" name="photoURL" value={formData.photoURL} onChange={handleChange} />
          {errors.photoURL && <div className="error">{errors.photoURL}</div>}
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
          {errors.description && <div className="error">{errors.description}</div>}
        </label>

        <button type="submit">Create Facility</button>
      </form>
    </div>
  );
}

export default FacilityForm;