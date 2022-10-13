import { useState } from "react";

const useInput = (validateFn) => {
  const [value, setValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  let { isValid, text } = validateFn(value);

  const isInputValid = !isValid && isTouched;

  const onValueChangeHandler = (event) => {
    setValue(event.target.value);
  };
  const onValueBlurHandler = () => {
    setIsTouched(true);
  };

  const onValueReset = () => {
    setValue("");
    setIsTouched(false);
  };


  return {
    value,
    isInputValid,
    valueError: !isValid ? text : false,
    onValueBlurHandler,
    onValueChangeHandler,
    onValueReset,
  };
};

export default useInput;
