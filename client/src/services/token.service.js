import axios from "axios";
import authHeader from "./auth-header";

const getAllTokens = () => {
  return axios.get("/apiKey/all", { headers: authHeader() });
};

const createApiKey = () => {
  return axios.post("/create/apiKey", {}, { headers: authHeader() });
};

const deleteApiKey = (tokenId) => {
  return axios.post("/delete/apiKey", { tokenId }, { headers: authHeader() });
};

export default {
  getAllTokens,
  createApiKey,
  deleteApiKey,
};
