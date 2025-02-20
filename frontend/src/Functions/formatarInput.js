export const formatarInput = (valor, tipo) => {
    let numero = valor.replace(/\D/g, "");

    if (tipo === "numero") {
      numero = numero.slice(0, 4)
    }
  
    // Formatar Telefone
    if (tipo === "telefone") {
      numero = numero.slice(0, 11);
       // Celular com 9 dígitos: (XX) XXXXX-XXXX
      if (numero.length > 10) {
        return numero.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
         // Telefone fixo com 8 dígitos: (XX) XXXX-XXXX
      } else if (numero.length > 6) {
        return numero.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
        // Apenas o DDD: (XX) XXXX
      } else if (numero.length > 2) {
        return numero.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
      }
    }
  
    // Formatar CEP
    if (tipo === "cep") {
      numero = numero.slice(0, 8);
      if (numero.length > 5) {
        return numero.replace(/^(\d{5})(\d{0,3})$/, "$1-$2");
      }
    }
  
    return numero;
  };
  