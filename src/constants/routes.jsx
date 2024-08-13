import { createBrowserRouter } from "react-router-dom";
import RootView from "../views/routing/RootView";
import PrivateView from "../views/routing/PrivateView";
import LoginView from "../views/LoginView";
import HomeView from "../views/HomeView";
import AuthView from "../views/routing/AuthView";
import RegisterView from "../views/RegisterView";
import AdminView from "../views/AdminView";
import DetailView from "../views/DetailView";
import Error404View from "../views/Error404View";

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
        element: <DetailView />,
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
            element: <RegisterView />,
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
            element: <AdminView />,
          },
        ],
      },
      {
        path: "*",
        element: <Error404View />,
      },
    ],
  },
]);
