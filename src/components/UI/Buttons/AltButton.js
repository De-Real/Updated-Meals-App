import classes from "./AltButtons.module.css";

const AltButton = ({ children, onClick }) => {
  return (
    <button className={classes["button--alt"]} onClick={onClick}>
      {children}
    </button>
  );
};

export default AltButton;
