const express = require('express');
const app = express();
const port = 3000;

// html -> get, post, put, delete

app.get('/', (req, res) => {
  res.sendFile('public/index.html');
})


app.listen(port, () => console.log(`Listening on ${port}`));