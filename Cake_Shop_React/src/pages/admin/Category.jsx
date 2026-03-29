import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import "./AdminPages.scss";
import { api } from "../../api/axios.api";
import { fetchCategories } from "../../api/commonAPIs";

const initialFormData = {
  name: "",
  description: "",
};

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);

  React.useEffect(() => {
    const fetchCategoryData = async () => {
      const categoryResObj = await fetchCategories();
      setCategories(categoryResObj.data);
    };
    fetchCategoryData();
  }, []);

  const handleAddClick = () => {
    setSelectedCategory(null);
    setFormData(initialFormData);
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
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
      api
        .patch(`/api/categories/${selectedCategory._id}`, formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          console.log("Category updated:", response.data);
        })
        .catch((error) => {
          console.error("Error updating category:", error);
        });
    } else {
      api
        .post("/api/categories", formData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          console.log("Category added:", response.data);
        })
        .catch((error) => {
          console.error("Error adding category:", error);
        });
    }
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData(initialFormData);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData(initialFormData);
  };

  const handleDeleteClick = (category) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      api
        .delete(`/api/categories/${category._id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
          },
        })
        .then((response) => {
          console.log("Category deleted:", response.data);
          // Remove the deleted category from the list
          setCategories((prev) =>
            prev.filter((cat) => cat._id !== category._id),
          );
        })
        .catch((error) => {
          console.error("Error deleting category:", error);
        });
    }
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
            {/* <th>ID</th> */}
            <th>Category Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category._id}>
              {/* <td>{category._id}</td> */}
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(category)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(category)}
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
              name="name"
              value={formData.name}
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
        </form>
      </Modal>
    </div>
  );
};

export default Category;
