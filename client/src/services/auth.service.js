import axios from "axios";

const register = (username, email, password) => {
  return axios.post("/auth/signup", {
    email,
    username,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post("/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
