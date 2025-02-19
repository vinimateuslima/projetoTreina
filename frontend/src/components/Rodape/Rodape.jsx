import { Col, Row } from "react-bootstrap";

// CSS
import './Rodape.css'

const Rodape = () => {
  return (
    <footer className="rodape">
      <Row>
        <Col>
        <p>Todos os direitos reservados &copy; - <a target="_blank" href="https://www.linkedin.com/in/vinicius-lima-924807181/">Vinicius Lima</a></p>
        </Col>
      </Row>
    </footer>
  );
};

export default Rodape;
