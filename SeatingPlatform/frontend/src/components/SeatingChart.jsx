import {useState, useEffect} from "react"
import axios from "axios"
import  Employee from "./Employees"



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
                setDaybyDay(response.data.day_by_day_seating || {});
                setMinDays(response.data.min_days);
                setMinSeats(response.data.min_seats);
            }).catch((error) => {
                console.error("Error fetching seating chart state:", error.response.data);
            });

        axios({
            method: "GET",
            url:"/employees/",
            }).then((response)=>{
                const data = response.data;
                setEmployees(data);
            }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
                }
            });
    }, []);


    const [gridRow, setGridRow] = useState();
    const [gridCol, setGridCol] = useState();
    const [employees, setEmployees] = useState();
    const [minSeats, setMinSeats] = useState();
    const [minDays, setMinDays] = useState();
    

    var numRows = 4;
    var numCols = 4;
    

    const initialGrid = [];
    for (let i = 0; i < numRows; i++) {
        const row = Array.from(Array(numCols), () => false);
        initialGrid.push(row);
    }
    

    const [grid, setGrid] = useState(initialGrid);
    const [indexedGrid, setIndexedGrid] = useState(initialGrid);
    const [dayByDay, setDaybyDay] = useState();
    const [displayError, setDisplayError] = useState();

    const handleSet = () => {
        
        const newNumCols = gridCol;
        const newNumRows = gridRow;

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

        setDisplayError("");

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
            data: { indexed_array: indexed_array, valid_seats: valid_seats, min_days: minDays, min_seats: minSeats }
        }).then((response) => {
            console.log("State saved successfully:", response.data);
        }).catch((error) => {
            console.error("Error saving seating chart state:", error.response.data);
        });


        // LOGIC FOR ASSIGNING EMPLOYEES DAY BY DAY BASED ON MIN DAYS AND MIN SEATS TO BE FILLED
        var employeeNames = employees.map(e => e.name);

        //
        //
            // Initialize variables
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
        const seatingAssignments = {};
        const employeeDays = {};

        // Initialize employeeDays
        employeeNames.forEach(employee => {
            employeeDays[employee] = 0;
        });

        // Check feasibility
        const totalSeats = valid_seats.length * 5;
        const requiredSeats = minSeats * 5;
        const numEmployees = employeeNames.length;
        const requiredDays = numEmployees * minDays;

        if (requiredSeats > totalSeats || requiredDays > totalSeats || minSeats > numEmployees) {
            // CHANGE TO ACTUAL DISPLAY ON SCREEN
            console.log("Unable to fulfill");
            setDisplayError("Unable to fulfill with current conditions. Change and try again.");
            return;
        }

        // Assign seats
        daysOfWeek.forEach(day => {
            seatingAssignments[day] = [];
            let availableEmployees = employeeNames.filter(employee => employeeDays[employee] < minDays);
            if (availableEmployees.length == 0 || availableEmployees.length < minSeats){
                availableEmployees = [...employeeNames];
            }

            for (let i = 0; i < minSeats; i++) {
                const randomIndex = Math.floor(Math.random() * availableEmployees.length);
                const selectedEmployee = availableEmployees[randomIndex];

                seatingAssignments[day].push(selectedEmployee);
                employeeDays[selectedEmployee] += 1;

                // Remove selected employee from available list for that day
                availableEmployees = availableEmployees.filter(employee => employee !== selectedEmployee);
            }
        });


        // Check for unfulfilled requirements
        console.log(employeeDays);
        for (const [employee, days] of Object.entries(employeeDays)) {
            if (days < minDays) {
                console.log("Unable to fulfill");
                setDisplayError("Unable to fulfill with current conditions. Change and try again.");
                return;
            }
        }

        // Update state or save to database
        setDaybyDay(seatingAssignments);
        console.log("Seating assignments:", seatingAssignments);

        axios({
            method: "POST",
            url: "/indexed-seating/",
            data: { indexed_array: indexed_array, valid_seats: valid_seats, min_days: minDays, min_seats: minSeats, day_by_day_seating: seatingAssignments }
        }).then((response) => {
            console.log("State saved successfully:", response.data);
        }).catch((error) => {
            console.error("Error saving seating chart state:", error.response.data);
        });


    };

    const handleChangeMinSeats = (event) => {
        setMinSeats(parseInt(event.target.value));
    };

    const handleChangeMinDays = (event) => {
        setMinDays(parseInt(event.target.value));
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
                <div className="input&assign" style={{display: 'flex'}}>
                    {/* Insert Input for min days, min seats filled */}
                    <input type="number" onChange={handleChangeMinSeats} value={minSeats} />
                    <input type="number" onChange={handleChangeMinDays} value={minDays} /> 
                    <button onClick={handleAssignSeating}>Assign Seating</button>
                </div>
                <div style={{display:"flex"}}>
                    <div style={{borderStyle:'dashed'}}>Min Number of Seats to be Filled: {minSeats}</div>
                    <div style={{borderStyle:'dashed'}}>Min Number of Days to Come: {minDays}</div>
                </div>
                <div>
                    {displayError}
                </div>
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