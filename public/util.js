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

function getRoomLocation(roomNumber) {
      var stringRoomNumber = String(roomNumber)
      var floorNumber = parseInt(stringRoomNumber.charAt(0))

      // TODO, just index based on the first digit into an array
      var floorElement = floorNumber == 2 ? secondFloor : firstFloor

      var svgDom = floorElement.contentDocument.children[0]

      var matchingTextNodes = Array.from(svgDom.querySelectorAll('text'))
            .find(el => el.textContent.trim() === stringRoomNumber.trim());

      // TODO, return the actual position, in the global frame, of the text node, so we can put dots & stuff there
}