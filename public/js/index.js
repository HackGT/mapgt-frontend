var map = Snap(1000,500)
Snap.load('./assets/maps/ICF1EditHorizons.svg', onSVGLoaded);

// TODO: Refactor json file
// TODO: corresponding refactor of mapStyling function and inner function calls

/* ------- BIG TODOS ------- */
// TODO: add click events and zoom in on the map
// TODO: after clicking, back button to return back to the map
// TODO: ops mode
// TODO: generalize styling of the map
// TODO: linking issue room 105, and 111

function onSVGLoaded(data) {
    map.append(data);
    var rooms = map.selectAll(".room")
    var roomText = map.selectAll('.room-text')
    setMapStyling(map, rooms, roomText)
}

function fillRooms(rooms, roomText, color, textColor) {
    for(let i = 0; i < rooms.length; i++) {
        rooms[i].attr({
            fill: color,
        })
        roomText[i].attr({
            fill: textColor,
        })
    }
}

function addEventListenersToRooms(rooms, roomText, hoverInColor, hoverOutColor,
     hoverInTextColor, hoverOutTextColor) {
    for(let i = 0; i < rooms.length; i++) {
        rooms[i].transform("s(0.95,0.95)")
        // hover
        rooms[i].hover(function() {
            rooms[i].attr({
                fill:hoverInColor,
            })
            roomText[i].attr({
                fill:hoverInTextColor,
            })
        }, function() {
            rooms[i].attr({
                fill:hoverOutColor,
            })
            roomText[i].attr({
                fill:hoverOutTextColor,
            })
        })
        roomText[i].hover(function() {
            rooms[i].attr({
                fill:hoverInColor,
            })
            roomText[i].attr({
                fill:hoverInTextColor,
            })
        }, function() {
            rooms[i].attr({
                fill:hoverOutColor,
            })
            roomText[i].attr({
                fill:hoverOutTextColor,
            })
        })

        // click
        rooms[i].click(function() {
            console.log("hit this")
        })
    }
}


function setMapStyling(map, rooms, roomText) {

    fetch("./js/mapStyle.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(myJson) {
            fillRooms(rooms, roomText, myJson.room_fill, myJson.room_text.fill)
            setInnerBorderStyle(map, myJson.inner_border)
            setOuterBorderStyle(map, myJson.outer_border)
            setIconStyle(map, myJson.icon)
            addEventListenersToRooms(rooms, roomText, myJson.room_hover_fill,
                myJson.room_fill, myJson.text_hover_fill, myJson.room_text.fill);

            // setTextStyle(s, myJson.room_text)
            // setIconStyle(s, myJson.icon)
        })

}

function setInnerBorderStyle(map, styles) {
    var elements = map.selectAll("#inner-border *")

    for (let i = 0; i < elements.length; i++ ) {
        elements[i].attr({
            stroke: styles.stroke
        })
    }
}

function setOuterBorderStyle(map, styles) {
    var elements = map.selectAll("#outer-border *")

    for (let i = 0; i < elements.length; i++) {
        elements[i].attr({
            stroke: styles.stroke,
            fill: styles.fill
        })
    }
}

function setIconStyle(map, styles) {
    var elements = map.selectAll("#icons *")

    for (let i = 0; i < elements.length; i++) {
        elements[i].attr({
            stroke: styles.stroke,
            fill: styles.fill
        })
    }
}
