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
        
        <ul class="nav nav-tabs navbar-style" id="navbar" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link active" id="home-tab" data-bs-toggle="tab" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Home</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link dropdown-toggle" id="profile-tab" data-bs-toggle="dropdown" type="button" role="dropdown" aria-controls="profile-tab-pane" aria-selected="false">Seat Assignment View</button>
                    <ul class="dropdown-menu">
                            <li class="dropdown-item-style"><a class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Monday</a></li>
                            <li class="dropdown-item-style"><a class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Tuesday</a></li>
                            <li class="dropdown-item-style"><a class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Wednesday</a></li>
                            <li class="dropdown-item-style"><a class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Thursday</a></li>
                            <li class="dropdown-item-style"><a class="dropdown-item" role="tab" data-bs-toggle="tab" href="#">Friday</a></li>
                        </ul>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link" id="contact-tab" data-bs-toggle="tab" type="button" role="tab" aria-controls="contact-tab-pane" aria-selected="false">Modify</button>
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