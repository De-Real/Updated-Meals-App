import { useEffect, useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import LoginProvider from "./store/LoginProvider";
import LogControl from "./components/LogControl/LogControl";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [logModalIsShown, setLogModalIsShown] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [wasOrdered, setWasOrdered] = useState(false);

  const manageCartHandler = () => {
    setCartIsShown((curState) => !curState);
  };

  const manageLogModalHandler = () => {
    if (isOrdering) {
      manageCartHandler();
      setIsOrdering(false);
    }
    setLogModalIsShown((curState) => !curState);
  };

  const manageOrdering = (bool = false) => {
    console.log(bool);
    setIsOrdering(bool);
  };

  const manageOrderStatus = (status) => {
    setWasOrdered(status);
    if (!status) return;
    setIsOrdering(false);
    setWasOrdered(true);
  };

  useEffect(() => {
    if (isOrdering) {
      setLogModalIsShown(true);
    }
  }, [isOrdering]);

  return (
    <LoginProvider>
      <CartProvider>
        {cartIsShown && (
          <Cart
            onOrdering={manageOrdering}
            isOrdering={isOrdering}
            onClose={manageCartHandler}
            wasOrdered={wasOrdered}
            changeOrderStatus={manageOrderStatus}
          />
        )}
        {logModalIsShown && <LogControl onClose={manageLogModalHandler} />}
        <Header
          onShowCart={manageCartHandler}
          onShowLogModal={manageLogModalHandler}
        />
        <main>
          <Meals />
        </main>
      </CartProvider>
    </LoginProvider>
  );
}

export default App;
