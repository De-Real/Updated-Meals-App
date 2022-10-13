import React from "react";

const LoginContext = React.createContext({
  name: "",
  email: "",
  phone: "",
  adress: "",
  logIn: () => {},
  logOut: () => {},
  loggedIn: false,
});

export default LoginContext;
