// player.js
function createPlayer(gameboard, difficulty = 'basic') {
  let lastHit = null;
  let lastHitPattern = []; // Agrega esta línea para inicializar el patrón

  function randomAttack() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    return { row, col };
  }

  function attackNearLastHit() {
    // Implementa lógica para atacar alrededor del último acierto
    const { row, col } = lastHit;
    const options = [
      { row: row - 1, col },
      { row: row + 1, col },
      { row, col: col - 1 },
      { row, col: col + 1 },
    ];
    return options[Math.floor(Math.random() * options.length)];
  }

  function advancedAttack() {
    if (lastHit && lastHitPattern.length > 0) {
      // Si hay un último acierto y hay un patrón registrado, intenta continuar el patrón.
      const nextTarget = lastHitPattern.shift();
      return nextTarget;
    } else {
      // Si no hay un patrón registrado, realiza un ataque aleatorio.
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
  
      // Registra el patrón de ataque exitoso
      lastHitPattern.push({ row: target.row, col: target.col });
    }
    return { ...target, result };
  }
  

  return {
    takeTurn,
  };
}

module.exports = createPlayer;
