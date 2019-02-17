const express = require('express');
const router = express.Router();
const generateMockEvents = require('./mock/mockEventsApi');

var events = [];

events = generateMockEvents();

// Get events with the given room and events in which the given time falls in between the event's start and end times
function getEvents(room, time) {
    var filteredEvents = events.filter(event => event.location == room && (time > event.startTime && event.endTime > time));
    return filteredEvents;
}

// POST request body should be in JSON and include:
// room: the room number to get events for
// time: the date in milliseconds; any events happening at that date will be returned
router.post('/getEvents', (req, res) => {
    var room = req.body.room.toString();
    var time = new Date(req.body.time);
    var currentEvents = getEvents(room, time);

    res.send(currentEvents);
});

module.exports = router;