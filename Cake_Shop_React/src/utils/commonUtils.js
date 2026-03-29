export const logoutAction = () => {
  sessionStorage.removeItem("authToken");
  sessionStorage.removeItem("user");
};

export const isUserAdmin = () => {
  const user = getUserData();
  if (!user) {
    return false;
  }
  return user.role === "admin";
};

export const getUserData = () => {
  const user = sessionStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const setUserData = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};

export const getAPIURL = () => {
  return process.env.API_URL;
};
