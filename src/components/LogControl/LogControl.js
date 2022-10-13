import { useContext } from "react";
import LoginContext from "../../store/login-context";
import Login from "../Login/Login";
import Logout from "../Logout/Logout";

const LogControl = (props) => {
  const login = useContext(LoginContext);
  if (login.loggedIn) {
    return <Logout onClose={props.onClose} />;
  } else {
    return <Login onClose={props.onClose} />;
  }
};

export default LogControl;
