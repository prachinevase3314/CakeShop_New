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
