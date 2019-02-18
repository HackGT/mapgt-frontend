var firstFloor = document.getElementById("floor1");
var secondFloor = document.getElementById("floor2");

function addPinToLoc(roomNumber) {
// adds a location pin for the specified room number in the map

      var stringRoomNumber = String(roomNumber);
      var floorNumber = parseInt(stringRoomNumber.charAt(0));

      // get the floor element
      var floorElement = floorNumber == 2 ? secondFloor : firstFloor;

      floorElement.addEventListener("load", () => {
        // accessing SVG dom of the map
        var svgDOM = floorElement.contentDocument.children[0]
        // finding matching text nodes for given room number
        var matchingTextNodes = Array.from(svgDOM.querySelectorAll('text'))
        .find(el => el.textContent.trim() === stringRoomNumber.trim());
        // get the location coordinates within the SVG
        // x offset +4
        // y offset -25
        var xpos = matchingTextNodes.getAttribute("x") - -4;
        var ypos = matchingTextNodes.getAttribute("y") - 25;
        console.log(xpos);
        console.log(ypos);

        var pin = createPin(roomNumber, location);

        var pins = document.getElementById("pins");
        pins.appendChild(pin);
        pin.addEventListener("load", () => {
            pinDOM = pin.contentDocument.children[0];
            console.log("reached")
            pinDOM.setAttribute("x", xpos);
            pinDOM.setAttribute("y", ypos);
            svgDOM.appendChild(pinDOM);
        }, false);

    }, false);
}

function addLocationPins(floor) {
// adds location pins to all the rooms for the given floor

    $.getJSON("rooms.json", function(json) {
        for (let i = 0; i < json.length; i += 1 ) {
            if (json[i]["floor"] === floor){
                addPinToLoc(json[i]["number"]);
            }
        }
    })
}

function setPinAttributes(pin, roomNumber, location) {
// setting attributes for the pin element to be added

// TODO: Refactor to add the pin to the svg

    var attributes = {
        "id": roomNumber,
        "type": "image/svg+xml",
        "data": "assets/locationPin.svg",
    }
    for (let key in attributes) {
        pin.setAttribute(key, attributes[key]);
    }
    pin.setAttribute('pointer-events', 'none');
    pin.classList.add("location-pin");
    pin.style.left = location['left'] + "px";
    pin.style.top = location['top'] + "px";

}

function createPin(roomNumber, location) {
// creates a pin element that will be added to the map svg

    console.log("reached create Pin");
    var pin = document.createElement("object");
    setPinAttributes(pin, roomNumber, location);
    return pin
}

function toggleFloors() {
// toggling between the maps for floors 1 and 2

      if (firstFloor.style.display === "none") {
            firstFloor.style.display = "block";
            secondFloor.style.display = "none";
      } else {
            firstFloor.style.display = "none";
            secondFloor.style.display = "block";
      }
}



// adds the pins for floor 1

// TODO: make a call based on which floor is chosen
addLocationPins(1);

// function toggleCard(top) {
//     if (card.style.height == "250px") {
//         $(card).animate({height: "0px"});
//         $(card).animate({top: "10px"});
//     } else {
//         $(card).animate({height: "250px"}, "fast", "swing");
//         $(card).animate({top: "250px"}, "fast", "swing");
//     }
// }
