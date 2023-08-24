function List(props){
    function handleClick(){
  props.deletion(props.id)
}
  return (
      <div className="employee">
        <h1 >  Name: {props.name} </h1>
        <p > Seat Number: {props.seat_num}</p>
        <p > Days: {props.days}</p>
        <button onClick={handleClick}>Delete</button>
      </div>
  )
}

export default List;