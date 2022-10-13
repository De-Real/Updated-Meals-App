import { useContext } from "react";
import LoginContext from "../../store/login-context";
import Modal from "../UI/Modal";
import classes from "./Logout.module.css";

const Logout = (props) => {
  const login = useContext(LoginContext);

  const onLogout = () => {
    login.logOut();
    props.onClose();
  };

  return (
    <Modal onClose={props.onClose}>
      <h2 className={classes.title}> Logout </h2>
      <div className={classes.description}>
        If your really want log out, please press
        <span onClick={onLogout}> Logout</span> button otherwise click
        <span onClick={props.onClose}> Close</span>.
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={onLogout}>
          Logout
        </button>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default Logout;
