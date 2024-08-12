import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteBlogFn } from "../../api/blogs";

const AdminTableRow = (props) => {
  const { blog, index } = props;

  const queryClient = useQueryClient();

  const { mutate: deleteBlog } = useMutation({
    mutationFn: deleteBlogFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Entrada eliminada");

      //Avisarle a la tabla que se debe actualizar
      queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
    onError: (e) => {
      toast.dismiss();
      toast.error(e.message);
    },
  });

  const handleEdit = () => {
    console.log("Editar", blog.id);
  };

  const handleDelete = async () => {
    const action = await Swal.fire({
      title: "Atencion",
      icon: "info",
      html: `¿Estas seguro que deseas eliminar el blog <b>${blog.title}</b>?`,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar",
      showCancelButton: true,
    });

    if (action.isConfirmed) {
      toast.loading("Eliminando entrada ...");
      deleteBlog(blog.id);
    }
  };

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <img
          alt={blog.title}
          className="admin-table-image"
          src={blog.imageUrl}
        />
      </td>
      <td>{blog.title}</td>
      <td>
        <button className="btn btn-warning ms-2" onClick={handleEdit}>
          Editar
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};
export default AdminTableRow;
AdminTableRow.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
};
