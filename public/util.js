var firstFloor = document.getElementById("floor1");
var secondFloor = document.getElementById("floor2");

// TODO, add some way to select from n different floors
// because Klaus has three
// consider not using a button with an array as a backing structure

function toggleFloors() {
      if (firstFloor.style.display === "none") {
            firstFloor.style.display = "block";
            secondFloor.style.display = "none";
      } else {
            firstFloor.style.display = "none";
            secondFloor.style.display = "block";
      }
}

function toggleCard(top) {
    if (card.style.height == "250px") {
        $(card).animate({height: "0px"});
        $(card).animate({top: "10px"});
    } else {
        $(card).animate({height: "250px"}, "fast", "swing");
        $(card).animate({top: "250px"}, "fast", "swing");
    }
}

function getRoomLocation(roomNumber) {
      var stringRoomNumber = String(roomNumber)
      var floorNumber = parseInt(stringRoomNumber.charAt(0))

      // TODO, just index based on the first digit into an array
      var floorElement = floorNumber == 2 ? secondFloor : firstFloor

      floorElement.addEventListener("load", () => {
        var svgDom = floorElement.contentDocument.children[0]
        var matchingTextNodes = Array.from(svgDom.querySelectorAll('text'))
        .find(el => el.textContent.trim() === stringRoomNumber.trim());
        var transformToDOM = matchingTextNodes.getBoundingClientRect()
        var leftDOM = transformToDOM.left
        var topDOM = transformToDOM.top

        var newObj = {
            'left': leftDOM,
            'top': topDOM
        }

        var card = document.getElementById("card")
        card.style.top = String(topDOM - 250) + 'px'
        card.style.left = String(leftDOM - 225) + 'px'

    }, false);
}

function displayCard(top) {
    let card = document.getElementById("card");
    toggleCard(top)
}

// create a function to display a dot at the location
getRoomLocation(111)
