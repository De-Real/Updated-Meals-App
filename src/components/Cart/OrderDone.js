import React from "react";
import classes from "./OrderDone.module.css";

const OrderDone = ({ name, email }) => {
  return (
    <div className={classes.order}>
      <h2>Thanks for ordering! </h2>
      <p>
        <span> {name || "Guest (error) "}</span>! We will contact you as soon as
        possible!
      </p>
      <p>
        If you wanna change your order or have a call with a manager you can
        contact with us using this number
        <span> +38(073)-999-99-09</span>.
      </p>
      <p>
        Check was sent on <span> {email || "Your email (error)"}</span>.
      </p>
    </div>
  );
};

export default React.memo(OrderDone);
