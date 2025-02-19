import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Funções
import { formatarInput } from "../../Functions/formatarInput";

// CSS
import "./CadastrarCurriculo.css";
import { Col, Row } from "react-bootstrap";
import Formacao from "../../components/Formacao/Formacao";

import { useState } from "react";

const CadastrarCurriculo = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [foto, setFoto] = useState("");
  const [endereco, setEndereco] = useState({
    cep: "",
    bairro: "",
    cidade: "",
    estado: "",
    numero: "",
    logradouro: "",
  });

  const updateNome = (e) => {
    setNome(e.target.value);
  };

  const updateTelefone = (e) => {
    let telefoneFormatado = formatarInput(e.target.value, "telefone");
    setTelefone(telefoneFormatado);
  };

  const updateFoto = (e) => {
    setFoto(e.target.value);
  };

  const updateEndereco = (e) => {
    let value = e.target.value;

    if (e.target.name == "cep") {
      // Formata o CEP com a mascara
      value = formatarInput(value, "cep");
      // Busca o cep formatado mas antes remove traço -
      buscarCep(value.replace(/\D/g, ""));
    }

    setEndereco((prevEndereco) => ({
      ...prevEndereco,
      [e.target.name]: value,
    }));
  };

  const buscarCep = async (cep) => {
    if (cep.length == 8) {
      console.log("disparou");
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setEndereco((prevEndereco) => ({
            ...prevEndereco,
            bairro: data.bairro,
            cidade: data.localidade,
            estado: data.uf,
            logradouro: data.logradouro,
          }));
        }
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const [formacoes, setFormacoes] = useState([
    {
      instituicao: "",
      curso: "",
      graduacao: "",
      anoInicio: "",
      anoTermino: "",
    },
  ]);

  const atualizarFormacao = (index, event) => {
    const values = [...formacoes];
    values[index][event.target.name] = event.target.value;
    setFormacoes(values);
  };

  const adicionarFormacao = () => {
    setFormacoes([
      ...formacoes,
      {
        instituicao: "",
        curso: "",
        graduacao: "",
        anoInicio: "",
        anoTermino: "",
      },
    ]);
  };

  const removerFormacao = (index) => {
    const values = [...formacoes];
    values.splice(index, 1);
    setFormacoes(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const curriculo = {
      nome: nome,
      telefone: telefone.replace(/\D/g, ""),
      foto: foto,
      endereco: {
        ...endereco,
        cep: endereco.cep.replace("-", ""), // Remove o traço do cep
      }
    };

    console.log(curriculo)

    const url = "http://localhost:8080/curriculos";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(curriculo),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`Error: ${errorData.mensagem}`);
          });
        }

        return response.json();
      })
      .then((curriculo) => {
        console.log(curriculo);
      })
      .catch((error) => {
        console.log(error.message);
      });

    console.log("Dados enviados:", formacoes);
    console.log(endereco);
  };

  return (
    <div id="cadastrar-curriculo">
      <h2>Cadastrar Currículo</h2>

      <Form id="form-cadastro" onSubmit={handleSubmit}>
        <section id="info-pessoal">
          <h4>Informação pessoal</h4>
          <Row className="g-3 align-items-center">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  id="nome"
                  type="text"
                  placeholder="Digite o seu nome"
                  onChange={updateNome}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={3}>
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o seu telefone"
                value={telefone}
                onChange={updateTelefone}
                required
              />
            </Col>
            <Col md={9}>
              <Form.Group>
                <Form.Label>Foto</Form.Label>
                <Form.Control
                  id="foto"
                  type="text"
                  placeholder="Cole a url da sua imagem"
                  onChange={updateFoto}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <p>Endereço</p>
          <Row>
            <Col md={2}>
              <Form.Group>
                <Form.Label>CEP</Form.Label>
                <Form.Control
                  id="cep"
                  type="text"
                  placeholder="00000000"
                  name="cep"
                  value={endereco.cep}
                  onChange={(e) => {
                    updateEndereco(e);
                  }}
                  maxLength={9}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Bairro</Form.Label>
                <Form.Control
                  id="bairro"
                  type="text"
                  name="bairro"
                  value={endereco.bairro}
                  disabled
                  required
                />
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Cidade</Form.Label>
                <Form.Control
                  id="cidade"
                  type="text"
                  name="cidade"
                  value={endereco.cidade}
                  disabled
                  required
                />
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  id="estado"
                  type="text"
                  name="estado"
                  value={endereco.estado}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={1}>
              <Form.Group>
                <Form.Label>Número</Form.Label>
                <Form.Control
                  id="numero"
                  type="number"
                  name="numero"
                  value={endereco.numero}
                  onChange={(e) => {
                    updateEndereco(e);
                  }}
                  placeholder="150..."
                  required
                />
              </Form.Group>
            </Col>

            <Col md={11}>
              <Form.Group>
                <Form.Label>Logradouro</Form.Label>
                <Form.Control
                  id="logradouro"
                  type="text"
                  value={endereco.logradouro}
                  disabled
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </section>

        <section id="formacao">
          <h4>Formação</h4>
          {formacoes.map((formacao, index) => (
            <Formacao
              key={index}
              index={index}
              formacao={formacao}
              onChange={(e) => atualizarFormacao(index, e)}
              onRemove={removerFormacao}
            />
          ))}

          <Button
            variant="primary"
            className="mt-3"
            onClick={adicionarFormacao}
          >
            + Adicionar Formação
          </Button>
        </section>

        <section id="experiencia"></section>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default CadastrarCurriculo;
