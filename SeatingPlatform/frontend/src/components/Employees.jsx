import {useState, useEffect} from "react"
import axios from "axios"
import  List from "./List"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"


function Employee() {

    const [employees , setNewEmployees] = useState(null)
    const [formEmployee, setFormEmployee] = useState({
      name: null,
      seat_num: null,
      days: null
    })
    const [searchedEmployee, setSearchedEmployee] = useState("")
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
        const result =
            employees.find((employee) => employee.name.toLowerCase().includes(searchedEmployee.toLowerCase()));
        setDisplayEmployee(result);
        event.preventDefault();
    }

    function searchEmployee(event){
        const result = 
            employees.find((employee) => employee.name.toLowerCase() === searchedEmployee.toLowerCase());
        setDisplayEmployee(result);
        event.preventDefault();
    }


  return (

     <div className='employees'>
        <div className='separation'>
            <div className='left-sep'>
            <div className="create">
                <form className="create-employee" id="form1">
                <input type="text"
                onChange={handleChange}
                placeholder="Name"
                name="name"
                value={formEmployee.name}
                />
                <input onChange={handleChange} 
                type="number"
                name="seat_num"
                placeholder="Seat Number"
                value={formEmployee.seat_num}
                />
                <input onChange={handleChange} 
                type="text"
                name="days" 
                placeholder="Days" 
                value={formEmployee.days}
                />
                <button class="w3-button w3-circle w3-large w3-black"
                onClick={createEmployee}><FontAwesomeIcon icon={faPlus} /></button>
                </form>
            </div>
            </div>
            <div className="right-sep">
                  <div className="search" style={{position: 'relative'}}>
                      <form className="search-employee" id="form2">
                          <input onChange={handleChangeSearch}
                          type="text" 
                          placeholder="Search Employee" 
                          value={searchedEmployee}/>
                          <button class="w3-button w3-circle w3-large w3-card-4" onClick={searchEmployee} > 
                              <FontAwesomeIcon icon={faMagnifyingGlass} />
                          </button>
                      </form>

                      <div className="display-searched">
                          { displayEmployee &&
                          <div class="search-card" >
                          <List
                              title= 'Searched Employee'
                              key={displayEmployee.id}
                              id={displayEmployee.id}
                              name={displayEmployee.name}
                              seat_num={displayEmployee.seat_num}
                              days={displayEmployee.days}
                              deletion={DeleteEmployee} />
                          </div>}
                      </div>
                  </div>
            </div>
  </div>

            <div class="parent-display">

                    { employees && employees.map(employee => 
                    <div class="display-card">
                    <List
                    key={employee.id}
                    id={employee.id}
                    name={employee.name}
                    seat_num={employee.seat_num} 
                    days={employee.days}
                    deletion ={DeleteEmployee}
                    />
                    </div>
                    )}



            
            </div>
    </div>

  );
}

export default Employee;