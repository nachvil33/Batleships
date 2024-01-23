document.addEventListener('DOMContentLoaded', () => {
  const playerContainer = document.getElementById('player-container');
  const playerBoard = document.getElementById('player-board');
  const computerBoard = document.getElementById('computer-board');

  initBoard(playerBoard, 'player-cell');
  initBoard(computerBoard, 'computer-cell');

  addEvents(playerBoard, 'player-cell');
  addDraggableShips(playerContainer);
});

function initBoard(board: HTMLElement, cellClass: string): void {
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add(cellClass);
    cell.dataset.row = Math.floor(i / 10).toString();
    cell.dataset.col = (i % 10).toString();
    board.appendChild(cell);
  }
}

function addEvents(board: HTMLElement, cellClass: string): void {
  board.addEventListener('click', (event) => {
    const targetCell = event.target as HTMLElement;
    if (targetCell.classList.contains(cellClass)) {
      console.log('Cell clicked:', targetCell.dataset.row, targetCell.dataset.col);
    }
  });

  board.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  board.addEventListener('drop', (event) => {
    const targetCell = event.target as HTMLElement;
    const draggedShip = document.querySelector('.dragging') as HTMLElement;

    if (targetCell.classList.contains(cellClass) && draggedShip) {
      targetCell.appendChild(draggedShip);
      draggedShip.classList.remove('dragging');
    }
  });
}

function addDraggableShips(container: HTMLElement): void {
  const ships = container.querySelectorAll('.ship');

  ships.forEach((ship) => {
    ship.addEventListener('dragstart', (event: DragEvent) => {
      ship.classList.add('dragging');
      event.dataTransfer.setData('text/plain', ship.id);
    });

    ship.addEventListener('dragend', () => {
      ship.classList.remove('dragging');
    });
  });
}
