import React, { useState } from "react";
import { imageURL } from "../../utils/constants";
import "./Shop.scss";
import { fetchProducts, addToCart } from "../../api/commonAPIs";

const CART_KEY = "cartItems";

const Shop = () => {
  const [quantities, setQuantities] = useState({});
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    const fetchProductsData = async () => {
      const productResObj = await fetchProducts();
      const newProducts = productResObj?.data?.map((product) => {
        const category = product.category;
        return { ...product, image: imageURL[category] || imageURL.Cakes };
      });
      setProducts(newProducts || []);
    };
    fetchProductsData();
  }, []);

  const handleAddToCart = async (product) => {
    const qty = quantities[product._id] || 1;

    try {
      const response = await addToCart(product._id, qty, product.price);

      // Always update localStorage for navbar count
      const currentCart = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      const existingIndex = currentCart.findIndex(
        (item) => item._id === product._id,
      );

      if (existingIndex !== -1) {
        currentCart[existingIndex].quantity += qty;
      } else {
        currentCart.push({ ...product, quantity: qty });
      }

      localStorage.setItem(CART_KEY, JSON.stringify(currentCart));

      if (response.error) {
        alert(`"${product.name}" added to cart (offline mode)`);
      } else {
        alert(`"${product.name}" added to cart`);
      }

      setQuantities((prev) => ({ ...prev, [product._id]: 1 }));

      // Dispatch custom event to update navbar cart count
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert(`Failed to add "${product.name}" to cart`);
    }
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
