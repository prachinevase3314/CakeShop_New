export const logoutAction = () => {
  sessionStorage.removeItem("authToken");
};

export const isUserAdmin = () => {
  return sessionStorage.getItem("role") === "admin";
};
