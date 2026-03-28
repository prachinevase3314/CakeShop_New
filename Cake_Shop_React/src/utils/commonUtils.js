export const logoutAction = () => {
  sessionStorage.removeItem("authToken");
};
