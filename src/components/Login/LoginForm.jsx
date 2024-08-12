import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { postLoginFn } from "../../api/auth";
import { useSession } from "../../stores/useSession";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useSession();

  const {
    register,
    reset,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const { mutate: postLogin } = useMutation({
    mutationFn: postLoginFn,
    onSuccess: (userData) => {
      toast.dismiss();
      toast.success(`Bienvenido ${userData.firstname}`);

      // Hacer el login en el cliente
      login(userData);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    },
    onError: (e) => {
      toast.dismiss();
      toast.warning(e.message);
    },
  });

  const handleSubmit = (data) => {
    toast.loading();
    postLogin(data);
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
        type="password"
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
