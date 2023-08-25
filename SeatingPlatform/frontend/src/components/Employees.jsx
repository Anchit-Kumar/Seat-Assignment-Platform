import {useState, useEffect} from "react"
import axios from "axios"
import  List from "./List"


function Employee() {

    const [employees , setNewEmployees] = useState(null)
    const [formEmployee, setFormEmployee] = useState({
      name: "",
      seat_num: null,
      days: ""
    })
    const [searchedEmployee, setSearchedEmployee] = useState()
    const [displayEmployee, setDisplayEmployee] = useState()


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
            name: formEmployee.name,
            seat_num: formEmployee.seat_num,
            days: formEmployee.days
           }
        })
        .then((response) => {
          getEmployees()
        })

        setFormEmployee(({
            name: "",
            seat_num: "",
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
    
    function handleChangeSearch(event){
        setSearchedEmployee(event.target.value);
    }

    function searchEmployee(event){
        const result = employees.find((employee) => employee.name.toLowerCase() === searchedEmployee.toLowerCase());
        setDisplayEmployee(result);
        event.preventDefault();
    }


  return (

     <div className=''>
        <div className="create">
            <form className="create-employee" id="form1">
            <input onChange={handleChange} text={formEmployee.name} placeholder="Name" name="name" value={formEmployee.name} />
            <input onChange={handleChange} name="seat_num" placeholder="Seat Number" value={formEmployee.seat_num} />
            <input onChange={handleChange} name="days" placeholder="Days" value={formEmployee.days}/>
            <button onClick={createEmployee}>Add New Employee</button>
            </form>
        </div>

        <div className="search">
            <form className="search-employee" id="form2">
                <input onChange={handleChangeSearch} placeholder="Search Employee" />
                <button onClick={searchEmployee}> Search </button>
            </form>
        </div>

        { displayEmployee &&
        <>
        <h1>Searched Employee: </h1>
        <List
            key={displayEmployee.id}
            id={displayEmployee.id}
            name={displayEmployee.name}
            seat_num={displayEmployee.seat_num}
            days={displayEmployee.days}
            deletion={DeleteEmployee} />
        </>}

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