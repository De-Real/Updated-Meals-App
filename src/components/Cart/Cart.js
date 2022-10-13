import { useContext, useEffect, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import LoginContext from "../../store/login-context";
import AltButton from "../UI/Buttons/AltButton";
import Button from "../UI/Buttons/Button";
import OrderDone from "./OrderDone";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const loginCtx = useContext(LoginContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const [hasError, setHasError] = useState(false);

  const postOrder = async (body = null) => {
    if (!body) return;
    const response = fetch(
      "https://react-meals-d80c0-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
      {
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (!response.ok) {
      setHasError(true);
      console.log("error");
      return;
    }

    const result = await response.json();
    console.log("OK", result);
  };

  const onOrderHandler = () => {
    const {
      name: userName,
      email: userEmail,
      phone: userPhone,
      adress: userAdress,
      loggedIn,
    } = loginCtx;
    const { items } = cartCtx;

    console.log(items);

    if (loggedIn) {
      const data = {
        userName,
        userEmail,
        userPhone,
        userAdress,
        orderedMeals: items,
        data: new Date().toLocaleString(),
      };

      postOrder(data);

      props.changeOrderStatus(true);
      cartCtx.clearItems();
      props.onOrdering();
    } else {
      props.onOrdering(true);
      props.onClose();
    }
  };

  useEffect(() => {
    if (!loginCtx.loggedIn) {
      props.changeOrderStatus(false);
    }
  }, [loginCtx.loggedIn]);

  useEffect(() => {
    if (hasItems && props.wasOrdered) {
      props.changeOrderStatus(false);
    }
  }, [hasItems, props.wasOrdered]);

  useEffect(() => {
    if (props.isOrdering) {
      props.onOrdering(false);
      onOrderHandler();
    }
  }, [props.isOrdering]);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const onAnotherOrder = () => {
    props.changeOrderStatus(false);
    props.onClose();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {!props.wasOrdered && !props.isOrdering && (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <div className={classes.actions}>
            <AltButton onClick={props.onClose}> Close </AltButton>
            {hasItems && <Button onClick={onOrderHandler}> Order </Button>}
          </div>
        </>
      )}

      {props.wasOrdered && (
        <>
          <OrderDone name={loginCtx.name} email={loginCtx.email} />
          <div className={classes.actions}>
            <AltButton onClick={props.onClose}> Close </AltButton>
            <Button onClick={onAnotherOrder}> Another Order </Button>
          </div>
        </>
      )}
    </Modal>
  );
};

export default Cart;
