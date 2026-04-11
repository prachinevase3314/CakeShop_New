import { api } from "./axios.api";

export const fetchCategories = async () => {
  let resObj = {
    data: [],
    error: null,
  };
  try {
    const res = await api.get("/api/categories", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    resObj.data = res.data;
    resObj.error = null;
  } catch (error) {
    resObj.data = [];
    resObj.error = error;
  } finally {
    return resObj;
  }
};

export const fetchProducts = async () => {
  let resObj = {
    data: [],
    error: null,
  };
  try {
    const res = await api.get("/api/products", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    resObj.data = res.data;
    resObj.error = null;
  } catch (error) {
    resObj.data = [];
    resObj.error = error;
  } finally {
    return resObj;
  }
};

export const fetchUsers = async () => {
  let resObj = {
    data: [],
    error: null,
  };
  try {
    const res = await api.get("/api/users/all", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    resObj.data = res.data.users;
    resObj.error = null;
  } catch (error) {
    resObj.data = [];
    resObj.error = error;
  } finally {
    return resObj;
  }
};

export const fetchOrders = async () => {
  let resObj = {
    data: [],
    error: null,
  };
  try {
    const res = await api.get("/api/orders", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    resObj.data = res.data.orders;
    resObj.error = null;
  } catch (error) {
    resObj.data = [];
    resObj.error = error;
  } finally {
    return resObj;
  }
};

export const fetchDashboardStats = async () => {
  let resObj = {
    data: null,
    error: null,
  };
  try {
    const res = await api.get("/api/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    resObj.data = res.data;
    resObj.error = null;
  } catch (error) {
    resObj.data = null;
    resObj.error = error;
  } finally {
    return resObj;
  }
};

// Cart APIs
export const addToCart = async (productId, quantity, price) => {
  let resObj = {
    data: null,
    error: null,
  };
  try {
    const res = await api.post(
      "/api/users/cart/add",
      {
        productId,
        quantity,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      },
    );
    resObj.data = res.data;
    resObj.error = null;
  } catch (error) {
    resObj.data = null;
    resObj.error = error;
  } finally {
    return resObj;
  }
};

export const getCart = async () => {
  let resObj = {
    data: [],
    error: null,
  };
  try {
    const res = await api.get("/api/users/cart", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    resObj.data = res.data.cart;
    resObj.error = null;
  } catch (error) {
    resObj.data = [];
    resObj.error = error;
  } finally {
    return resObj;
  }
};

export const updateCartItem = async (productId, quantity) => {
  let resObj = {
    data: null,
    error: null,
  };
  try {
    const res = await api.put(
      "/api/users/cart/update",
      {
        productId,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
        },
      },
    );
    resObj.data = res.data;
    resObj.error = null;
  } catch (error) {
    resObj.data = null;
    resObj.error = error;
  } finally {
    return resObj;
  }
};

export const removeFromCart = async (productId) => {
  let resObj = {
    data: null,
    error: null,
  };
  try {
    const res = await api.delete(`/api/users/cart/remove/${productId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    resObj.data = res.data;
    resObj.error = null;
  } catch (error) {
    resObj.data = null;
    resObj.error = error;
  } finally {
    return resObj;
  }
};

export const clearCart = async () => {
  let resObj = {
    data: null,
    error: null,
  };
  try {
    const res = await api.delete("/api/users/cart/clear", {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("authToken")}`,
      },
    });
    resObj.data = res.data;
    resObj.error = null;
  } catch (error) {
    resObj.data = null;
    resObj.error = error;
  } finally {
    return resObj;
  }
};
