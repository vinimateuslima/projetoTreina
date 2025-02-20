// CSS
import "./EditarCurriculo.css";

import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";

import { useCurriculo } from "../../Context/CurriculoContext";
import FormEdit from "../../components/FormEdit/FormEdit";

const EditarCurriculo = () => {
  const { setCurriculoFoto, setCurriculoId } = useCurriculo();

  const [curriculo, setCurriculo] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = "http://localhost:8080";

  const { id } = useParams();

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
        setCurriculoFoto(curriculo.foto);
        setCurriculoId(curriculo.idCurriculo);
        console.log(curriculo);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

    if (loading) return <Loading color={"primary"} />;

  return (
    <div id="editar-curriculo">
        <h2>Editar currículo</h2>
      <FormEdit curriculo={curriculo}/>
    </div>
  );
};

export default EditarCurriculo;
