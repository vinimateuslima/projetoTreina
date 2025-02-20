import { Button } from 'react-bootstrap';
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
      <div id="home">
        <h1>Bem Vindo ao <span>COOLRICLE</span></h1>
        <div className="botoes">
         <Link to={"/curriculos"}> <Button variant='primary'>Ver Currículos</Button></Link>
         <Link to={"/cadastrar-curriculo"}> <Button variant='primary'>Cadastrar Currículos</Button></Link>
        </div>
      </div>

  );
};

export default Home;
