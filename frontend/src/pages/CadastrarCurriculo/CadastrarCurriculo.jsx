import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// Funções
import { formatarInput } from "../../Functions/formatarInput";

// CSS
import "./CadastrarCurriculo.css";

import { Col, Row } from "react-bootstrap";
import Formacao from "../../components/Formacao/Formacao";
import Experiencia from "../../components/Experiencia/Experiencia";

//Icons
import { FaGithub, FaLinkedin, FaInstagram, FaGlobe } from "react-icons/fa";

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
  const [formacoes, setFormacoes] = useState([
    {
      instituicao: "",
      curso: "",
      anoInicio: "",
      anoTermino: "",
      idGraduacao: 1,
    },
  ]);
  const [experiencias, setExperiencias] = useState([
    {
      funcao: "",
      empresa: "",
      anoInicio: "",
      anoTermino: "",
    },
  ]);

  const [infoAdicional, setInfoAdicional] = useState({
    linkedin: "",
    github: "",
    instagram: "",
    portfolio: "",
  });

  const limparCampos = () => {
    setNome("");
    setTelefone("");
    setFoto("");
    setEndereco({
      cep: "",
      bairro: "",
      cidade: "",
      estado: "",
      numero: "",
      logradouro: "",
    });
    setFormacoes([
      {
        instituicao: "",
        curso: "",
        anoInicio: "",
        anoTermino: "",
        idGraduacao: 1,
      },
    ]);
  };

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
    let name = e.target.name;

    if (name === "numero") {
      value = formatarInput(value, "numero");
    }

    if (name == "cep") {
      // Formata o CEP com a mascara
      value = formatarInput(value, "cep");

      // Busca o cep formatado mas antes remove traço -
      buscarCep(value.replace(/\D/g, ""));
    }

    setEndereco((prevEndereco) => ({
      ...prevEndereco,
      [name]: value,
    }));
  };

  const updateInfo = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    setInfoAdicional((prevInfoAdicional) => ({
      ...prevInfoAdicional,
      [name]: value,
    }));
  };

  const buscarCep = async (cep) => {
    if (cep.length == 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();

        if (data.erro) {
          console.log("Erro ao buscar o CEP! Digite um CEP válido!");
          return;
        }

        setEndereco((prevEndereco) => ({
          ...prevEndereco,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf,
          logradouro: data.logradouro,
        }));
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
      }
    }
  };

  const atualizarFormacao = (index, event) => {
    let value = event.target.value;
    let name = event.target.name;

    if (name === "anoInicio" || name === "anoTermino") {
      value = formatarInput(value, "numero");
    }

    const values = [...formacoes];
    values[index][name] = value;
    setFormacoes(values);
  };

  const atualizarExperiencia = (index, event) => {
    let value = event.target.value;
    let name = event.target.name;

    if (name === "anoInicio" || name === "anoTermino") {
      value = formatarInput(value, "numero");
    }

    const values = [...experiencias];
    values[index][name] = value;
    setExperiencias(values);
  };

  const adicionarFormacao = () => {
    setFormacoes([
      ...formacoes,
      {
        instituicao: "",
        curso: "",
        anoInicio: "",
        anoTermino: "",
        idGraduacao: 1,
      },
    ]);
  };

  const adicionarExperiencia = () => {
    setExperiencias([
      ...experiencias,
      {
        funcao: "",
        empresa: "",
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

  const removerExperiencia = (index) => {
    const values = [...experiencias];
    values.splice(index, 1);
    setExperiencias(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let anoInconsistente = "";
    let anoInconsistenteExp = "";

    formacoes.map((formacao) => {
      if (formacao.anoInicio > formacao.anoTermino) {
        anoInconsistente = `Ano Inicio da formação ${formacao.curso} não pode ser maior que o do término`;

        return;
      }
    });

    if (anoInconsistente != "") {
      return alert(anoInconsistente);
    }

    experiencias.map((experiencia) => {
      if (experiencia.anoInicio > experiencia.anoTermino) {
        anoInconsistenteExp = `Ano Inicio da experiência da ${experiencia.empresa} não pode ser maior que o do término`;

        return;
      }
    });

    if (anoInconsistenteExp != "") {
      return alert(anoInconsistenteExp);
    }

    const curriculo = {
      nome: nome,
      telefone: telefone.replace(/\D/g, ""),
      foto: foto,
      endereco: {
        ...endereco,
        cep: endereco.cep.replace("-", ""), // Remove o traço do cep
      },
      formacoes: formacoes,
      experiencias: experiencias,
      infoAdicional: infoAdicional,
    };

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
        alert("Curriculo cadastrado com sucesso!");
        limparCampos();
        console.log(curriculo);
      })
      .catch((error) => {
        console.log(error.message);
      });
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
                  value={nome}
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
                  value={foto}
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
                  maxLength={4}
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

        <section id="experiencia">
          <h4>Experiência</h4>
          {experiencias.map((experiencia, index) => (
            <Experiencia
              key={index}
              index={index}
              experiencia={experiencia}
              onChange={(e) => atualizarExperiencia(index, e)}
              onRemove={removerExperiencia}
            />
          ))}

          <Button
            variant="primary"
            className="mt-3"
            onClick={adicionarExperiencia}
          >
            + Adicionar Experiência
          </Button>
        </section>

        <section id="info-adicional">
          <h4>Informação adicional</h4>
          <Row className="g-3 align-items-center">
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Linkedin <FaLinkedin />
                </Form.Label>
                <Form.Control
                  id="linkedin"
                  name="linkedin"
                  type="text"
                  placeholder="https://linkedin.com"
                  onChange={(e) => {
                    updateInfo(e);
                  }}
                  value={infoAdicional.linkedin}
                  maxLength={512}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  GitHub <FaGithub />
                </Form.Label>
                <Form.Control
                  id="github"
                  name="github"
                  type="text"
                  placeholder="https://github.com"
                  onChange={(e) => {
                    updateInfo(e);
                  }}
                  value={infoAdicional.github}
                  maxLength={512}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Instagram <FaInstagram />
                </Form.Label>
                <Form.Control
                  id="instagram"
                  name="instagram"
                  type="text"
                  placeholder="https://instagram.com"
                  onChange={(e) => {
                    updateInfo(e);
                  }}
                  value={infoAdicional.instagram}
                  maxLength={512}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>
                  Portfólio <FaGlobe />
                </Form.Label>
                <Form.Control
                  id="portfolio"
                  name="portfolio"
                  type="text"
                  placeholder="https://portfolio.com"
                  onChange={(e) => {
                    updateInfo(e);
                  }}
                  value={infoAdicional.portfolio}
                  maxLength={512}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </section>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </div>
  );
};

export default CadastrarCurriculo;
