import { useState } from "react";
import Employee from "./Employees"
import Header from "./Header";
import Footer from "./Footer";
import SeatingChart from "./SeatingChart";
import Projects from "./Projects";
import ProjectSpaces from "./ProjectSpaces";
import Monday from "./Days/Monday";
import Tuesday from "./Days/Tuesday";
import Wednesday from "./Days/Wednesday";
import Thursday from "./Days/Thursday";
import Friday from "./Days/Friday";



function App() {
    var  [ page, setPage] = useState("Employee")
    var curpage = {}
    switch(page){
                case "Employee":
                    curpage = <Employee/>
                    break;
                case "SeatingChart" :
                    curpage = <SeatingChart/>
                    break;
                case "Projects":
                    curpage = <Projects/>
                    break;
                case "ProjectSpaces" :
                    curpage = <ProjectSpaces/>
                    break;  
                case "Monday" :
                    curpage = <Monday/>
                    break; 
                case "Tuesday" :
                    curpage = <Tuesday/>
                    break; 
                case "Wednesday" :
                    curpage = <Wednesday/>
                    break; 
                case "Thursday" :
                    curpage = <Thursday/>
                    break; 
                case "Friday" :
                    curpage = <Friday/>
                    break;                   
                default :
                    curpage = <Employee/>
                    break;
            }
  return (
    <div className='App'>
        <Header/>
        <div>
        
        <ul class="nav nav-tabs navbar-style" id="navbar" role="tablist">
            <li class="nav-item" role="presentation">
                <button onClick={()=>setPage("Employee")} class="nav-link active" id="home-tab" data-bs-toggle="tab" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link dropdown-toggle" id="seat-view" data-bs-toggle="dropdown" type="button" role="dropdown" aria-controls="profile-tab-pane" aria-selected="false">Seat Assignment View</button>
                    <ul class="dropdown-menu">
                            <li class="dropdown-item-style"><a onClick={()=>setPage("Monday")} class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Monday</a></li>
                            <li class="dropdown-item-style"><a onClick={()=>setPage("Tuesday")} class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Tuesday</a></li>
                            <li class="dropdown-item-style"><a onClick={()=>setPage("Wednesday")} class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Wednesday</a></li>
                            <li class="dropdown-item-style"><a onClick={()=>setPage("Thursday")} class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Thursday</a></li>
                            <li class="dropdown-item-style"><a onClick={()=>setPage("Friday")} class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Friday</a></li>
                    </ul>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link dropdown-toggle" id="modify" data-bs-toggle="dropdown" type="button" role="dropdown" aria-controls="profile-tab-pane" aria-selected="false">Modify Data</button>
                    <ul class="dropdown-menu">
                            <li class="dropdown-item-style"><button onClick={()=>setPage("SeatingChart")} class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Seating Chart</button></li>
                            <li class="dropdown-item-style"><button onClick={()=>setPage("Projects")} class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Projects</button></li>
                            <li class="dropdown-item-style"><button onClick={()=>setPage("ProjectSpaces")} class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Project Spaces</button></li>
                    </ul>
            </li>
        </ul>

        <div>
        {
            curpage
        }    
        </div>

        </div>

        <Footer /> 
    </div>
  );
}

export default App;