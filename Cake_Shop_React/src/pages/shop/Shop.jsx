import React, { useState } from "react";
import { products } from "../../utils/constants";
import "./Shop.scss";

const Shop = () => {
  const [quantities, setQuantities] = useState({});

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

  const handleAddToCart = (product) => {
    const qty = quantities[product.id] || 1;
    console.log(
      `Added ${qty} ${product.name}(s) to cart. Price: ₹${(product.price * qty).toFixed(2)}`,
    );
    // Reset quantity after adding to cart
    setQuantities((prev) => ({
      ...prev,
      [product.id]: 1,
    }));
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
            <div key={product.id} className="product-card">
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
                      onClick={() => handleRemoveQuantity(product.id)}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantities[product.id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product.id, e.target.value)
                      }
                      className="qty-input"
                    />
                    <button
                      className="qty-btn"
                      onClick={() => handleAddQuantity(product.id)}
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
