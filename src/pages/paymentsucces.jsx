import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import axios from "axios";

const PaymentSuccess = () => {
  const { id, cuotaEstado } = useParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const navigate = useNavigate();
  const toast = useRef(null);

  const handlePaymentCheck = async () => {
    try {
      const response = await axios.get(
        `https://f1ba-190-239-64-224.ngrok-free.app/api/payment-success/${id}/${cuotaEstado}?collection_id=89703469771&collection_status=approved&payment_id=89703469771&status=approved&external_reference=${id}&payment_type=account_money&merchant_order_id=23692011458&preference_id=1968363296-4776d89b-72f0-45df-b198-d42d893da39b&site_id=MPE&processing_mode=aggregator&merchant_account_id=null`
      );

      console.log(response.data); // Verifica la respuesta aquí

      // Comprueba si la respuesta contiene el mensaje esperado
      if (
        response.data &&
        response.data.message === "Pago realizado con éxito."
      ) {
        setPaymentStatus("success");

        toast.current.show({
          severity: "success",
          summary: "Éxito",
          detail: "Pago realizado con éxito. Redirigiendo...",
          life: 3000,
        });

        setTimeout(() => {
          navigate("/aula-virtual/historial-cuotas");
        }, 3000);
      } else {
        setPaymentStatus("error");

        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Hubo un problema con el pago.",
          life: 3000,
        });
      }
    } catch (error) {
      setPaymentStatus("error");

      console.error("Error en la verificación del pago:", error); // Muestra detalles del error

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Hubo un error en la verificación del pago: " + error.message,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    handlePaymentCheck();
  }, []);

  return (
    <div>
      <Toast ref={toast} />
      {paymentStatus === "success" ? (
        <h3>
          Pago realizado con éxito. Redirigiendo al historial de cuotas...
        </h3>
      ) : paymentStatus === "error" ? (
        <h3>Hubo un error al procesar el pago.</h3>
      ) : (
        <h3>Verificando el estado del pago...</h3>
      )}
    </div>
  );
};

export default PaymentSuccess;
