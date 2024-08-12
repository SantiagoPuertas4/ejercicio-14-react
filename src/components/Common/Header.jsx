import { Link, NavLink } from "react-router-dom";
import { useSession } from "../../stores/useSession";
import Swal from "sweetalert2";

const Header = () => {
  const { user, isLoggedIn, logout } = useSession();

  const handleLogout = async () => {
    const action = await Swal.fire({
      title: "Atencion",
      icon: "info",
      text: "¿Esta seguro que desea cerrar sesion?",
      confirmButtonText: "Si, salir",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
    });

    if (action.isConfirmed) {
      logout();
    }
  };
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Mi cocinita
        </Link>
        <button
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler"
          data-bs-target="#navbarNav"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "nav-link active" : "nav-link";
                }}
                to="/"
              >
                Inicio
              </NavLink>
            </li>
            {!isLoggedIn && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  to="/login"
                >
                  Iniciar Sesion
                </NavLink>
              </li>
            )}
            {isLoggedIn && user.isAdmin && (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? "nav-link active" : "nav-link";
                  }}
                  to="/admin"
                >
                  Admin
                </NavLink>
              </li>
            )}
            {isLoggedIn && (
              <button onClick={handleLogout} className="btn btn-danger">
                Cerrar Sesion
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
