import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.scss";
import { getUserData } from "../../utils/commonUtils";
import { api } from "../../api/axios.api";
import {
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from "../../api/commonAPIs";

const CART_KEY = "cartItems";

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  React.useEffect(() => {
    fetchCartFromServer();
  }, []);

  const fetchCartFromServer = async () => {
    try {
      setLoading(true);
      const response = await getCart();
      if (response.error) {
        // Fallback to localStorage
        const stored = localStorage.getItem(CART_KEY);
        setCartItems(stored ? JSON.parse(stored) : []);
      } else {
        setCartItems(response.data || []);
        // Sync localStorage with server data
        localStorage.setItem(CART_KEY, JSON.stringify(response.data || []));
      }
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      const stored = localStorage.getItem(CART_KEY);
      setCartItems(stored ? JSON.parse(stored) : []);
    } finally {
      setLoading(false);
    }
  };

  const saveCartToLocalStorage = (items) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    try {
      const response = await updateCartItem(productId, newQuantity);
      if (!response.error) {
        // Update state after successful server update
        setCartItems((prev) =>
          prev.map((item) =>
            item.productId._id === productId
              ? { ...item, quantity: newQuantity }
              : item,
          ),
        );
        // Sync localStorage
        const updated = cartItems.map((item) =>
          item.productId._id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        );
        saveCartToLocalStorage(updated);
      } else {
        // Fallback to localStorage update
        const updated = cartItems.map((item) =>
          item.productId._id === productId || item._id === productId
            ? { ...item, quantity: newQuantity }
            : item,
        );
        setCartItems(updated);
        saveCartToLocalStorage(updated);
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
      // Fallback: update locally
      const updated = cartItems.map((item) =>
        item.productId._id === productId || item._id === productId
          ? { ...item, quantity: newQuantity }
          : item,
      );
      setCartItems(updated);
      saveCartToLocalStorage(updated);
    }

    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveItem = async (productId) => {
    try {
      const response = await removeFromCart(productId);
      if (!response.error) {
        // Update state after successful server removal
        setCartItems((prev) =>
          prev.filter((item) => item.productId._id !== productId),
        );
        // Sync localStorage
        const updated = cartItems.filter(
          (item) => item.productId._id !== productId,
        );
        saveCartToLocalStorage(updated);
      } else {
        // Fallback to localStorage removal
        const updated = cartItems.filter(
          (item) => item.productId._id !== productId && item._id !== productId,
        );
        setCartItems(updated);
        saveCartToLocalStorage(updated);
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
      // Fallback: remove locally
      const updated = cartItems.filter(
        (item) => item.productId._id !== productId && item._id !== productId,
      );
      setCartItems(updated);
      saveCartToLocalStorage(updated);
    }

    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleClearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your cart?")) return;

    try {
      const response = await clearCart();
      if (!response.error) {
        setCartItems([]);
        localStorage.removeItem(CART_KEY);
      } else {
        setCartItems([]);
        localStorage.removeItem(CART_KEY);
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
      setCartItems([]);
      localStorage.removeItem(CART_KEY);
    }

    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
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
      productId: item.productId._id || item._id,
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
        localStorage.removeItem(CART_KEY);
        // Dispatch custom event to update navbar cart count
        window.dispatchEvent(new Event("cartUpdated"));
      })
      .catch((error) => {
        console.error("Failed to place order:", error);
        alert("There was an error placing your order. Please try again.");
      });

    console.log("Order placed:", payload);
  };

  if (loading) return <div className="cart-page">Loading...</div>;

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
                <div key={item.productId._id || item._id} className="cart-item">
                  <div className="col-product">
                    <img
                      src={item.image || item.productId.image}
                      alt={item.name || item.productId.name}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h3>{item.name || item.productId.name}</h3>
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
                          handleQuantityChange(
                            item.productId._id || item._id,
                            item.quantity - 1,
                          )
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
                            item.productId._id || item._id,
                            parseInt(e.target.value) || 1,
                          )
                        }
                        className="qty-input"
                      />
                      <button
                        className="qty-btn"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id || item._id,
                            item.quantity + 1,
                          )
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
                      onClick={() =>
                        handleRemoveItem(item.productId._id || item._id)
                      }
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
                  onClick={() => handleClearCart()}
                >
                  Clear Cart
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
