const Input2 = (props) => {
  const { name, type = "text", label, error } = props;
  return (
    <fieldset className="mb-2">
      <label className="form-label" htmlFor={`input-${name}`}>
        Email
      </label>
      <input
        required
        className={`form-control ${errors.`${name}` ? "is-invalid" : ""}`}
        id="input-email"
        maxLength={50}
        minLength={3}
        placeholder="jperez@gmail.com"
        type="email"
        {...register(`${name}`, {
          required: "El campo campo es requerido",
          maxLength: {
            value: 50,
            message: "El campo no puede tener mas de 50 caracteres",
          },
          minLength: {
            value: 3,
            message: "El campo debe tener mas de 3 caracteres",
          },
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Ingrese un email valido",
          },
        })}
      />
      <div className="invalid-feedback">
        <span className="badge text-bg-danger">{errors.`${name}`?.message}</span>
      </div>
    </fieldset>
  );
};
export default Input2;

Input2.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};
