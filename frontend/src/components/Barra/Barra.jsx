import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "react-bootstrap/Image";

// Css
import "./Barra.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

const Barra = () => {
  return (
    <>
      <Navbar expand="lg" className="menu">
        <Container fluid>
          <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
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
              <Image src="https://placehold.co/70" roundedCircle />
              <DarkModeToggle />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Barra;
