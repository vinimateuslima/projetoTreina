import "./Experiencia.css";

import Form from "react-bootstrap/Form";
import { Col, Row, Button } from "react-bootstrap";

import PropTypes from "prop-types";

const Experiencia = ({ index, experiencia, onChange, onRemove }) => {
  return (
    <div>
      <Row className="g-3 align-items-center">
        <Col md={12}>
          <Form.Group>
            <Form.Label>Função</Form.Label>
            <Form.Control
              id="funcao"
              name="funcao"
              type="text"
              placeholder="Analista..."
              value={experiencia.funcao}
              onChange={onChange}
              maxLength={100}
              required
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className="g-3 align-items-center">
        <Col md={8}>
          <Form.Group>
            <Form.Label>Empresa</Form.Label>
            <Form.Control
              id="empresa"
              name="empresa"
              type="text"
              placeholder="Microsoft..."
              value={experiencia.empresa}
              onChange={onChange}
              maxLength={100}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Ano início</Form.Label>
            <Form.Control
              id="ex-ano-inicio"
              name="anoInicio"
              type="number"
              placeholder="2022..."
              value={experiencia.anoInicio}
              onChange={onChange}
              required
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group>
            <Form.Label>Ano Término</Form.Label>
            <Form.Control
              id="ex-ano-termino"
              name="anoTermino"
              type="number"
              placeholder="2025..."
              value={experiencia.anoTermino}
              onChange={onChange}
            />
          </Form.Group>
        </Col>
      </Row>
      <Button variant="danger" className="mt-3" onClick={() => onRemove(index)}>
        Remover Experiência
      </Button>
    </div>
  );
};

Experiencia.propTypes = {
  index: PropTypes.string,
  experiencia: PropTypes.string,
  onChange: PropTypes.string,
  onRemove: PropTypes.string,
};

export default Experiencia;
