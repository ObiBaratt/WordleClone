var height = 6; // number of guesses
var width = 5; // word length

var row = 0; // current guess (len 1-width)
var column = 0; // current letter of guess

var gameOver = false;
var word = "PAUSE";

window.onload = function() {
    initialize();
}

function initialize() {
    console.log("initialized")
    // create game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // create <span id="r-c" class="tile">X</span>
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Listen for Key Presses
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        // Ensure alphabet key
        console.log(e.code)
        if ("KeyA" <= e.code && e.code <= "KeyZ") {

            if (column < width) {
                let currTile = document.getElementById(row.toString() + "-" + column.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3];
                    column += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < column && column <= width) {
                column -= 1;
            }
                let currTile = document.getElementById(row.toString() + "-" + column.toString());
                currTile.innerText = "";
        }
        else if (e.code == "Enter") {
            update();
            row += 1;
            column = 0;
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;


        }
    })
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        // Correct position
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        }
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        }
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
            document.getElementById("answer").innerText = "Winner!";
        }
    }
}
