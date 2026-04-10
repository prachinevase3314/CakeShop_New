import React, { useState } from "react";
import Modal from "../../components/modal/Modal";
import { orderDetails } from "../../utils/constants";
import "./AdminPages.scss";
import { fetchOrders } from "../../api/commonAPIs";

const Orders = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

  React.useEffect(() => {
    const fetchOrdersData = async () => {
      const ordersResObj = await fetchOrders();
      setOrders(ordersResObj.data);
    };
    fetchOrdersData();
  }, []);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setEditedOrder({ ...order });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      console.log("Order deleted:", orderId);
      // Add delete logic here
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    console.log("Order updated:", editedOrder);
    setIsModalOpen(false);
    setSelectedOrder(null);
    setEditedOrder(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
    setEditedOrder(null);
  };

  return (
    <div className="admin-page">
      <h1>Orders Management</h1>
      <div className="page-header">
        <input
          type="text"
          placeholder="Search orders..."
          className="search-input"
        />
      </div>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Payment Method</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.customerName}</td>
              <td>₹{order.totalAmount}</td>
              <td>{order.paymentMethod}</td>
              <td>{order.createdAt?.split("T")[0]}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEditClick(order)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteClick(order.orderId)}
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
        title="Edit Order Details"
        onClose={handleCloseModal}
        onSave={handleSaveChanges}
        saveButtonText="Save Changes"
      >
        <form>
          <div className="form-group">
            <label>Order ID</label>
            <input
              type="text"
              name="orderId"
              value={editedOrder?.orderId || ""}
              disabled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={editedOrder?.customerName || ""}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="customerEmail"
              value={editedOrder?.customerEmail || ""}
              onChange={handleInputChange}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="customerPhone"
              value={editedOrder?.customerPhone || ""}
              onChange={handleInputChange}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label>Amount</label>
            <input
              type="number"
              name="totalAmount"
              value={editedOrder?.totalAmount || ""}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Payment Method</label>
            <input
              type="text"
              name="paymentMethod"
              value={editedOrder?.paymentMethod || ""}
              disabled
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="createdAt"
              value={editedOrder?.createdAt?.split("T")[0] || ""}
              onChange={handleInputChange}
              className="form-input"
              disabled
            />
          </div>

          <div className="form-group">
            <label>Notes</label>
            <textarea
              name="notes"
              value={editedOrder?.notes || ""}
              onChange={handleInputChange}
              className="form-input"
              rows="3"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Orders;
