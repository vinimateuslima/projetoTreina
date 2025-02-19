import './Formacao.css'

import Form from "react-bootstrap/Form";
import { Col, Row, Button } from "react-bootstrap";

import PropTypes from "prop-types";

const Formacao = ({index, formacao, onChange, onRemove}) => {



  return (
   <div>
    <Row className="g-3 align-items-center">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Instituição</Form.Label>
                <Form.Control
                  id="instituicao"
                  name='instituicao'
                  type="text"
                  placeholder="Faculdade..."
                  value={formacao.instituicao}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-3 align-items-center">
            <Col md={8}>
              <Form.Group>
                <Form.Label>Curso</Form.Label>
                <Form.Control
                  id="curso"
                  name='curso'
                  type="text"
                  placeholder="Análise e Desenvolvimento..."
                  value={formacao.curso}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Graduação</Form.Label>
                <Form.Select name='graduacao' onChange={onChange}>
                  <option value={1}>Bacharelado</option>
                  <option value={2}>Licenciatura</option>
                  <option value={3}>Tecnológo</option>
                  <option value={4}>Mestrado</option>
                  <option value={5}>MBA</option>
                  <option value={6}>Especialização</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
          <Col md={3}>
              <Form.Group>
                <Form.Label>Ano início</Form.Label>
                <Form.Control
                  id="ano-inicio"
                  name='anoInicio'
                  type="number"
                  placeholder="2022..."
                  value={formacao.anoInicio}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label>Ano Término - ou previsto</Form.Label>
                <Form.Control
                  id="ano-termino"
                  name='anoTermino'
                  type="number"
                  placeholder="2025..."
                  value={formacao.anoTermino}
                  onChange={onChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="danger" className="mt-3" onClick={() => onRemove(index)}>
        Remover Formação
      </Button>
   </div>
  )
}

Formacao.propTypes = {
    index: PropTypes.string,
    formacao: PropTypes.string,
    onChange: PropTypes.string,
    onRemove: PropTypes.string,
};

export default Formacao