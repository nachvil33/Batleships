function createPlayer(gameboard, difficulty = 'basic') {
  let lastHit = null;
  let lastHitPattern = [];

  function randomAttack() {
    let row, col;
    do {
      row = Math.floor(Math.random() * 10);
      col = Math.floor(Math.random() * 10);
    } while (gameboard.board[row][col] !== null);  // Asegura que el ataque sea en una celda no atacada
    return { row, col };
  }

  function attackNearLastHit() {
    const { row, col } = lastHit;
    const options = [
      { row: row - 1, col }, 
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 }
    ].filter(opt => opt.row >= 0 && opt.row < 10 && opt.col >= 0 && opt.col < 10);
    return options[Math.floor(Math.random() * options.length)];
  }

  function advancedAttack() {
    if (lastHit && lastHitPattern.length > 0) {
      let nextTarget;
      do {
        nextTarget = lastHitPattern.shift();
      } while (nextTarget && (nextTarget.row < 0 || nextTarget.row >= 10 || nextTarget.col < 0 || nextTarget.col >= 10));
      return nextTarget || randomAttack();
    } else {
      return randomAttack();
    }
  }

  function takeTurn(enemyGameboard) {
    let target;
    switch (difficulty) {
      case 'basic':
        target = randomAttack();
        break;
      case 'intermediate':
        target = lastHit ? attackNearLastHit() : randomAttack();
        break;
      case 'advanced':
        target = advancedAttack();
        break;
      default:
        target = randomAttack();
    }
    const result = enemyGameboard.receiveAttack(target.row, target.col);
    if (result) {
      lastHit = target;
      lastHitPattern.push({ row: target.row, col: target.col });
    }
    return { ...target, result };
  }

  return { takeTurn };
}

module.exports = createPlayer;
