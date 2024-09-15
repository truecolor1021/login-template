import axios from "axios";
import { BACKEND_URL } from "./backendUrl";
export const postJson = (token) => {
  return axios.post(BACKEND_URL / "current", token);
};
export const signIn = ({ email, password }) => {
  return axios.post(BACKEND_URL + "/login", { email, password });
};
export const addPof = (token) => {
  return axios.post(BACKEND_URL / "current", token);
};
export const addBlock = (text) => {
  return axios.post(`${BACKEND_URL}/pro`, { data: text });
};
export const getBlocks = () => {
  return axios.get(`${BACKEND_URL}/pro`);
};

export const setAuthToken = (token) => {
  if (token) {
    console.log(token);
    localStorage.setItem("items", token);
    axios.defaults.headers.common["Authorization"] = token;
  }
};
export const SignUp = (data) => {
  return axios.post(`${BACKEND_URL}/register`, data);
};
export const signOut = (navigate) => {
  console.log("asdfasdf");
  navigate("/signin");

  localStorage.removeItem("items");
};
