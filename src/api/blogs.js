const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postBlogFn = async (data) => {
  const res = await fetch(`${BACKEND_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Ocurrio un error guardando la entrada");
  }
};
