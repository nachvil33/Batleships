function createGameboard() {
  const board = Array(10).fill(null).map(() => Array(10).fill(null));
  const ships = [];

  function placeShip(ship, row, col, isVertical) {
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        board[row + i][col] = ship;
        ships.push({ ship, row: row + i, col });
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        board[row][col + i] = ship;
        ships.push({ ship, row, col: col + i });
      }
    }
  }

  function receiveAttack(row, col) {
    const cell = board[row][col];
    if (cell) {
      cell.hit();
      return true; // Hit
    }
    return false; // Miss
  }

  function allShipsSunk() {
    return ships.every(shipInfo => shipInfo.isSunk());
  }

  return {
    board,
    placeShip,
    receiveAttack,
    allShipsSunk
  };
}

// Si estás usando módulos ES6, descomenta la siguiente línea
// export default createGameboard;
