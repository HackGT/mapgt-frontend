var firstFloor = document.getElementById("floor1");
var secondFloor = document.getElementById("floor2");

var rooms = [{
        "number": 103,
        "name": "",
        "floor": 1,
        "image": ""
    },
    {
        "number": 105,
        "name": "",
        "floor": 1,
        "image": ""
    },
    {
        "number": 109,
        "name": "",
        "floor": 1,
        "image": ""
    },
    {
        "number": 111,
        "name": "",
        "floor": 1,
        "image": ""
    },
    {
        "number": 115,
        "name": "",
        "floor": 1,
        "image": ""
    },
    {
        "number": 205,
        "name": "",
        "floor": 2,
        "image": ""
    },
    {
        "number": 209,
        "name": "",
        "floor": 2,
        "image": ""
    },
    {
        "number": 211,
        "name": "",
        "floor": 2,
        "image": ""
    },
    {
        "number": 215,
        "name": "",
        "floor": 2,
        "image": ""
    }
]

function addLocationPins(floor) {
    // adds location pins to all the rooms for the given floor

    for (let i = 0; i < rooms.length; i += 1) {
        if (rooms[i]["floor"] === floor) {
            addPinToLoc(rooms[i]["number"]);
        }
    }
}

function addPinToLoc(roomNumber) {
    // adds a location pin for the specified room number in the map

    var stringRoomNumber = String(roomNumber);
    var floorNumber = parseInt(stringRoomNumber.charAt(0));
    var floorElement = floorNumber == 2 ? secondFloor : firstFloor;
    floorElement.addEventListener("load", () => {
        var svgDOM = floorElement.contentDocument.children[0]
        var matchingTextNodes = Array.from(svgDOM.querySelectorAll('text'))
            .find(el => el.textContent.trim() === stringRoomNumber.trim());
        // x offset +4
        // y offset -25
        var xpos = matchingTextNodes.getAttribute("x") - -4;
        // I know this looks weird, but javascript is more weird
        // if i do xpos + 4, it just doesnt work, but - works
        var ypos = matchingTextNodes.getAttribute("y") - 25;
        var pin = createPin(roomNumber, location);
        var pins = document.getElementById("pins");
        pins.appendChild(pin);
        pin.addEventListener("load", () => {
            pinDOM = pin.contentDocument.children[0];
            pinDOM.setAttribute("x", xpos);
            pinDOM.setAttribute("y", ypos);
            svgDOM.appendChild(pinDOM);
        }, false);
    }, false);
}

function setPinAttributes(pin, roomNumber, location) {
    // setting attributes for the pin element to be added

    var attributes = {
        "id": roomNumber,
        "type": "image/svg+xml",
        "data": "assets/locationPin.svg",
    }
    for (let key in attributes) {
        pin.setAttribute(key, attributes[key]);
    }
}

function createPin(roomNumber, location) {
    // creates a pin element that will be added to the map svg

    var pin = document.createElement("object");
    setPinAttributes(pin, roomNumber, location);
    return pin
}

function toggleFloors() {
    // toggling between the maps for floors 1 and 2

    if (firstFloor.style.display === "none") {
        firstFloor.style.display = "block";
        secondFloor.style.display = "none";
        addLocationPins(1);
    } else {
        firstFloor.style.display = "none";
        secondFloor.style.display = "block";
        addLocationPins(2);
    }
}

addLocationPins(1);
