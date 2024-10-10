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
      const matriculaSet = new Set();

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
        cuota_nombre: item.cuota_nombre,
        estado: item.estado === 1 ? "Pagado" : "Pendiente",
        annio: new Date().getFullYear(),
        numero_cuota: item.cuota_nombre.split(" ")[1],
      }));

      setCuotas(transformedCuotas);
      setMatricula(transformedMatricula);
    });
  }, []);

  const handlePayment = async (cuotaNumero) => {
    console.log("Número de cuota:", cuotaNumero);
    if (cuotaNumero === undefined) {
      console.error("El número de cuota es undefined");
      alert("Error: número de cuota no válido");
      return;
    }

    try {
      const response = await fetch(
        `https://e2dd-190-239-66-92.ngrok-free.app/api/pagar/${cuotaNumero}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud de pago");
      }

      const data = await response.json();
      window.open(data.init_point, "_blank");
    } catch (error) {
      console.error("Error al procesar el pago:", error);
      alert("Hubo un problema al procesar el pago. Intenta nuevamente.");
    }
  };

  const handleMatriculaPayment = async (dni) => {
    console.log("DNI alumno para matrícula:", dni);
    try {
      const response = await fetch(
        `https://e2dd-190-239-66-92.ngrok-free.app/api/pagar-matricula`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error en la solicitud de pago de matrícula");
      }

      const data = await response.json();
      window.open(data.init_point, "_blank");
    } catch (error) {
      console.error("Error al procesar el pago de matrícula:", error);
      alert(
        "Hubo un problema al procesar el pago de matrícula. Intenta nuevamente."
      );
    }
  };

  const pagarTemplate = (rowData) => {
    return (
      <Button onClick={() => handlePayment(rowData.numero_cuota)}>Pagar</Button>
    );
  };

  const pagarMatriculaTemplate = (rowData) => {
    return (
      <Button onClick={() => handleMatriculaPayment(rowData.dni)}>
        Pagar Matrícula
      </Button>
    );
  };

  const estadoCuotaBodyTemplate = (rowData) => {
    return (
      <span style={{ color: rowData.estado === "Pagado" ? "green" : "red" }}>
        {rowData.estado}
      </span>
    );
  };

  const estadoMatriculaBodyTemplate = (rowData) => {
    return (
      <span style={{ color: rowData.estado === "Pagado" ? "green" : "red" }}>
        {rowData.estado}
      </span>
    );
  };

  return (
    <section>
      <div className="container_table_cuotas">
        <h2>Detalles del pago de matrícula</h2>
        <DataTable value={matricula} tableStyle={{ minWidth: "50rem" }}>
          <Column field="dni" header="DNI"></Column>
          <Column field="costo_matricula" header="Costo Matrícula"></Column>
          <Column body={estadoMatriculaBodyTemplate} header="Estado"></Column>
          <Column field="annio" header="Año"></Column>
          <Column
            body={pagarMatriculaTemplate}
            header="Pagar Matrícula"
          ></Column>
        </DataTable>
      </div>
      <div className="container_table_cuotas">
        <h2>Detalles del pago de cuotas</h2>
        <DataTable value={cuotas} tableStyle={{ minWidth: "50rem" }}>
          <Column field="dni" header="DNI"></Column>
          <Column field="cuota_nombre" header="Número de Cuota"></Column>
          <Column field="cuota" header="Monto Cuota"></Column>
          <Column body={estadoCuotaBodyTemplate} header="Estado"></Column>
          <Column field="annio" header="Año"></Column>
          <Column body={pagarTemplate} header="Pagar"></Column>
        </DataTable>
      </div>
    </section>
  );
};

export default CuotasLista;
