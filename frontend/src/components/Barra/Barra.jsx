import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";


// Css
import "./Barra.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import { useCurriculo } from "../../Context/CurriculoContext";

const Barra = () => {
  const { curriculoFoto, curriculoId } = useCurriculo();

  const location = useLocation();

  const isCurriculoPage = location.pathname.startsWith("/exibir-curriculo") || location.pathname.startsWith("/editar-curriculo");

  return (
    <>
      <Navbar expand="lg" className="menu" sticky="top">
        <Container fluid>
          <Navbar.Brand href="#">COOLRICLE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 menuBotoes"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link to={"/"} className="nav-link">
                Inicio
              </Link>
              <Link to={"/cadastrar-curriculo"} className="nav-link">
                Cadastrar
              </Link>
              <Link to={"/curriculos"} className="nav-link">Curriculos</Link>
              {isCurriculoPage && (
                <>
                  <Link className="nav-link" to={`/editar-curriculo/${curriculoId}`}>Editar</Link>
                  <Link className="nav-link" to={`/exibir-curriculo/${curriculoId}`}>
                    Exibir
                  </Link>
                </>
              )}
            </Nav>
            <div className="direito">
              {isCurriculoPage && curriculoFoto && (
                <div className="imagem">
                  <Image
                    src={
                      curriculoFoto ? curriculoFoto : "https://placehold.co/70"
                    }
                    roundedCircle
                  />
                </div>
              )}
              <DarkModeToggle />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

Barra.propTypes = {
  foto: PropTypes.string,
};

export default Barra;
