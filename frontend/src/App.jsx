import {Outlet} from "react-router-dom";
import './App.css'
import Barra from "./components/Barra/Barra";
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toggle/style.css" 

function App() {

  return (
    
    <>

      <div className="App">
        <Barra/>
        <div className="container">
        
          <Outlet/>
        </div>
      </div>

     </>
  )
}

export default App
