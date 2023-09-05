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

    const handleChangeRow = (event) => {
        setGridRow(parseInt(event.target.value));
    };

    const handleChangeCol = (event) => {
        setGridCol(parseInt(event.target.value));
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
                <button>Assign Seating</button>
            </div>
        </div>
    );
};


export default SeatingChart;