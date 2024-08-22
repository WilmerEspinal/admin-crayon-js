import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar errores anteriores
    setEmailError(null);
    setPasswordError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      if (response.data.error) {
        setError(response.data.error);
      } else {
        const { token, requirePasswordChange, role } = response.data;
        localStorage.setItem("token", token);

        if (requirePasswordChange) {
          navigate("/change-password");
        } else {
          switch (role) {
            case 1:
              navigate("/aula-docente");
              break;
            case 2:
              navigate("/aula-virtual");
              break;
            case 3:
              navigate("/admin-crayon");
              break;
            default:
              setError("Rol no reconocido");
              break;
          }
        }
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 400) {
          if (data.error === "La contraseña es incorrecta") {
            setPasswordError(data.error);
          } else {
            setError(data.error);
          }
        } else {
          setError("Error inesperado. Inténtalo de nuevo más tarde.");
        }
      } else {
        setError("Error de conexión. Verifica tu red.");
      }
    }
  };

  return (
    <section className="container_login">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="label_input">
            Email
            <InputText
              type="email"
              placeholder="Ingrese su email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
            />
            {emailError && <p className="text_error">{emailError}</p>}
          </label>
        </div>
        <div>
          <label className="label_input">
            Contraseña
            <Password
              toggleMask
              placeholder="Ingrese su contraseña"
              feedback={false}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
            />
            {passwordError && <p className="text_error">{passwordError}</p>}
          </label>
        </div>
        <Button type="submit">Ingresar</Button>
      </form>
    </section>
  );
};

export default Login;
