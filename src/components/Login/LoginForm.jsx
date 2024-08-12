import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    reset,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const handleSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={onSubmitRHF(handleSubmit)}>
      <Input
        className="mb-2"
        errors={errors.username}
        label="Nombre de usuario"
        name="username"
        options={{
          required: "El campo es requerido",
          maxLength: {
            value: 50,
            message: "El campo no puede tener mas de 50 caracteres",
          },
          minLength: {
            value: 3,
            message: "El campo no puede tener menos de 3 caracteres",
          },
        }}
        register={register}
      />
      <Input
        errors={errors.password}
        label="Contraseña"
        name="password"
        options={{
          required: "El campo es requerido",
          maxLength: {
            value: 50,
            message: "El campo no puede tener mas de 50 caracteres",
          },
          minLength: {
            value: 3,
            message: "El campo no puede tener menos de 3 caracteres",
          },
        }}
        register={register}
      />
      <div className="text-end mt-3">
        <button className="btn btn-success" type="submit">
          Ingresar
        </button>
      </div>
      <p className="text-center mt-2 text-md-start mt-md-0">
        ¿Primera vez? <Link to="/register">Create un usuario</Link>
      </p>
    </form>
  );
};
export default LoginForm;
