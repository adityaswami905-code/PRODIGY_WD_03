const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const winLine = document.getElementById("winLine");

let currentPlayer = "X";
let gameActive = true;
let scoreX = 0, scoreO = 0;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

const lineCoords = [
    [20, 50, 280, 50],   
    [20, 150, 280, 150], 
    [20, 250, 280, 250], 

    [50, 20, 50, 280],   
    [150, 20, 150, 280], 
    [250, 20, 250, 280], 

    [20, 20, 280, 280],  
    [280, 20, 20, 280]   
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(cell, index));
});

function handleClick(cell, index) {
    if (!gameActive || cell.textContent !== "") return;

    cell.textContent = currentPlayer;
    checkWinner();

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (gameActive) statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
    let values = Array.from(cells).map(c => c.textContent);

    for (let i = 0; i < winPatterns.length; i++) {
        let [a,b,c] = winPatterns[i];

        if (values[a] && values[a] === values[b] && values[a] === values[c]) {
            gameActive = false;
            highlightWin(a,b,c);
            drawLine(i);
            updateScore(values[a]);
            statusText.textContent = `🎉 Player ${values[a]} Wins!`;
            return;
        }
    }

    if (!values.includes("")) {
        statusText.textContent = "🤝 It's a Draw!";
        gameActive = false;
    }
}

function highlightWin(a,b,c) {
    cells[a].classList.add("win");
    cells[b].classList.add("win");
    cells[c].classList.add("win");
}

function drawLine(index) {
    let [x1,y1,x2,y2] = lineCoords[index];

    winLine.setAttribute("x1", x1);
    winLine.setAttribute("y1", y1);
    winLine.setAttribute("x2", x2);
    winLine.setAttribute("y2", y2);

    winLine.style.strokeDashoffset = 0;
}

function updateScore(player) {
    if (player === "X") scoreX++;
    else scoreO++;

    document.getElementById("scoreX").innerText = scoreX;
    document.getElementById("scoreO").innerText = scoreO;
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });

    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";

    winLine.style.strokeDashoffset = 400;
}
