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
            <button class="w3-button w3-theme"
             onClick={()=>setPage("Employee2")  }> Change Page </button>
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