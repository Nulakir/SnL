var players = {
    player1: {
        name: 'Jan',
        position: 1
    }

}

function getGrid() {
    var positions = [];

    for (var i = 0; i < 100; i++) {
        var div = document.createElement("div");
        div.id = 100 - i;
        div.innerHTML = 100 - i;
        positions[i] = i + 1;
        document.getElementById("gameboard").appendChild(div);
    }
    showPlayer(players.player1.position);


}

function showPlayer(position) {
    document.getElementById(position).style.backgroundColor = "green";
}

function addButtonActions() {
    var diceButton = document.getElementById("rolldice");


    diceButton.addEventListener("click", function () {
        var result = dice();

        document.getElementById("resultaat").innerHTML = "je hebt " + result + " gegooid";

        movePlayer(result);
    })
}

function dice() {
    var dice = Math.floor(Math.random() * 6) + 1;
    return dice;

}

function ladders() {
    if (players.player1.position == 10) {
        return 30;
    }
    if (players.player1.position == 26) {
        return 50;
    }
    if (players.player1.position == 38) {
        return 60;
    }
    return players.player1.position;
}

function movePlayer(moves) {
    var oldPosition = players.player1.position;
    var newPosition = bestPosition(moves);

    players.player1.position = newPosition;
    
    newPosition = ladders();
    players.player1.position = ladders();
    
    makeSquareWhite(oldPosition)

    if (newPosition == 100) {
        document.getElementById("status").innerHTML = "Je hebt gewonnen!";
        document.getElementById("gameboard").style.display = "none"
        document.getElementById("rolldice").style.display = "none"
        document.getElementById("resultaat").style.display = "none"
        showPlayer(newPosition);
    } else if (newPosition < 100) {
        document.getElementById("status").innerHTML = "gooi nog een keer!";
        showPlayer(newPosition);
    }
}

function makeSquareWhite(pos) {
     document.getElementById(pos).style.backgroundColor = "white";
}

function bestPosition(moves) {
    var bestPosition = players.player1.position + moves;
    
    if (bestPosition > 100) {
        var firstStep = bestPosition - 100;
        bestPosition = 100 - firstStep;
    }
    
    return bestPosition;
}