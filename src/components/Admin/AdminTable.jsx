import { useQuery } from "@tanstack/react-query";

import { getBlogsFn } from "../../api/blogs";
import AdminTableRow from "./AdminTableRow";

import "./Admin.css";

const AdminTable = () => {
  const {
    data: blogs,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogsFn,
  });

  if (isLoading) {
    return <p className="mt-2">Cargando datos...</p>;
  }

  if (isError) {
    return (
      <div className="alert alert-danger mt-3">
        <p>Ocurrio un error cargando la tabla de blogs</p>
      </div>
    );
  }

  if (blogs && blogs.length === 0) {
    return (
      <div className="alert alert-info mt-3">
        <p>No se encontraron blogs para listar</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Imagen</th>
            <th>Titulo</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog, index) => {
            return <AdminTableRow blog={blog} index={index} key={blog.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
export default AdminTable;
