import { createContext, useEffect, useState } from "react";

export const VistosContext = createContext();

export function VistosProvider({ children }) {
  const [vistos, setVistos] = useState(() => {
    const savedVistos = localStorage.getItem("vistos");
    return savedVistos ? JSON.parse(savedVistos) : [];
  });

  const agregarVisto = (producto) => {
    const yaVisto = vistos.some((visto) => visto.id === producto.id);
    if (!yaVisto) {
      const nuevosVistos = [...vistos, producto];
      setVistos(nuevosVistos);
      localStorage.setItem("vistos", JSON.stringify(nuevosVistos));
    }
  };

  const limpiarVistos = () => {
    setVistos([]);
    localStorage.removeItem("vistos");
  };

  useEffect(() => {
    const savedVistos = localStorage.getItem("vistos");
    if (savedVistos) {
      setVistos(JSON.parse(savedVistos));
    }
  }, []);

  return (
    <VistosContext.Provider value={{ vistos, agregarVisto, limpiarVistos, setVistos }}>
      {children}
    </VistosContext.Provider>
  );
}

export default VistosContext;
