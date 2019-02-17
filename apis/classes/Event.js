function Event(name, startTime, endTime, location, summary) {
    this.name = name;
    this.startTime = startTime;
    this.endTime = endTime;
    this.location = location;
    this.summary = summary;
}

module.exports = Event;