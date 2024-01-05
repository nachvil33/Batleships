const createShip = require('./ship');
const createGameboard = require('./gameboard');
const createPlayer = require('./player');

function dragStart(e) {
    const shipType = e.target.dataset.ship;
    e.dataTransfer.setData('ship', shipType);
    e.dataTransfer.setData('text/plain', `Arrastrando ${shipType}`);
    e.target.classList.add('dragging');
    console.log(`Comenzando a arrastrar: ${shipType}`);
}

document.querySelectorAll('.ship').forEach(ship => {
    ship.addEventListener('dragstart', dragStart);
});

document.getElementById('start-button').addEventListener('click', () => {
    const randomStart = Math.floor(Math.random() * 2);
    if (randomStart === 0) {
        console.log('¡El jugador comienza!');
        initGame();
    } else {
        console.log('¡La computadora comienza!');
        initGame();
        computerPlay();
    }
});

let playerGameboard;
let computerGameboard;
let player;
let computer;
let turnCounter = 0;

function renderBoard(board, containerId, isPlayer) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.classList.add(isPlayer ? 'player-cell' : 'computer-cell');
            cellElement.dataset.row = rowIndex;
            cellElement.dataset.col = colIndex;
            container.appendChild(cellElement);
        });
    });
}

function computerPlay() {
    const computerTurnResult = computer.takeTurn(playerGameboard);
    console.log('Computer attacked:', computerTurnResult);
    turnCounter++;
    updateCounters();
    checkGameOver();
}

function initGame() {
    playerGameboard = createGameboard();
    computerGameboard = createGameboard();
    player = createPlayer(playerGameboard);
    computer = createPlayer(computerGameboard, 'intermediate');
    placeShips(playerGameboard);
    placeShips(computerGameboard);
    renderBoard(playerGameboard.board, 'player-board', true);
    renderBoard(computerGameboard.board, 'computer-board', false);
    turnCounter = 0;
    updateCounters();
}

function placeShips(gameboard) {
    const ships = [createShip(5), createShip(4), createShip(3), createShip(3), createShip(2)];
    ships.forEach(ship => {
        let placed = false;
        while (!placed) {
            let row = Math.floor(Math.random() * 10);
            let col = Math.floor(Math.random() * 10);
            let isVertical = Math.random() > 0.5;
            if (gameboard.canPlaceShip(ship, row, col, isVertical)) {
                gameboard.placeShip(ship, row, col, isVertical);
                placed = true;
            }
        }
    });
}

function updateCounters() {
    console.log('Turn:', turnCounter);
}

function checkGameOver() {
    if (playerGameboard.allShipsSunk() || computerGameboard.allShipsSunk()) {
        console.log('Game Over');
        // Aquí puedes añadir más lógica para manejar el final del juego.
    }
}

function playerClick(e) {
    const cell = e.target;
    if (cell.classList.contains('cell') && !cell.classList.contains('cell-attacked')) {
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        const result = computerGameboard.receiveAttack(row, col);
        cell.classList.add('cell-attacked');
        if (result) {
            console.log('Player attacked:', { row, col, result });
            checkGameOver();
        }
        computerPlay();
    }
}

document.getElementById('player-board').addEventListener('click', playerClick);

initGame();
