import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import "./AdminPages.scss";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    categoryName: "",
    description: "",
    productsCount: "",
  });

  const categories = [
    {
      id: 1,
      categoryName: "Cakes",
      description: "Delicious homemade cakes",
      productsCount: "24",
    },
    {
      id: 2,
      categoryName: "Cookies",
      description: "Fresh baked cookies",
      productsCount: "18",
    },
    {
      id: 3,
      categoryName: "Pastries",
      description: "Artisan pastries",
      productsCount: "16",
    },
  ];

  const handleAddClick = () => {
    setSelectedCategory(null);
    setFormData({
      categoryName: "",
      description: "",
      productsCount: "",
    });
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormData({
      categoryName: category.categoryName,
      description: category.description,
      productsCount: category.productsCount,
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

  const handleSaveCategory = () => {
    if (selectedCategory) {
      console.log("Category updated:", {
        id: selectedCategory.id,
        ...formData,
      });
    } else {
      console.log("Category added:", formData);
    }
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData({
      categoryName: "",
      description: "",
      productsCount: "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData({
      categoryName: "",
      description: "",
      productsCount: "",
    });
  };
  return (
    <div className="admin-page">
      <h1>Category Management</h1>
      <div className="page-header">
        <button className="add-btn" onClick={handleAddClick}>
          + Add New Category
        </button>
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Products Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.categoryName}</td>
              <td>{category.description}</td>
              <td>{category.productsCount}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(category)}
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
        title={selectedCategory ? "Edit Category" : "Add New Category"}
        onClose={handleCloseModal}
        onSave={handleSaveCategory}
        saveButtonText={selectedCategory ? "Update Category" : "Save Category"}
      >
        <form>
          <div className="form-group">
            <label>Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter category name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter category description"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Products Count</label>
            <input
              type="number"
              name="productsCount"
              value={formData.productsCount}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter number of products"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Category;
