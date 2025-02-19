// CSS

import "./ExibirCurriculo.css";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

const ExibirCurriculo = () => {
  const { id } = useParams();

  const [curriculo, setCurriculo] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:8080";

  useEffect(() => {
    fetch(url + `/curriculos/${id}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(`Error: ${errorData.mensagem}`);
          });
        }

        return response.json();
      })
      .then((curriculo) => {
        setCurriculo(curriculo);
        console.log(curriculo);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  if (loading) return <Loading color={"primary"} />;

  const infoPessoal = {
    nome: curriculo.nome || "",
    telefone: curriculo.telefone || "",
  };

  const { formacoes, experiencias, endereco, infoAdicional } = curriculo;

  return (
    <div id="exibir-curriculo" className="container">
      <section id="info-pessoal">
        <h4>Informações pessoais:</h4>
        <div className="info-descricao">
          <p>
            Nome: <span>{infoPessoal.nome}</span>
          </p>
          <p>
            Telefone: <span>{curriculo.telefone}</span>
          </p>
          <p>
            Endereço:
            <span>
              {endereco.logradouro}, {endereco.numero},{endereco.bairro},{" "}
              {endereco.cep}, {endereco.cidade}, {endereco.estado}
            </span>
          </p>
        </div>
      </section>
      <hr />

      <section id="formacao">
        <h4>Formação:</h4>

        <div className="formacao-descricao">
          {formacoes.length > 0 &&
            formacoes.map((formacao) => (
              <div key={formacao.idFormacao}>
                <p>
                  Instituição: <span>{formacoes[0].instituicao}</span>
                </p>

                <p>
                  Curso: <span>Análise e Desenvolvimento de Sistemas</span>
                </p>
                <p>
                  Graduação: <span>Tecnólogo</span>
                </p>

                <div className="periodo">
                  <p>
                    Ano Inicio: <span>2021</span>
                  </p>
                  <p>
                    Ano Término: <span>2023</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <hr />

      <section id="experiencia">
        <h4>Experiência profissional:</h4>
        <div className="experiencia-descricao">
          {experiencias.length > 0 &&
            experiencias.map((experiencia) => (
              <div key={experiencia.idExperiencia}>
                <p>
                  Empresa: <span>{experiencia.empresa}</span>
                </p>
                <p>
                  Função: <span>{experiencia.funcao}</span>
                </p>
                <div className="periodo">
                  <p>
                    Ano Inicio: <span>{experiencia.anoInicio}</span>
                  </p>
                  <p>
                    Ano Término:{" "}
                    <span>
                      {experiencia.anoTermino == 0
                        ? "Atualmente"
                        : experiencia.anoTermino}
                    </span>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <hr />

      <section id="info-adicional">
        <h4>Informações adicionais</h4>
        <div className="info-adicional-descricao">
          <p>
            LinkedIn:{" "}
            <span>
              <a target="_blank" href={infoAdicional.linkedin}>
                {infoAdicional.linkedin}
              </a>
            </span>
          </p>
          <p>
            GitHub:{" "}
            <span>
              <a target="_blank" href={infoAdicional.github}>
                {infoAdicional.github}
              </a>
            </span>
          </p>
          <p>
            Instagram:{" "}
            <span>
              <a target="_blank" href={infoAdicional.instagram}>
                {infoAdicional.instagram}
              </a>
            </span>
          </p>
          <p>
            Portfólio:{" "}
            <span>
              <a target="_blank" href={infoAdicional.portfolio}>
                {infoAdicional.portfolio}
              </a>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default ExibirCurriculo;
