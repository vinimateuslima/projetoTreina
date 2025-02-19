import { Outlet } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toggle/style.css";
import Rodape from "./components/Rodape/Rodape";
import Barra from "./components/Barra/Barra";
import { CurriculoProvider } from "./Context/CurriculoContext";

// Contexto

function App() {
  return (
    <>
      <CurriculoProvider>
        <div className="App">
          <Barra />
          <div className="container">
            <Outlet />
          </div>

          <Rodape />
        </div>
      </CurriculoProvider>
    </>
  );
}

export default App;
