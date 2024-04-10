import React, { useState, useEffect  } from 'react';
import '../../styles/EventForm.css';
import { useNavigate } from 'react-router-dom';

import facilityService from '../../services/facility.service';
import eventFormService from '../../services/event-form.service';

import AddDynamicInputFields from './AddDynamicInputFields';

function EventForm() {
    const [formData, setFormData] = useState({
      eventTitle: '',
      photoURL: '',
      eventDescription: '',
      facilityDTO: null,
      eventLocation: '',
      eventDate: '',
      urgency: null,
      eventType: null,
      eventState: null,
      openEventDate: '',
      closedEventDate: '',
      tasks: [],
    });
    const [errors, setErrors] = useState({
      eventTitle: '',
      photoURL: '',
      eventDescription: '',
      facilityDTO: null,
      eventLocation: '',
      eventDate: '',
      urgency: null,
      eventType: null,
      eventState: null,
      openEventDate: '',
      closedEventDate: '',
      tasks: [],
    });
    const [facilities, setFacilities] = useState([]);
    const navigate = useNavigate();

    const [urgencies, setUrgency] = useState([]);
    const [eventTypes, setEventType] = useState([]);
    const [eventStates, setEventState] = useState([]);

    const handleChange = (e) => {
      const { name, value } = e.target;

      if (name === 'facilityId') {
        const selectedFacility = facilities.find(facility => facility.id === parseInt(value));
        setFormData({
          ...formData,
          facilityDTO: selectedFacility,
          [name]: parseInt(value), // Update facilityId separately
        });
      } else if (name === 'tasks') {
        const tasksArray = value.split(',').map(task => task.trim()); //todo
        setFormData({
          ...formData,
          tasks: tasksArray, 
        });
      } else {
          setFormData({
          ...formData,
          [name]: value,
        });
        }
    };

    useEffect(() => {
    facilityService.getFacilityList()
      .then(response => {
        const facilitiesData = response.data.facilities;
        console.log("facilities: ")
        console.log(facilitiesData)
  
        if (Array.isArray(facilitiesData)) {
          setFacilities(facilitiesData);
        }
      })
      .catch(error => {
        console.error('Error fetching facilities:', error);
      });


      eventFormService.getEventUrgency()
      .then(response => {
        const urgencyData = response.data;
        console.log("urgencies: ");
        console.log(urgencyData);
        setUrgency(urgencyData);
  
      })
      .catch(error => {
        console.error('Error fetching urgencies:', error);
      });

      eventFormService.getEventType()
        .then(response => {
          const eventTypeData = response.data; 
          console.log("event Type: ");
          console.log(eventTypeData);
          setEventType(eventTypeData);
      })
      .catch(error => {
          console.error('Error fetching event types:', error);
      });

      // Fetch the list of event-states from the backend
      eventFormService.getEventState()
      .then(response => {
        const eventStateData = response.data;
        console.log("event-states: ");
        console.log(eventStateData);
        setEventState(eventStateData);    
      })
      .catch(error => {
        console.error('Error fetching event-states:', error);
      });
  }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      eventFormService.submitEventForm(formData)
        .then(response => {
          console.log('Event created:', response.data);
          navigate('/events');
          setErrors({});
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            console.log('Validation errors:', error.response.data);
            setErrors(error.response.data);
          } else {
            console.error('Failed to save event:', error);
          }
        });
    };
    
    const setTasks = (tasks) => {
      setFormData((prevState) => ({
        ...prevState,
        tasks: tasks,
      }));
    };

    return (
        <div className="event-form-container">
          <h2>Create New Event</h2>
          <form className="event-form" onSubmit={handleSubmit}>
            <label>
              Event Title:
              <input type="text" name="eventTitle" value={formData.eventTitle} onChange={handleChange} />
              {errors.eventTitle && <div className="error">{errors.eventTitle}</div>}
            </label>
            <label>
              Photo URL:
              <input type="text" name="photoURL" value={formData.photoURL} onChange={handleChange} />
              {errors.photoURL && <div className="error">{errors.photoURL}</div>}
            </label>
            <label>
              Event Description:
              <input type="text" name="eventDescription" value={formData.eventDescription} onChange={handleChange} />
              {errors.eventDescription && <div className="error">{errors.eventDescription}</div>}
            </label>
            <label>
              Facility:
              <select name="facilityId" value={formData.facilityDTO ? formData.facilityDTO.id : ''} onChange={handleChange}>
                <option value="">Select a facility</option>
                {facilities.map(facility => (
                  <option key={facility.id} value={facility.id}>
                    {facility.facilityTitle}
                  </option>
                ))}
              </select>
              {errors.facilityDTO && <div className="error">{errors.facilityDTO}</div>}
            </label>
             <label>
              Event Location:
              <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleChange} />
              {errors.eventLocation && <div className="error">{errors.eventLocation}</div>}
            </label>
            <label>
              Event Date:
              <input type="text" name="eventDate" placeholder='yyyy-MM-dd' value={formData.eventDate} onChange={handleChange} />
              {errors.eventDate && <div className="error">{errors.eventDate}</div>}
            </label>

              Urgency: 	&nbsp;
              <select name="urgency" value={formData.urgency} onChange={handleChange}>
                <option value="">Select urgency</option>
                {urgencies.map(urgency => (
                  <option key={urgency.id} value={urgency.id}>
                    {urgency.toUpperCase()}
                  </option>
                ))}
              </select>
            <label>
              Event Type:	&nbsp;
              <select name="eventType" value={formData.eventType} onChange={handleChange}>
                <option value="">Select an event type</option>
                {eventTypes.map(eventType => (
                  <option key={eventType.id} value={eventType.id}>
                    {eventType.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Event State: 	&nbsp;
              <select name="eventState" value={formData.eventState} onChange={handleChange}>
                <option value="">Select event-state</option>
                {eventStates.map(state => (
                  <option key={state.id} value={state.id}>
                    {state.toUpperCase()}
                  </option>
                ))}
              </select>
            </label> 
            
            <h2>Tasks</h2>
            <AddDynamicInputFields setTasks={setTasks} />
        
            <button type="submit">Create Event</button>
          </form>
        </div>
      );
  }
  
  export default EventForm;