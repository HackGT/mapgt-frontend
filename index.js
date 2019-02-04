const express = require('express');
const app = express();
const port = 3000;

// html -> get, post, put, delete

app.get('/', (req, res) => {
})

app.listen(port, () => console.log(`Listening on ${port}`));
