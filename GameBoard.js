function createGameboard() {
  const board = Array(10).fill(null).map(() => Array(10).fill(null));
  const ships = [];

  function canPlaceShip(ship, row, col, isVertical) {
    if (isVertical) {
      if (row + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (board[row + i][col] !== null) return false;
      }
    } else {
      if (col + ship.length > 10) return false;
      for (let i = 0; i < ship.length; i++) {
        if (board[row][col + i] !== null) return false;
      }
    }
    return true;
  }

  function placeShip(ship, row, col, isVertical) {
    if (!canPlaceShip(ship, row, col, isVertical)) {
      throw new Error("Cannot place ship here.");
    }
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
      return true;
    }
    return false;
  }

  function allShipsSunk() {
    return ships.every(shipInfo => shipInfo.ship.isSunk());
  }

  return {
    board,
    placeShip,
    receiveAttack,
    allShipsSunk
  };
}
module.exports = createGameboard;
