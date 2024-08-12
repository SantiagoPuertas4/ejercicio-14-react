import { createBrowserRouter } from "react-router-dom";
import RootView from "../views/routing/RootView";
import PrivateView from "../views/routing/PrivateView";
import LoginView from "../views/LoginView";
import HomeView from "../views/HomeView";
import AuthView from "../views/routing/AuthView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootView />,
    children: [
      {
        path: "",
        element: <HomeView />,
      },
      {
        path: "detail/:id",
        element: <p>Detalle</p>,
      },
      // Rutas de autenticacion, no deberian poder accederse estando logueados
      {
        path: "",
        element: <AuthView />,
        children: [
          {
            path: "login",
            element: <LoginView />,
          },
          {
            path: "register",
            element: <p>Register</p>,
          },
        ],
      },
      //Rutas Privadas
      {
        path: "",
        element: <PrivateView />,
        children: [
          {
            path: "admin",
            element: <p>Admin</p>,
          },
        ],
      },
    ],
  },
]);
