import {useState, useEffect} from "react"
import axios from "axios"



function Thursday() {

    const [indexedGrid, setIndexedGrid] = useState();
    const [dayByDay, setDaybyDay] = useState({});
    const [validSeats, setValidSeats] = useState([]);

    useEffect(() => {
        axios({
            method: "GET",
            url:"/indexed-seating/",
        }).then((response) => {
                setIndexedGrid(response.data.indexed_array);
                setDaybyDay(response.data.day_by_day_seating || {});
                setValidSeats(response.data.valid_seats || []);
            }).catch((error) => {
                console.error("Error fetching seating chart state:", error.response.data);
            });
    }, []);

    const getIndexedCellColor = (cellValue) => {
        if (cellValue === false){
            return 'black';
        }
        else {
            return '#4ef5d9';
        }
    };

    const thursday_seating = dayByDay.Thursday || [];

    // Create an array of integers from 1 to the number of valid seats
    const validSeatNumbers = Array.from({ length: validSeats.length }, (_, i) => i + 1);

    // Shuffle the array
    validSeatNumbers.sort(() => Math.random() - 0.5);

    const mappedSeating = thursday_seating.length > 0 ? thursday_seating.map((employee, index) => ({
        employee,
        seatNumber: validSeatNumbers[index],
      })) : [];

    return(
    <div>
      <div>
        <h1>Thursday</h1>
      </div>
      <div style={{display: "flex"}}>
        <div className="assigned-seating-grid" style={{padding: '10px 20px'}}>
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
        <div style={{padding: '10px 20px'}}>
            {mappedSeating.map((item, index) => (
            <div key={index}>
                Employee: {item.employee}, Seat Number: {item.seatNumber}
            </div>
            ))}
        </div>
      </div>
    </div>
    );
}
export default Thursday;