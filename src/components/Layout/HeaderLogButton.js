import classes from "./HeaderLogButton.module.css";
import loginIcon from "../../assets/login-icon.png";
import logoutIcon from "../../assets/logout-icon.png";
import LoginContext from "../../store/login-context";
import { useContext } from "react";

const HeaderLogButton = (props) => {
  const login = useContext(LoginContext);

  return (
    <button onClick={props.onClick} className={classes.button}>
      <span className={classes.icon}>
        <img src={!login.loggedIn ? loginIcon : logoutIcon}></img>
      </span>
      <span> {login.loggedIn ? login.name : "Login"} </span>
    </button>
  );
};

export default HeaderLogButton;
