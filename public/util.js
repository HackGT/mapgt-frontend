var firstFloor = document.getElementById("floor1");
var secondFloor = document.getElementById("floor2");

// TODO: find pin offset values after editing the map

function addLocationPins(floor) {
    $.getJSON("rooms.json", function(json) {
        for (let i = 0; i < json.length; i += 1 ) {
            if (json[i]["floor"] === floor){
                addPinToLoc(json[i]["number"]);
            }
        }
    })
}

function setPinAttributes(pin, roomNumber, location) {
    var attributes = {
        "id": roomNumber,
        "type": "image/svg+xml",
        "data": "assets/locationPin.svg",
    }
    for (let key in attributes) {
        pin.setAttribute(key, attributes[key]);
    }
    console.log("reached set pin attr")
    console.log(location)
    pin.classList.add("marker", "marker-extension");
    pin.style.left = location['left'] + "px";
    pin.style.top = location['top'] + "px";

}

function createPin(roomNumber, location) {
    // TODO: return a new pin element
    console.log("reached create Pin")
    var pin = document.createElement("object");
    setPinAttributes(pin, roomNumber, location);
    return pin
}

function toggleFloors() {
      if (firstFloor.style.display === "none") {
            firstFloor.style.display = "block";
            secondFloor.style.display = "none";
      } else {
            firstFloor.style.display = "none";
            secondFloor.style.display = "block";
      }
}



function addPinToLoc(roomNumber) {
      var stringRoomNumber = String(roomNumber)
      var floorNumber = parseInt(stringRoomNumber.charAt(0))

      var floorElement = floorNumber == 2 ? secondFloor : firstFloor

      floorElement.addEventListener("load", () => {
        var svgDom = floorElement.contentDocument.children[0]
        var matchingTextNodes = Array.from(svgDom.querySelectorAll('text'))
        .find(el => el.textContent.trim() === stringRoomNumber.trim());
        var transformToDOM = matchingTextNodes.getBoundingClientRect()
        var leftDOM = transformToDOM.left
        var topDOM = transformToDOM.top

        var location = {
            'left': leftDOM,
            'top': topDOM
        }
        var pins = document.getElementById("pins");
        console.log(pins)
        var pin = createPin(roomNumber, location);
        pins.appendChild(pin);

    }, false);
}

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
