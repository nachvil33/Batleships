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
module.exports = createShip;
