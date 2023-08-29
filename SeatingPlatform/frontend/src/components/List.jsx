function List(props){
    function handleClick(){
  props.deletion(props.id)
}
  return (
      <div className="employee">
        <h1> {props.title}</h1>
        <h2 >  Name: {props.name} </h2>
        <p > Seat Number: {props.seat_num}</p>
        <p > Days: {props.days}</p>
        <button onClick={handleClick}>Delete</button>
      </div>
  )
}

export default List;