import React, { useState } from "react";
import { products as initialProducts } from "../../utils/constants";
import "./Shop.scss";
import { fetchProducts } from "../../api/commonAPIs";

const CART_KEY = "cartItems";

const Shop = () => {
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState(initialProducts);

  React.useEffect(() => {
    const fetchProductsData = async () => {
      const productResObj = await fetchProducts();
      setProducts(productResObj.data);
    };
    fetchProductsData();
  }, []);

  const getCartFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Error parsing cart from localStorage", err);
      return [];
    }
  };

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  };

  const handleAddToCart = (product) => {
    const qty = quantities[product._id] || 1;
    const currentCart = getCartFromLocalStorage();

    const existingIndex = currentCart.findIndex(
      (item) => item._id === product._id,
    );
    if (existingIndex !== -1) {
      const updatedCart = [...currentCart];
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + qty,
      };
      saveCartToLocalStorage(updatedCart);
    } else {
      saveCartToLocalStorage([...currentCart, { ...product, quantity: qty }]);
    }

    setQuantities((prev) => ({ ...prev, [product._id]: 1 }));
    alert(`${qty}x "${product.name}" added to cart`);
  };

  const handleQuantityChange = (productId, value) => {
    const qty = Math.max(1, parseInt(value) || 1);
    setQuantities((prev) => ({
      ...prev,
      [productId]: qty,
    }));
  };

  const handleAddQuantity = (productId) => {
    const currentQty = quantities[productId] || 1;
    setQuantities((prev) => ({
      ...prev,
      [productId]: currentQty + 1,
    }));
  };

  const handleRemoveQuantity = (productId) => {
    const currentQty = quantities[productId] || 1;
    if (currentQty > 1) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: currentQty - 1,
      }));
    }
  };

  return (
    <div className="shop-page">
      <div className="shop-container">
        <h1>Our Shop</h1>
        <p className="shop-subtitle">
          Browse our delicious collection of cakes and pastries
        </p>

        <div className="products-grid">
          {products.map((product) => (
            <div key={product._id}>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-description">{product.description}</p>

                <div className="product-footer">
                  <span className="product-price">
                    ₹{product.price.toFixed(2)}
                  </span>

                  <div className="quantity-controls">
                    <button
                      className="qty-btn"
                      onClick={() => handleRemoveQuantity(product._id)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantities[product._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product._id, e.target.value)
                      }
                      className="qty-input"
                    />
                    <button
                      className="qty-btn"
                      onClick={() => handleAddQuantity(product._id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
