import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../../stores/useSession";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Input from "../ui/Input/Input";
import { useState } from "react";
import { postRegisterFn } from "../../api/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useSession();
  const [seePassword, setSeePassword] = useState(false);

  const {
    register,
    reset,
    handleSubmit: onSubmitRHF,
    formState: { errors },
  } = useForm();

  const { mutate: postRegister } = useMutation({
    mutationFn: postRegisterFn,
    onSuccess: (userData) => {
      toast.dismiss();
      toast.success(`Registrado. Bienvenido, ${userData.firstname}`);

      reset();

      // Hacer el login en el cliente
      login(userData);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    },
    onError: (e) => {
      toast.dismiss();
      toast.warning(e.message);
    },
  });

  const handleSubmit = (data) => {
    console.log(data);
    toast.loading();
    postRegister(data);
    reset();
  };

  const handleSeePassword = () => {
    setSeePassword(!seePassword);
  };

  return (
    <form className="row g-2" onSubmit={onSubmitRHF(handleSubmit)}>
      <div className="mb-2 col-12 col-md-4">
        <Input
          errors={errors.firstname}
          label="Nombre"
          name="firstname"
          options={{
            required: "El campo es requerido",
            maxLength: {
              value: 30,
              message: "El campo no puede tener mas de 30 caracteres",
            },
            minLength: {
              value: 3,
              message: "El campo no puede tener menos de 3 caracteres",
            },
          }}
          register={register}
        />
      </div>
      <div className="mb-2 col-12 col-md-4">
        <Input
          className="mb-2"
          errors={errors.lastname}
          label="Apellido"
          name="lastname"
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
      </div>
      <div className="mb-2 col-12 col-md-4">
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
      </div>
      <div className="mb-2 col-12 col-md-6 d-flex">
        <div className="w-100">
          <Input
            errors={errors.password}
            label="Contraseña"
            name="password"
            options={{
              required: "El campo es requerido",
              maxLength: {
                value: 15,
                message: "El campo no puede tener mas de 15 caracteres",
              },
              minLength: {
                value: 8,
                message: "El campo no puede tener menos de 8 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                message:
                  "La contraseña debe tener una minúscula, una mayúscula, un dígito, un caracter especial, entre 8 y 15 caracteres",
              },
            }}
            register={register}
            type={seePassword ? `text` : `password`}
          />
        </div>
        <div className="w-auto">
          <button
            className="btn btn-secondary p-0 m-0"
            onClick={handleSeePassword}
          >
            <img
              alt=""
              className="w-100 h-100 prueba p-3"
              src="https://svgsilh.com/svg_v2/1915455.svg"
            />
          </button>
        </div>
      </div>
      <div className="mb-2 col-12 col-md-6 d-flex">
        <div className="w-100">
          <Input
            errors={errors.repeatPassword}
            label="Repetir contraseña"
            name="repeatPassword"
            options={{
              required: "El campo es requerido",
              maxLength: {
                value: 15,
                message: "El campo no puede tener mas de 15 caracteres",
              },
              minLength: {
                value: 8,
                message: "El campo no puede tener menos de 8 caracteres",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/,
                message:
                  "La contraseña debe tener una minúscula, una mayúscula, un dígito, un caracter especial, entre 8 y 15 caracteres",
              },
            }}
            register={register}
            type="password"
          />
        </div>
      </div>

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
export default RegisterForm;
