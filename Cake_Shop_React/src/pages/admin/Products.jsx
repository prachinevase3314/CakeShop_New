import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import "./AdminPages.scss";
import { api } from "../../api/axios.api";
import { fetchCategories, fetchProducts } from "../../api/commonAPIs";

const initialFormData = {
  name: "",
  productCategory: "",
  description: "",
  price: "",
  stock: "",
  imageFile: null,
};

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryResObj = await fetchCategories();
      setCategories(categoryResObj.data);
    };
    fetchCategoryData();
  }, []);

  React.useEffect(() => {
    const fetchProductsData = async () => {
      const productResObj = await fetchProducts();
      setProducts(productResObj.data);
    };
    fetchProductsData();
  }, []);

  const handleAddClick = () => {
    setSelectedProduct(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      productCategory: product.productCategory._id,
      price: product.price,
      stock: product.stock,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        imageFile: files?.[0] || null,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProduct = async () => {
    try {
      const productPayload = new FormData();
      productPayload.append("name", formData.name);
      productPayload.append("description", formData.description);
      productPayload.append("productCategory", formData.productCategory);
      productPayload.append("price", formData.price);
      productPayload.append("stock", formData.stock);
      if (formData.imageFile) {
        productPayload.append("image", formData.imageFile);
      }

      if (selectedProduct) {
        // Update existing product
        const response = await api.put(
          `/api/products/${selectedProduct._id}`,
          productPayload,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
              "Content-Type": undefined,
            },
          },
        );
        console.log("Product updated successfully:", response.data);
        setProducts((prev) =>
          prev.map((prod) =>
            prod._id === selectedProduct._id ? response.data.product : prod,
          ),
        );
      } else {
        // Add new product
        const response = await api.post("/api/products", productPayload, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
            "Content-Type": undefined,
          },
        });
        console.log("Product added successfully:", response.data);
        setProducts((prev) => [...prev, response.data.product]);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }

    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData(initialFormData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData(initialFormData);
  };

  const handleDeleteClick = (product) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      api
        .delete(`/api/products/${product._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          console.log("Product deleted:", response.data);
          // Remove the deleted product from the list
          setProducts((prev) =>
            prev.filter((prod) => prod._id !== product._id),
          );
        })
        .catch((error) => {
          console.error("Error deleting product:", error);
        });
    }
  };

  return (
    <div className="admin-page">
      <h1>Products Management</h1>
      <div className="page-header">
        <button className="add-btn" onClick={handleAddClick}>
          + Add New Product
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Image</th>
            <th>Product Name</th>
            <th>Product Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                ) : (
                  "-"
                )}
              </td>
              <td>{product.name}</td>
              <td>{product.productCategory?.name}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(product)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isModalOpen}
        title={selectedProduct ? "Edit Product" : "Add New Product"}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        saveButtonText={selectedProduct ? "Update Product" : "Save Product"}
      >
        <form>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter product name"
            />
          </div>

          {/* Description Input */}
          <div className="form-group">
            <label>Product Description</label>
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="productCategory"
              value={formData.productCategory}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="">Select Category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter price"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter stock quantity"
            />
          </div>

          <div className="form-group">
            <label>Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleInputChange}
              className="form-input"
            />
            {formData.imageFile && (
              <p className="image-name">Selected: {formData.imageFile.name}</p>
            )}
            {selectedProduct?.image && !formData.imageFile && (
              <div className="image-preview">
                <p>Current image:</p>
                <img
                  src={selectedProduct.image}
                  alt="Current product"
                  style={{ width: 120, height: 120, objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;
