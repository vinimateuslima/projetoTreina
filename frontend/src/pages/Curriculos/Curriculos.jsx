import CardCurriculo from "../../components/CardCurriculo/CardCurriculo";

import { useState, useEffect } from "react";

import Loading from "../../components/Loading/Loading";

// CSS
import "./Curriculos.css";
import { Container, Row, Col } from "react-bootstrap";

const Curriculos = () => {
  const [curriculos, setCurriculos] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:8080";

  useEffect(() => {
    fetch(url + `/curriculos`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`Error: ${errorData.mensagem}`);
          });
        }

        return response.json();
      })
      .then((curriculos) => {
        setCurriculos(curriculos);
        console.log(curriculos);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const deletarCurriculo = (id) => {
    fetch(url + `/curriculos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`Error: ${errorData.mensagem}`);
          });
        }

        alert("Currículo deletado com sucesso!")
        window.location.reload();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  if (loading) return <Loading color={"primary"} />;

  return (
    <div className="curriculos">
      <h1>Todos os currículos</h1>
      <Container>
        <Row>
          {curriculos.length > 0 &&
            curriculos.map((curriculo) => (
              <Col md={6} key={curriculo.idCurriculo}>
                <CardCurriculo
                  foto={curriculo.foto}
                  nome={curriculo.nome}
                  estado={curriculo.endereco.estado}
                  tel={curriculo.telefone}
                  bairro={curriculo.endereco.bairro}
                  cidade={curriculo.endereco.cidade}
                  id={curriculo.idCurriculo}
                  deletarCurriculo={() => deletarCurriculo(curriculo.idCurriculo)}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
};

export default Curriculos;
