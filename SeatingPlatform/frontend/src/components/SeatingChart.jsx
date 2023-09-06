import {useState, useEffect} from "react"
import axios from "axios"
import  List from "./List"



function SeatingChart() {

    // Fetch the initial state from Django API
    useEffect(() => {
        axios({
            method: "GET",
            url:"/seating-chart-state/",
        }).then((response) => {
                setGrid(response.data.state_data || initialGrid);
                setGridRow(response.data.rows);
                setGridCol(response.data.cols);
            }).catch((error) => {
                console.error("Error fetching seating chart state:", error.response.data);
            });
        
        axios({
            method: "GET",
            url:"/indexed-seating/",
        }).then((response) => {
                setIndexedGrid(response.data.indexed_array || initialGrid);
            }).catch((error) => {
                console.error("Error fetching seating chart state:", error.response.data);
            });
    }, []);


    const [gridRow, setGridRow] = useState();
    const [gridCol, setGridCol] = useState();
    

    var numRows = 4;
    var numCols = 4;
    

    const initialGrid = [];
    for (let i = 0; i < numRows; i++) {
        const row = Array.from(Array(numCols), () => false);
        initialGrid.push(row);
    }
    

    const [grid, setGrid] = useState(initialGrid);
    const [indexedGrid, setIndexedGrid] = useState(initialGrid);

    const handleSet = () => {
        
        const newNumCols = gridCol;
        const newNumRows = gridRow;

        console.log(newNumRows);
        console.log(newNumCols);

        const newInitialGrid = [];
        for (let i = 0; i < newNumRows; i++) {
            const newRow = Array.from(Array(newNumCols), () => false);
            newInitialGrid.push(newRow);
        }

        setGrid(newInitialGrid);
        console.log("newInitialGrid after",newInitialGrid )

        handleSave();
    };


    // Update and save the state when a cell is toggled
    const toggleCell = (rowIndex, colIndex) => {
        const newGrid = [...grid];
        newGrid[rowIndex][colIndex] = !grid[rowIndex][colIndex];
        setGrid(newGrid);

        // Save the updated state to Django API
    };

    const handleSave = () => {
        axios({
            method: "POST",
            url: "/seating-chart-state/",
            data: { state_data: grid, rows: gridRow, cols: gridCol }
        }).then((response) => {
            console.log("State saved successfully:", response.data);
        }).catch((error) => {
            console.error("Error saving seating chart state:", error.response.data);
        });
        console.log(grid);
    };

    

    const getCellColor = (cellValue) => {
        return cellValue ? 'green' : 'red';
    };

    const getIndexedCellColor = (cellValue) => {
        if (cellValue === false){
            return 'black';
        }
        else {
            return '#4ef5d9';
        }
    };

    const handleChangeRow = (event) => {
        setGridRow(parseInt(event.target.value));
    };

    const handleChangeCol = (event) => {
        setGridCol(parseInt(event.target.value));
    };

    const handleAssignSeating = () => {
        var valid_seats = [];
        for (let i = 0; i < gridRow; i++){
            for (let j = 0; j < gridCol; j++){
                if (grid[i][j]){
                    valid_seats.push({row: i, col: j});
                }
            }
        }

        console.log(valid_seats);

        var indexed_array = [];

        // creates 2D array of same size with all values as false 
        for (let i = 0; i < gridRow; i++) {
            const row = Array.from(Array(gridCol), () => false);
            indexed_array.push(row);
        }

        // assigns number to each valid seat and leaves it as false if invalid
        var counter = 1;
        for (let i = 0; i < gridRow; i++){
            for (let j = 0; j < gridCol; j++){
                if (grid[i][j]){
                    indexed_array[i][j] = counter;
                    counter++;
                }
            }
        }

        console.log(valid_seats);
        console.log(indexed_array);

        setIndexedGrid(indexed_array);

        axios({
            method: "POST",
            url: "/indexed-seating/",
            data: { indexed_array: indexed_array, valid_seats: valid_seats }
        }).then((response) => {
            console.log("State saved successfully:", response.data);
        }).catch((error) => {
            console.error("Error saving seating chart state:", error.response.data);
        });

    };


    return(
        <div classname='seating-chart-page' style={{display: "flex"}}>
            <div className="set-seating">
                <input type="number" onChange={handleChangeRow} value={gridRow}/>
                <input type="number" onChange={handleChangeCol} value={gridCol}/>
                <button onClick={()=>handleSet()}>Set</button>
                <div className="toggleable-grid">
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
                            {/*cell ? 'ON' : 'OFF'*/}
                        </div>
                        ))}
                    </div>
                    ))}
                </div>


                    <div className="save-button">
                    <button onClick={handleSave}> Save </button>
                    </div>
            </div>
            <div className="display-seating">
                <button onClick={handleAssignSeating}>Assign Seating</button>
                <div className="assigned-seating-grid">
                    {indexedGrid && indexedGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className="indexed-grid-row">
                        {row.map((indexedCell, colIndex) => (
                        <div
                            key={colIndex}
                            className="indexed-grid-cell"
                            style={{ backgroundColor: getIndexedCellColor(indexedCell) }}
                        >
                            {/* You can customize the cell content here */}
                            {indexedCell ? indexedCell : ''}
                        </div>
                        ))}
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default SeatingChart;