import { useContext, useEffect, useState } from "react";
import useInput from "../../hooks/use-input";
import LoginContext from "../../store/login-context";
import LoginInput from "../UI/LoginInput";
import Modal from "../UI/Modal";

import classes from "./Login.module.css";

const validateName = (value) => {
  if (!value.trim()) return { isValid: false, text: "Input value is empty" };
  if (value.trim().length > 30)
    return { isValid: false, text: "Input value is too long! Max char-s: 30" };
  return { isValid: true };
};

const validatePhoneNumber = (value) => {
  let formatValue = value.replace(/\s/g, ""); //380638883791 or 0638883791 or +380638883791
  formatValue = formatValue.split("-").join("");
  formatValue = formatValue.replace("+", "");
  if (formatValue.slice(0, 3).includes("38")) {
    formatValue = formatValue.replace("38", "");
  }
  formatValue = formatValue.replace("(", "");
  formatValue = formatValue.replace(")", "");

  console.log(formatValue);

  const invalidObj = {
    isValid: false,
    text: "Phone number has to be like 38(063) 888 37 91 or similar to this.",
  };

  if (!isNaN(+formatValue) && formatValue.length === 10) {
    return { isValid: true };
  }

  return invalidObj;
};

const validateEmail = (email) => {
  if (
    String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return { isValid: true };
  }

  return {
    isValid: false,
    text: "Incorrect email! Example: example@gmail.com",
  };
};

const validateAdress = (value) => {
  if (value.length < 6 || value.length > 60) {
    return {
      isValid: false,
      text: "Adress length should have 6-60 characters",
    };
  }
  return {
    isValid: true,
  };
};

const Login = (props) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const {
    value: nameValue,
    valueError: nameError,
    isInputValid: isNameValid,
    onValueBlurHandler: onNameBlurHandler,
    onValueChangeHandler: onNameChangeHandler,
    onValueReset: onNameReset,
  } = useInput(validateName);

  const {
    value: phoneValue,
    valueError: phoneError,
    isInputValid: isPhoneValid,
    onValueBlurHandler: onPhoneBlurHandler,
    onValueChangeHandler: onPhoneChangeHandler,
    onValueReset: onPhoneReset,
  } = useInput(validatePhoneNumber);

  const {
    value: emailValue,
    valueError: emailError,
    isInputValid: isEmailValid,
    onValueBlurHandler: onEmailBlurHandler,
    onValueChangeHandler: onEmailChangeHandler,
    onValueReset: onEmailReset,
  } = useInput(validateEmail);

  const {
    value: adressValue,
    valueError: adressError,
    isInputValid: isAdressValid,
    onValueBlurHandler: onAdressBlurHandler,
    onValueChangeHandler: onAdressChangeHandler,
    onValueReset: onAdressReset,
  } = useInput(validateAdress);

  const login = useContext(LoginContext);

  useEffect(() => {
    if (!nameError && !phoneError && !emailError && !adressError) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [nameError, phoneError, emailError, adressError]);

  const onSubmitHandler = () => {
    if (isFormValid) {
      onNameReset();
      onPhoneReset();
      onEmailReset();
      onAdressReset();
      console.log("submitted", isChecked);
      login.logIn({
        name: nameValue,
        email: emailValue,
        phone: phoneValue,
        adress: adressValue,
        remember: isChecked,
      });
      props.onClose();
    }
  };

  return (
    <Modal onClose={props.onClose}>
      <h2 className={classes.title}>Login</h2>

      <form className={classes.form}>
        <LoginInput
          value={nameValue}
          error={isNameValid}
          errorText={nameError}
          onBlur={onNameBlurHandler}
          onChange={onNameChangeHandler}
          label="Your name"
        />
        <LoginInput
          type="tel"
          value={phoneValue}
          error={isPhoneValid}
          errorText={phoneError}
          onBlur={onPhoneBlurHandler}
          onChange={onPhoneChangeHandler}
          label="Your phone number"
        />

        <LoginInput
          type="email"
          value={emailValue}
          error={isEmailValid}
          errorText={emailError}
          onBlur={onEmailBlurHandler}
          onChange={onEmailChangeHandler}
          label="Your email"
        />

        <LoginInput
          value={adressValue}
          error={isAdressValid}
          errorText={adressError}
          onBlur={onAdressBlurHandler}
          onChange={onAdressChangeHandler}
          label="Your adress"
        />
        <div className={classes.remember}>
          <label> Remember me</label>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
          />
        </div>
      </form>

      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button
          disabled={!isFormValid}
          onClick={onSubmitHandler}
          className={classes.button}
        >
          Login
        </button>
      </div>
    </Modal>
  );
};

export default Login;
