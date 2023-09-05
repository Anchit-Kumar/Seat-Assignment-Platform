import React, { useState } from 'react';

const ToggableGrid = () => {
  // Define the size of the grid (adjust as needed)
  const numRows = 4;
  const numCols = 4;

  // Initialize the 2D array to store the toggle states
  const [grid, setGrid] = useState(() => {
    const initialGrid = [];
    for (let i = 0; i < numRows; i++) {
      const row = Array.from(Array(numCols), () => false);
      initialGrid.push(row);
    }
    return initialGrid;
  });

  // Function to toggle a cell on/off
  const toggleCell = (rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = !grid[rowIndex][colIndex];
    setGrid(newGrid);
  };

  // Function to get the cell color based on its toggle value
  const getCellColor = (cellValue) => {
    return cellValue ? 'green' : 'red';
  };

  return (
    <div className="toggable-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="grid-cell"
              onClick={() => toggleCell(rowIndex, colIndex)}
              style={{ backgroundColor: getCellColor(cell) }}
            >
              {/* You can customize the cell content here */}
              {cell ? 'ON' : 'OFF'}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ToggableGrid;