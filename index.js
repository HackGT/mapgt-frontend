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

function toggleFloors() {
    var top = document.getElementById("floor1");
    var bottom = document.getElementById("floor2");
    if (top.style.display === "none") {
    top.style.display = "block";
    bottom.style.display = "none";
    } else {
    top.style.display = "none";
    bottom.style.display = "block";
    }
}