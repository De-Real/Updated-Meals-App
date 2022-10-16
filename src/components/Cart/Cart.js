import { useContext, useEffect, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import LoginContext from "../../store/login-context";
import AltButton from "../UI/Buttons/AltButton";
import Button from "../UI/Buttons/Button";
import OrderDone from "./OrderDone";
import useFetch from "../../hooks/use-fetch";
import RequestError from "../RequestStatuses/RequestError/RequestError";
import LoadingRequest from "../RequestStatuses/LoadingRequest/LoadingRequest";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const loginCtx = useContext(LoginContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const { isLoading, error, fetchData: postOrder } = useFetch();

  //   const postOrder = async (body = null) => {
  //     if (!body) return;
  //     const response = await fetch(
  //       "https://react-meals-d80c0-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
  //       {
  //         body: JSON.stringify(body),
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         method: "POST",
  //       }
  //     );

  //     if (!response.ok) {
  //       console.log(response);
  //       setHasError(true);
  //       console.log("error");
  //       return;
  //     }

  //     const result = await response.json();
  //     console.log("OK", result);
  //   };

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

      postOrder(
        {
          url: "https://react-meals-d80c0-default-rtdb.europe-west1.firebasedatabase.app/orders.json",
          body: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        },
        (res) => console.log(res)
      );

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
    cartCtx.addItem({...item, amount: 1});
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

  const cartConditions =
    !props.wasOrdered && !props.isOrdering && !isLoading && !error;
  const madeOrderConditions = props.wasOrdered && !isLoading && !error;
  return (
    <Modal onClose={props.onClose}>
      {isLoading && !error && <LoadingRequest />}
      {cartConditions && (
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
      {madeOrderConditions && (
        <>
          <OrderDone name={loginCtx.name} email={loginCtx.email} />
          <div className={classes.actions}>
            <AltButton onClick={props.onClose}> Close </AltButton>
            <Button onClick={onAnotherOrder}> Another Order </Button>
          </div>
        </>
      )}
      {error && !isLoading && <RequestError error={error} />}
    </Modal>
  );
};

export default Cart;
