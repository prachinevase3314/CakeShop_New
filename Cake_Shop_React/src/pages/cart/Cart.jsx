import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chocolate Cake",
      price: 25.0,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop",
    },
    {
      id: 3,
      name: "Chocolate Chip Cookies",
      price: 12.0,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&h=300&fit=crop",
    },
    {
      id: 5,
      name: "Croissants",
      price: 8.0,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1623334044303-241021148842?w=300&h=300&fit=crop",
    },
  ]);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    console.log("Proceeding to checkout with items:", cartItems);
    // Add checkout logic here
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
                <div key={item.id} className="cart-item">
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
                          handleQuantityChange(item.id, item.quantity - 1)
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
                            item.id,
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="qty-input"
                      />
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="col-subtotal">
                    <span>${calculateSubtotal(item.price, item.quantity)}</span>
                  </div>

                  <div className="col-action">
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
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

                <button className="checkout-btn" onClick={handleCheckout}>
                  Proceed to Checkout
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
