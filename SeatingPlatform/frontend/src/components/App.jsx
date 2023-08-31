import { useState } from "react";
import Employee from "./Employees"
import Employee2 from "./Employee2";
import Header from "./Header";
import Footer from "./Footer";



function App() {
    var  [ page, setPage] = useState("Employee")
    var curpage = {}
    switch(page){
                case "Employee":
                    curpage = <Employee/>
                    break;
                case "Employee2" :
                    curpage = <Employee2/>
                    break;
                default :
                    curpage = <Employee/>
                    break;
            }
  return (
    <div className='App'>
        <Header/>
        <div>
        <ul class="nav nav-tabs navbar-style" id="navbar">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Seat Assignment View</a>
                    <ul class="dropdown-menu">
                        <li class="dropdown-item-style"><a class="dropdown-item" href="#">Monday</a></li>
                        <li class="dropdown-item-style"><a class="dropdown-item" href="#">Tuesday</a></li>
                        <li class="dropdown-item-style"><a class="dropdown-item" href="#">Wednesday</a></li>
                        <li class="dropdown-item-style"><a class="dropdown-item" href="#">Thursday</a></li>
                        <li class="dropdown-item-style"><a class="dropdown-item" href="#">Friday</a></li>
                    </ul>
            </li>
            <li class="nav-item">
                <a class="nav-link">Modify Data</a>
            </li>
        </ul>

            {/*
            <button class="w3-button w3-theme"
             onClick={()=>setPage("Employee2")  }> Change Page </button>
            */}
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