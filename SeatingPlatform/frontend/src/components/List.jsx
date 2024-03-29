function List(props){
    function handleClick(){
      props.deletion(props.id)
    }

    function displayDays(schedule){
      const scheduleStrings = schedule.map(entry => `${entry.day}: Seat ${entry.seatNumber}`).join(', ');
      return scheduleStrings;
    }   


  return (
      <div className="employee">
        <h1> {props.title}</h1>
        <h2 > {props.name} </h2>
        {/*<p > Seat Number: {props.seat_num}</p>
        <p > Days: {props.days}</p>*/}
        <p > <h3>Seating:</h3> {displayDays(props.seating)}</p>
        <button onClick={handleClick}>Delete</button>
      </div>
  )
}

export default List;