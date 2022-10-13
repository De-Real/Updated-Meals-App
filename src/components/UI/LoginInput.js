import classes from "./LoginInput.module.css";

const LoginInput = ({
  value = "",
  error,
  errorText,
  onBlur,
  onChange,
  label = "",
  type = "text",
}) => {
  return (
    <div className={`${classes.input} ${error && classes.invalid}`}>
      <label>{label}</label>
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        type={type}
      ></input>
      {error && <p> {errorText} </p>}
    </div>
  );
};

export default LoginInput;
