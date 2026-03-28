import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import "./AdminPages.scss";

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
  });

  const products = [
    {
      id: 1,
      productName: "Chocolate Cake",
      category: "Cakes",
      price: "25.00",
      stock: "45",
    },
    {
      id: 2,
      productName: "Vanilla Cupcakes",
      category: "Cupcakes",
      price: "15.00",
      stock: "67",
    },
  ];

  const handleAddClick = () => {
    setSelectedProduct(null);
    setFormData({
      productName: "",
      category: "",
      price: "",
      stock: "",
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      productName: product.productName,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProduct = () => {
    if (selectedProduct) {
      console.log("Product updated:", { id: selectedProduct.id, ...formData });
    } else {
      console.log("Product added:", formData);
    }
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData({
      productName: "",
      category: "",
      price: "",
      stock: "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setFormData({
      productName: "",
      category: "",
      price: "",
      stock: "",
    });
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
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.productName}</td>
              <td>{product.category}</td>
              <td>₹{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </button>
                <button className="delete-btn">Delete</button>
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
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter product name"
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter category"
            />
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
        </form>
      </Modal>
    </div>
  );
};

export default Products;
