import { createContext, useContext, useState } from "react";

import PropTypes from "prop-types";

const CurriculoContext = createContext();

export const CurriculoProvider = ({ children }) => {
  const [curriculoFoto, setCurriculoFoto] = useState(null);
  const [curriculoId, setCurriculoId] = useState(null);

  return (
    <CurriculoContext.Provider value={{ curriculoFoto, setCurriculoFoto, curriculoId, setCurriculoId }}>
      {children}
    </CurriculoContext.Provider>
  );

  
};

CurriculoProvider.propTypes = {
    children: PropTypes.string,
};

// Hook para facilitar o acesso ao contexto
export const useCurriculo = () => useContext(CurriculoContext);
