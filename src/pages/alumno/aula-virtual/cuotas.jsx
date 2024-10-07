import React, { useEffect, useState } from "react";

import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProductService } from "./service.jsx";

const CuotasLista = () => {
  const [cuotas, setCuotas] = useState([]);
  const [matricula, setMatricula] = useState([]);

  useEffect(() => {
    document.title = "Cuotas alumno - Crayons";
  }, []);

  useEffect(() => {
    ProductService.getProductsMini().then((data) => {
      // Usar un Set para filtrar matrículas duplicadas
      const matriculaSet = new Set();

      // Procesar matrícula
      const transformedMatricula = data
        .map((item) => {
          const dni = item.dni_alumno;
          if (!matriculaSet.has(dni)) {
            matriculaSet.add(dni);
            return {
              dni: dni,
              annio: new Date().getFullYear(),
              estado: item.matricula_estado === 1 ? "Pagado" : "Pendiente",
              costo_matricula: item.costo_matricula,
            };
          }
          return null;
        })
        .filter((item) => item !== null);

      const transformedCuotas = data.map((item) => ({
        dni: item.dni_alumno,
        cuota: item.cuota,
        estado: item.estado === 1 ? "Pagado" : "Pendiente",
        annio: new Date().getFullYear(),
        cuota_nombre: item.cuota_nombre,
      }));

      setCuotas(transformedCuotas);
      setMatricula(transformedMatricula);
    });
  }, []);

  const pagarTemplate = (rowData) => {
    return <Button>Pagar</Button>;
  };

  return (
    <section>
      <div className="container_table_cuotas">
        <h2>Detalles del pago de matrícula</h2>
        <DataTable value={matricula} tableStyle={{ minWidth: "50rem" }}>
          <Column field="dni" header="DNI"></Column>
          <Column field="costo_matricula" header="Costo Matrícula"></Column>
          <Column field="estado" header="Estado"></Column>
          <Column field="annio" header="Año"></Column>
          <Column body={pagarTemplate} header="Pagar"></Column>
        </DataTable>
      </div>
      <div className="container_table_cuotas">
        <h2>Detalles del pago de cuotas</h2>
        <DataTable value={cuotas} tableStyle={{ minWidth: "50rem" }}>
          <Column field="dni" header="DNI"></Column>
          <Column field="cuota_nombre" header="Número de Cuota"></Column>
          <Column field="cuota" header="Monto Cuota"></Column>
          <Column field="estado" header="Estado"></Column>
          <Column field="annio" header="Año"></Column>
          <Column body={pagarTemplate} header="Pagar"></Column>
        </DataTable>
      </div>
    </section>
  );
};

export default CuotasLista;
