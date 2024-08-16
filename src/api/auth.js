import { decodeJWT } from "../utilities/decodeJWT";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postLoginFn = async (data) => {
  //data: { username, password }
  //1. Traer los usuarios de la base de datos
  const res = await fetch(`${BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message);
  }

  const token = resData.data;

  if (!token) {
    throw new Error(resData.message || "Ocurrio un error");
  }

  const userData = decodeJWT(token).user;

  sessionStorage.setItem("token", token);

  return userData;
};

export const postRegisterFn = async (data) => {
  const res = await fetch(`${BACKEND_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      password: data.password,
      isAdmin: false,
    }),
  });

  if (!res.ok) {
    throw new Error("Ocurrio un error al guardar el usuario");
  }

  return {
    firstname: data.firstname,
    lastname: data.lastname,
    username: data.username,
    isAdmin: false,
  };
};
