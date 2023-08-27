import React, { useState, useEffect } from "react";
import "./App.css";

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://crdms.images.consumerreports.org/c_lfill,w_470,q_auto,f_auto/prod/cars/cr/car-versions/12630-2018-tesla-model-3-long-range"
        alt="Tesla Model 3"
      />
      <div className="description">
      <h3>Tesla Model 3</h3>
      <h5>$60000.00</h5>
      </div>
    </div>
    <form action="http://localhost:8000/api/stripe/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}