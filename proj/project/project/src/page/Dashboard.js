import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './registration';
import Navbar from '../component/NAvbar';
import Button from '@mui/material/Button';
import AddUserModule from '../component/AddUserModule';
import QuizModule from '../component/QuizModule';
import AddQuizForm from '../component/addquiz';
import AddModuleTrainer from '../component/AddModuleTrainer';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/auth/getevent', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.ok) {
        const eventData = await response.json();
        const formattedEvents = eventData.map(event => ({
          id: event._id,
          title: `${event.details} - ${event.time}`,
          start: moment(event.date).toDate(),
          end: moment(event.date).toDate(),
          details: event.details,
          time: event.time,
        }));
        setEvents(formattedEvents);
      } else {
        console.error('Failed to fetch events:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDialogClose = () => {
    setShowDialog(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleAddEvent = async (event) => {
    const newEvent = {
      date: moment(selectedDate).format('YYYY-MM-DD'),
      time: event.time,
      details: event.details
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/auth/createevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      });

      if (response.ok) {
        console.log('Event created successfully');
        fetchEvents();
      } else {
        console.error('Failed to create event:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

    handleDialogClose();
  };

  const handleUpdateEvent = async (event) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/auth/events/${selectedEvent.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(event)
      });

      if (response.ok) {
        console.log('Event updated successfully');
        fetchEvents();
      } else {
        console.error('Failed to update event:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

    handleDialogClose();
  };

  const handleDeleteEvent = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/auth/delevent/${selectedEvent.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log('Event deleted successfully');
        fetchEvents();
      } else {
        console.error('Failed to delete event:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

    handleDialogClose();
  };

  const handleSelectSlot = (slotInfo) => {
    setShowDialog(true);
    setSelectedDate(slotInfo.start);
    setSelectedEvent(null);
  };

  const handleSelectEvent = (event) => {
    setShowDialog(true);
    setSelectedEvent(event);
  };

  // Remaining components and functions...

  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ width: '30%' }}>
          <h2>Menu</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: '#2196f3', fontSize: '1.2rem', width: '100%', marginBottom: '10px' }}
                href="/user"
              >
                User
              </Button>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: '#4caf50', fontSize: '1.2rem', width: '100%', marginBottom: '10px' }}
                href="/module"
              >
                Module
              </Button>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <AddUserModule></AddUserModule>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <QuizModule></QuizModule>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <AddModuleTrainer></AddModuleTrainer>
            </li>
            <li style={{ marginBottom: '10px' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: '#ff9800', fontSize: '1.2rem', width: '100%', marginBottom: '10px' }}
                href="/addquiz"
              >
                Add Quiz
              </Button>
            </li>
          </ul>
        </div>
        <div style={{ width: '60%' }}>
          <Calendar
            localizer={localizer}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            events={events}
            eventPropGetter={(event, start, end, isSelected) => {
              const backgroundColor = isSelected ? '#3174ad' : '#3788d8';
              return { style: { backgroundColor } };
            }}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: '50px' }}
          />
        </div>
      </div>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/module" element={<AddUserModule />} />
        <Route path="/quiz" element={<AddQuizForm />} />
      </Routes>

      {showDialog && (
        <EventDialog
          selectedDate={selectedDate}
          selectedEvent={selectedEvent}
          onClose={handleDialogClose}
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </div>
  );
};

const EventDialog = ({ selectedDate, selectedEvent, onClose, onAddEvent, onUpdateEvent, onDeleteEvent }) => {
  const [time, setTime] = useState(selectedEvent ? selectedEvent.time : '');
  const [details, setDetails] = useState(selectedEvent ? selectedEvent.details : '');

  const handleEventAction = () => {
    if (selectedEvent) {
      onUpdateEvent({ id: selectedEvent.id, time, details });
    } else {
      onAddEvent({ time, details });
    }
  };

  const handleDeleteEvent = () => {
    onDeleteEvent();
  };

  return (
    <div className="event-dialog" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h2>{selectedEvent ? 'Edit Event' : 'Add Event'}</h2>
      <div>
        <p><strong>Date:</strong> {moment(selectedDate).format('LL')}</p>
        <label>
          Time:
          <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Event Details:
          <input type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
        </label>
      </div>
      <div>
        <button onClick={handleEventAction} style={{ marginRight: '10px' }}>{selectedEvent ? 'Update Event' : 'Add Event'}</button>
        {selectedEvent && <button onClick={handleDeleteEvent} style={{ backgroundColor: 'red', color: 'white' }}>Delete Event</button>}
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Dashboard;
