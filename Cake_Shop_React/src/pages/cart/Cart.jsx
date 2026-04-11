import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import { getUserData } from "../../utils/commonUtils";
import { api } from "../../api/axios.api";

const CART_KEY = "cartItems";

const Cart = () => {
  const navigate = useNavigate();

  const getCartFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  };

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const [cartItems, setCartItems] = useState(() => getCartFromLocalStorage());

  React.useEffect(() => {
    saveCartToLocalStorage(cartItems);
  }, [cartItems]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleOrderNowClick = () => {
    const newCartItems = cartItems.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    }));

    const payload = {
      customerId: getUserData().id,
      products: newCartItems,
      totalAmount: parseFloat(calculateTotal()),
    };

    api
      .post("/api/orders", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log("Order placed successfully:", response.data);
        alert("Your order has been placed successfully!");
        setCartItems([]);
      })
      .catch((error) => {
        console.error("Failed to place order:", error);
        alert("There was an error placing your order. Please try again.");
      });

    console.log("Order placed:", payload);
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button
              className="continue-shopping-btn"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              <div className="cart-header">
                <div className="col-product">Product</div>
                <div className="col-price">Price</div>
                <div className="col-quantity">Quantity</div>
                <div className="col-subtotal">Subtotal</div>
                <div className="col-action">Action</div>
              </div>

              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="col-product">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                    </div>
                  </div>

                  <div className="col-price">
                    <span>₹{item.price.toFixed(2)}</span>
                  </div>

                  <div className="col-quantity">
                    <div className="quantity-controls">
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="qty-input"
                      />
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-subtotal">
                    <span>₹{calculateSubtotal(item.price, item.quantity)}</span>
                  </div>

                  <div className="col-action">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h2>Order Summary</h2>

                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>₹{calculateTotal()}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>₹0.00</span>
                </div>

                <div className="summary-row">
                  <span>Tax:</span>
                  <span>₹0.00</span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-total">
                  <span>Total Amount:</span>
                  <span className="total-price">₹{calculateTotal()}</span>
                </div>

                <button className="checkout-btn" onClick={handleOrderNowClick}>
                  Order Now
                </button>

                <button
                  className="continue-shopping-btn"
                  onClick={() => navigate("/shop")}
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
