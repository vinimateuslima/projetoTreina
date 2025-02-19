import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";

// Css
import "./Barra.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

import PropTypes from "prop-types";

const Barra = ({ foto }) => {
  return (
    <>
      <Navbar expand="lg" className="menu">
        <Container fluid>
          <Navbar.Brand href="#">COOLRICLE</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 menuBotoes"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Editar</Nav.Link>
              <Nav.Link href="#action2">Exibir</Nav.Link>
            </Nav>
            <div className="direito">
              <div className="imagem">
              <Image
               src={foto ? foto : "https://placehold.co/70"}
                roundedCircle
              />
              </div>
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
