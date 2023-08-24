import {useState, useEffect} from "react"
import axios from "axios"
import  List from "./List"


function Employee() {

    const [employees , setNewEmployees] = useState(null)
    const [formEmployee, setFormEmployee] = useState({
      id: 0,
      name: "",
      seat_num: 0,
      days: ""
    })

    useEffect(() => {
      getEmployees()
        } ,[])

    function getEmployees() {
      axios({
          method: "GET",
          url:"/employees/",
        }).then((response)=>{
          const data = response.data
          setNewEmployees(data)
        }).catch((error) => {
          if (error.response) {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
            }
        })}

    function createEmployee(event) {
        axios({
          method: "POST",
          url:"/employees/",
          data:{
            id: formEmployee.id,
            name: formEmployee.name,
            seat_num: formEmployee.seat_num,
            days: formEmployee.days
           }
        })
        .then((response) => {
          getEmployees()
        })

        setFormEmployee(({
            id: 0,
            name: "",
            seat_num: 0,
            days: ""}))

        event.preventDefault()
    }

    function DeleteEmployee(id) {
        axios({
          method: "DELETE",
          url:`/employees/${id}/`,
        })
        .then((response) => {
          getEmployees()
        })
    }

    function handleChange(event) { 
        const {value, name} = event.target
        setFormEmployee(prevEmployee => ({
            ...prevEmployee, [name]: value})
        )}


  return (

     <div className=''>

        <form className="create-employee">
          <input onChange={handleChange} name="id" value={formEmployee.id} />
          <input onChange={handleChange} text={formEmployee.name} name="name" value={formEmployee.name} />
          <input onChange={handleChange} name="seat_num" value={formEmployee.seat_num} />
          <input onChange={handleChange} name="days" value={formEmployee.days}/>
          <button onClick={createEmployee}>Add new employee</button>
        </form>

        { employees && employees.map(employee => <List
        key={employee.id}
        id={employee.id}
        name={employee.name}
        seat_num={employee.seat_num} 
        days={employee.days}
        deletion ={DeleteEmployee}
        />
        )}

    </div>

  );
}

export default Employee;