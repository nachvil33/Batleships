function createShip(length) {
  const ship = {
    length,
    hits: 0,
    isSunk() {
      return this.hits === this.length;
    },
    hit() {
      this.hits++;
    },
  };
  return ship;
}

// Si estás usando módulos ES6, descomenta la siguiente línea
// export default createShip;
