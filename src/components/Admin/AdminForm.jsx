import { useForm } from "react-hook-form";
import Input from "../ui/Input/Input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { postBlogFn, putBlogFn } from "../../api/blogs";
import { useBlog } from "../../stores/useBlog";

const AdminForm = () => {
  const { blogToEdit, clearBlogToEdit } = useBlog();

  const {
    register,
    reset,
    handleSubmit: onSubmitRHF,
    formState: { errors },
    setValue,
  } = useForm();

  if (blogToEdit) {
    setValue("title", blogToEdit.title);
    setValue("imageUrl", blogToEdit.imageUrl);
    setValue("content", blogToEdit.content);
  }

  const queryClient = useQueryClient();

  const { mutate: postBlog } = useMutation({
    mutationFn: postBlogFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Entrada guardada");

      reset();

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

  const { mutate: putBlog } = useMutation({
    mutationFn: putBlogFn,
    onSuccess: () => {
      toast.dismiss();
      toast.success("Entrada actualizada");

      clearBlogToEdit();
      reset();

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

  const handleCancelEdit = () => {
    clearBlogToEdit();
    reset();
  };

  const handleSubmit = (data) => {
    toast.loading("Guardando... Aguarde");

    if (blogToEdit) {
      putBlog({ blogId: blogToEdit.id, data });
    } else postBlog(data);
  };

  return (
    <form
      className="card p-3 bg-dark-subtle"
      onSubmit={onSubmitRHF(handleSubmit)}
    >
      <h1 className="text-light">Crear nueva entrada</h1>
      <hr />
      {blogToEdit && (
        <div className="alert alert-warning">
          Atencion: estas modificando la entrada con titulo{" "}
          <b>{blogToEdit.title}</b>
        </div>
      )}

      <Input
        className="mb-2"
        errors={errors.title}
        label="Titulo"
        name="title"
        options={{
          required: "Este campo es requerido",
          minLength: {
            value: 5,
            message: "El titulo debe tener al menos 5 caracteres",
          },
          maxLength: {
            value: 100,
            message: "El titulo debe tener como mucho 100 caracteres",
          },
        }}
        placeholder="Pure de manzana"
        register={register}
      />
      <Input
        className="mb-2"
        errors={errors.imageUrl}
        label="Imagen"
        name="imageUrl"
        options={{
          required: "Este campo es requerido",
          minLength: {
            value: 5,
            message: "El enlace a la imagen debe tener al menos 5 caracteres",
          },
          pattern: {
            value:
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
            message: "El enlace ingresado no es valido",
          },
        }}
        placeholder="https://google.com"
        register={register}
      />
      <Input
        textarea
        className="mb-2"
        errors={errors.content}
        label="Contenido"
        name="content"
        options={{
          required: "Este campo es requerido",
          minLength: {
            value: 5,
            message: "El contenido debe tener al menos 5 caracteres",
          },
        }}
        placeholder="Escribi aca el contenido de la entrada del blog"
        register={register}
      />
      <div className="text-end">
        {blogToEdit && (
          <button className="btn" type="button" onClick={handleCancelEdit}>
            Cancelar edicion
          </button>
        )}

        <button className="btn btn-light" type="submit">
          Guardar
        </button>
      </div>
    </form>
  );
};
export default AdminForm;
