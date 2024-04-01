import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Route, Routes } from 'react-router-dom';
import RegistrationPage from './registration';
import AddUserModule from '../component/AddUserModule';
import AddQuizForm from '../component/addquiz';
import Navbar from '../component/NAvbar';
import Button from '@mui/material/Button';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/auth/getevent');
      if (response.ok) {
        const eventData = await response.json();
        const formattedEvents = eventData.map(event => ({
          id: event._id,
          title: `${event.details} - ${event.time}`,
          start: moment(event.date).toDate(),
          end: moment(event.date).toDate()
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
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleSelectSlot = (slotInfo) => {
    setShowDialog(true);
    setSelectedDate(slotInfo.start);
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    setSelectedDate(null);
  };

  const handleAddEvent = async (event) => {
    const newEvent = {
      date: moment(selectedDate).format('YYYY-MM-DD'),
      time: event.time,
      details: event.details
    };

    try {
      const response = await fetch('http://localhost:3000/api/auth/createevent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });

      if (response.ok) {
        console.log('Event created successfully');
        fetchEvents(); // Fetch events again to update the calendar with the newly added event
      } else {
        console.error('Failed to create event:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

    handleDialogClose();
  };

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
                href="/register"
              >
                Register
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
              <Button
                variant="contained"
                style={{ backgroundColor: '#ff9800', fontSize: '1.2rem', width: '100%', marginBottom: '10px' }}
                href="/quiz"
              >
                Quiz
              </Button>
            </li>
          </ul>
        </div>
        <div style={{ width: '60%' }}>
          <Calendar
            localizer={localizer}
            selectable
            onSelectSlot={handleSelectSlot}
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
          onClose={handleDialogClose}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
};

const EventDialog = ({ selectedDate, onClose, onAddEvent }) => {
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');

  const handleAddEvent = () => {
    const event = {
      time,
      details,
    };
    onAddEvent(event);
  };

  return (
    <div className="event-dialog" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h2>Add Event</h2>
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
        <button onClick={handleAddEvent} style={{ marginRight: '10px' }}>Add Event</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default Dashboard;
