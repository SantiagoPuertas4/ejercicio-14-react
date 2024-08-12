import PropTypes from "prop-types";

const Input = (props) => {
  const {
    name,
    type = "text",
    label,
    errors,
    className = "",
    register,
    options,
    placeholder = "Ingrese un texto",
  } = props;

  return (
    <fieldset className={`form-floating ${className}`}>
      <input
        className={`form-control ${errors ? "is-invalid" : ""}`}
        id={`${name}-input`}
        placeholder={placeholder}
        type={type}
        {...register(name, options)}
      />
      <label htmlFor={`${name}-input`}>{label}</label>

      <div className="invalid-feedback">
        <span className="badge text-bg-danger">{errors?.message}</span>
      </div>
    </fieldset>
  );
};
export default Input;

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  errors: PropTypes.shape({
    message: PropTypes.string,
  }),
  className: PropTypes.string,
  register: PropTypes.func.isRequired,
  options: PropTypes.object,
  placeholder: PropTypes.string,
};
