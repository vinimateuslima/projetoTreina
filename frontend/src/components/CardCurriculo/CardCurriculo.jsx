import "./CardCurriculo.css";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const CardCurriculo = ({ foto, nome, estado, tel, bairro, cidade, id }) => {
  return (
    <div className="card-curriculo">
      <div className="card-image">
        <Image src={foto || "https://placehold.co/170"} rounded />
      </div>

      <div className="card-body">
        <div className="card-name">
          <h5>{nome}</h5>
        </div>
        <div className="card-info">
          <p>{estado}</p>
          <p>{tel}</p>
        </div>
        <div className="card-address">
          <p>{bairro}</p>
          <p>{cidade}</p>
        </div>

        <div className="card-buttons">
          <Link to={`/exibir-curriculo/${id}`}>
            <Button variant="primary">Ver</Button>
          </Link>

          <Button variant="danger">
            <Link>Excluir</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardCurriculo;
