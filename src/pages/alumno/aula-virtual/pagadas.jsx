import React, { useState } from "react";

import CuotasLista from "./CuotasLista";
import HistorialCuotas from "./HistorialCuotas";

const CuotasPage = () => {
  const [historialCuotas, setHistorialCuotas] = useState([]);

  // Callback para actualizar el historial cuando se paga una cuota
  const handlePagar = (cuotasPagadas) => {
    setHistorialCuotas(cuotasPagadas);
  };

  return (
    <>
      <section>
        <CuotasLista onPagar={handlePagar} />
        <HistorialCuotas historialCuotas={historialCuotas} />
      </section>
    </>
  );
};

export default CuotasPage;
