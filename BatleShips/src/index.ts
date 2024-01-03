document.addEventListener('DOMContentLoaded', () => {
    const playerContainer = document.getElementById('player-container');
    const playerBoard = document.getElementById('player-board');
    const computerBoard = document.getElementById('computer-board');
  
    initBoard(playerBoard, 'player-cell');
    initBoard(computerBoard, 'computer-cell');
  
    // Agrega eventos de clic y arrastre para la lógica del juego
    addEvents(playerBoard, 'player-cell');
    addDraggableShips(playerContainer);
  });
  
  function initBoard(board: HTMLElement, cellClass: string): void {
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement('div');
      cell.classList.add(cellClass);
      cell.dataset.name = `Cell ${i}`;
      board.appendChild(cell);
    }
  }
  
  function addEvents(board: HTMLElement, cellClass: string): void {
    board.addEventListener('click', (event) => {
      const targetCell = event.target as HTMLElement;
      if (targetCell.classList.contains(cellClass)) {
        // Implementa la lógica del juego aquí para manejar los clics en el tablero
        // Puedes usar las clases para distinguir entre el tablero del jugador y de la computadora
        console.log('Cell clicked:', targetCell.dataset.name);
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
      ship.addEventListener('dragstart', () => {
        ship.classList.add('dragging');
      });
  
      ship.addEventListener('dragend', () => {
        ship.classList.remove('dragging');
      });
    });
  }
  