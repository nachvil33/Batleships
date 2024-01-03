// game.js
const createShip = require('./ship');
const createGameboard = require('./gameboard');
const createPlayer = require('./player');

document.getElementById('start-button').addEventListener('click', () => {
  // Decide aleatoriamente quién comienza (0 o 1)
  const randomStart = Math.floor(Math.random() * 2);

  if (randomStart === 0) {
    console.log('¡El jugador comienza!');
    initGame();
    // Lógica adicional para el jugador
  } else {
    console.log('¡La computadora comienza!');
    // Lógica adicional para la computadora
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
  board.forEach(row => {
    row.forEach(cell => {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.classList.add(isPlayer ? 'player-cell' : 'computer-cell');
      container.appendChild(cellElement);
    });
  });
}

function computerPlay() {
  const computerTurnResult = computer.takeTurn(playerGameboard);
  console.log('Computer attacked:', computerTurnResult);

  turnCounter++;
  updateCounters();

  // Verifica si el juego ha terminado después del turno de la computadora
  if (!playerGameboard.allShipsSunk()) {
    // El juego aún no ha terminado, permite al jugador jugar
    // Aquí puedes agregar lógica adicional para el jugador si es necesario
  } else {
    console.log('Game Over');
  }
}

function initGame() {
  playerGameboard = createGameboard();
  computerGameboard = createGameboard();
  player = createPlayer(playerGameboard);
  computer = createPlayer(computerGameboard);

  // Lógica para posicionar los barcos inicialmente
  placeShips(playerGameboard);
  placeShips(computerGameboard);

  turnCounter = 0;
  updateCounters();
}

function placeShips(gameboard) {
  // Puedes crear tus barcos con la longitud correspondiente
  const carrier = createShip(5);
  const battleship = createShip(4);
  const cruiser = createShip(3);
  const submarine = createShip(3);
  const destroyer = createShip(2);

  // Lógica para posicionar los barcos en el tablero
  gameboard.placeShip(carrier, 0, 0, true); // Ejemplo de posición inicial
  gameboard.placeShip(battleship, 2, 3, false); // Ejemplo de posición inicial
  gameboard.placeShip(cruiser, 5, 7, true); // Ejemplo de posición inicial
  gameboard.placeShip(submarine, 8, 4, false); // Ejemplo de posición inicial
  gameboard.placeShip(destroyer, 1, 9, true); // Ejemplo de posición inicial
}

function updateCounters() {
  console.log('Turn:', turnCounter);
}

// Inicia el juego
initGame();
