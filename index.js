const express = require('express');
const app = express();
const port = 3000;

// html -> get, post, put, delete

app.use('/', express.static('./public'));

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