import React from "react";
import classes from "./RequestError.module.css";
import { AlertOctagon } from "react-feather";

const RequestError = () => {
  return (
    <div className={classes.error}>
      <h2>
        <AlertOctagon size={36} /> Ooops... Error!
      </h2>
      <p>
        Something went wrong! Please try again or contact our manager <span>+38(073)-999-99-09</span>
        
      </p>
    </div>
  );
};

export default React.memo(RequestError);
