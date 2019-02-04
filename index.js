const express = require('express');
const app = express();
const port = 3000;

// html -> get, post, put, delete

<<<<<<< HEAD
app.get('/', (req, res) => {
})
=======
app.use('/', express.static('./public'));
>>>>>>> 746032546f9727dc51f3e00920d4171f35259eb4

app.listen(port, () => console.log(`Listening on ${port}`));
