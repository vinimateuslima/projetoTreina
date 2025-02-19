import { Outlet } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toggle/style.css";
import Rodape from "./components/Rodape/Rodape";
import Barra from "./components/Barra/Barra";

function App() {

  const hideNavbarRoutes = ["/CadastrarCurriculo"]; 

  return (
    <>
      <div className="App">
      {!hideNavbarRoutes.includes(location.pathname) && <Barra />}
        <div className="container">
        <Outlet />
        </div>

        <Rodape />
      </div>
    </>
  );
}

export default App;
