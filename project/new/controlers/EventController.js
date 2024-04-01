const Event = require('../models/event');

// Function to create a new event
async function createEvent(req, res) {
    const { date, time, details } = req.body;
    
    try {
        // Check if an event with the same date, time, and details already exists
        const existingEvent = await Event.findOne({ date, time, details });
        if (existingEvent) {
            return res.status(400).json({ error: 'Event already exists' });
        }
        
        // Create a new event instance
        const newEvent = new Event({
            date,
            time,
            details
        });

        // Save the event to the database
        const savedEvent = await newEvent.save();
        res.status(201).json(savedEvent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Function to get all events
async function getAllEvents(req, res) {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    createEvent,
    getAllEvents
};
