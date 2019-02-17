const express = require('express');
const eventsApi = require('./apis/eventsApi.js');
const app = express();
const port = 3000;

// html -> get, post, put, delete

app.use(express.json())
app.use('/', express.static('./public'));
app.use('/api', eventsApi);

app.listen(port, () => console.log(`Listening on ${port}`));
