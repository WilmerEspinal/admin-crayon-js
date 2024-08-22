import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
const LoginRegister = () => {
  return (
    <form className="form_register">
      <div>
        <label className="label_input">
          Nombre
          <InputText type="text" placeholder="" required />
        </label>
      </div>
      <div>
        <label className="label_input">
          Email
          <InputText type="email" placeholder="" required />
        </label>
      </div>
      <div>
        <label className="label_input">
          Contraseña
          <Password toggleMask placeholder="" feedback={false} />
        </label>
      </div>
      <div>
        <label className="label_input">
          Repita la contraseña
          <Password toggleMask placeholder="" feedback={false} />
        </label>
      </div>
    </form>
  );
};

export default LoginRegister;
