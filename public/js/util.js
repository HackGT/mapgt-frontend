var firstFloor = document.getElementById("floor1");
var secondFloor = document.getElementById("floor2");
var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal-overlay');

var events = [];

// An AJAX request to get the data from the event-data.json file and parsing it
$.getJSON({
    url: "./event-data.json",
    async: false
}, function(data) {
    events = data;

    // Transforming the start and end times into date objects
    for (event of events) {
        var eventStartTime = event.startTime;
        var eventEndTime = event.endTime;
        event.startTime = new Date(eventStartTime);
        event.endTime = new Date(eventEndTime);
    }

    events = events.sort(function(a, b){return a.startTime - b.startTime})

    console.log(events)
});

var rooms = [
    {
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
        var ypos = matchingTextNodes.getAttribute("y") - 40;
        var pin = createPin(roomNumber, location);
        var pins = document.getElementById("pins");
        pins.appendChild(pin);
        pin.addEventListener("load", () => {
            pinDOM = pin.contentDocument.children[0];
            pinDOM.setAttribute("x", xpos);
            pinDOM.setAttribute("y", ypos);
            svgDOM.appendChild(pinDOM);
            pinDOM.id = "room-" + roomNumber;
            pinDOM.addEventListener("click", function(e) {
                var clickedElement = getTopLevelOfPin(e.target);
                var clickedElementGroup = clickedElement.getElementsByTagName('g')[0];

                if (clickedElementGroup.classList.contains('pin-selected')) {
                    clickedElementGroup.classList.remove('pin-selected');
                    removeModal();
                } else {
                    var selectedPins = svgDOM.querySelectorAll('.pin-selected');
                    for (var i = 0; i < selectedPins.length; i++) {
                        selectedPins[i].classList.remove('pin-selected');
                    }
                    clickedElementGroup.classList.add('pin-selected');
                    showModal(clickedElement.id);
                }

            })
        }, false);
    }, false);
}




function tog1() {
    firstFloor.style.display = "block";
    secondFloor.style.display = "none";
    addLocationPins(1);
}

function tog2() {
    firstFloor.style.display = "none";
    secondFloor.style.display = "block";
    var element = document.getElementById("removeactive");
    element.classList.remove("active");
    addLocationPins(2);
}
