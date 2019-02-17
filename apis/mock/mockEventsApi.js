const Event = require('../classes/Event');

// Mock outputs
var testNames = [
    "excite",
    "object",
    "look",
    "itch",
    "concentrate",
    "hand",
    "stamp",
    "use",
    "open",
    "miss",
    "imagine",
    "empty"
]

var testLocations = [
    "103",
    "105",
    "109",
    "111",
    "115"
]

var testSummaries = [
    "In quis ex ornare, maximus tellus ac, convallis purus.",
    "Integer sit amet dui ullamcorper, condimentum tellus sed, malesuada dui.",
    "Nulla aliquam risus vitae tortor vulputate ultricies.",
    "Quisque in lacus a diam lacinia sollicitudin sit amet volutpat turpis.",
    "Vivamus semper risus eu ultrices posuere.",
    "Nam a ex non dui iaculis molestie quis id quam."
]

function randomItem(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

// Generate mock events, start times are the current time offset by a random number of half-hour intervals, end times are an hour from start time
function generateMockEvents() {
    var mockEvents = [];

    for (var eventName of testNames) {
        var name = eventName + "GT";

        var startTimeOffset = (3600000 / 2) * (1 + Math.floor(Math.random() * 7))
        var startTime = new Date(Date.now() + startTimeOffset);
        var endTime = new Date(startTime.toString());
        endTime.setHours(endTime.getHours() + 1);

        var location = randomItem(testLocations);
        var summary = randomItem(testSummaries);

        var event = new Event(name, startTime, endTime, location, summary);

        mockEvents.push(event);
    }

    return mockEvents;
}

module.exports = generateMockEvents;