import { useReducer } from "react";
import LoginContext from "./login-context";

let defaultValue = {
  name: "",
  email: "",
  phone: "",
  adress: "",
  loggedIn: false,
};

let savedUser = localStorage.getItem("user");

if (savedUser) {
  console.log("SU", savedUser);
  console.log("Item got!");
  defaultValue = {
    ...JSON.parse(savedUser),
  };
}

const reducerFn = (state, action) => {
  if (action.type === "LOGIN") {
    const { remember, ...value } = action.value;

    const loginValue = { ...value, loggedIn: true };

    if (remember) {
      localStorage.setItem("user", JSON.stringify(loginValue));
    }

    return loginValue;
  }
  if (action.type === "LOGOUT") {
    localStorage.removeItem("user");
    return { name: "", email: "", phone: "", adress: "", loggedIn: false };
  }
  console.log("error, LoginContext");
};

const LoginProvider = (props) => {
  const [state, dispatch] = useReducer(reducerFn, defaultValue);

  const logIn = (values) => {
    console.log("values", values);
    dispatch({ type: "LOGIN", value: values });
  };

  const logOut = () => {
    dispatch({ type: "LOGOUT" });
  };

  const contextValue = {
    ...state,
    logIn,
    logOut,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
