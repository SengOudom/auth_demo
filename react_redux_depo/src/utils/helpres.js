import axios from "axios";
import { API_LOCAL } from "../config";
import secureLocalStorage from "react-secure-storage";

export const getFormData = (formData) => {
  if (!formData) return {};
  const data = {};
  formData?.forEach((val, key) => {
    data[key] =
      Number.isFinite(Number(val)) && !key.startsWith("pass") && val
        ? Number(val)
        : val;
  });
  return data;
};

export const getToken = () => {
  const token = secureLocalStorage.getItem("token");
  return token;
};

export const setToken = (token) => {
  secureLocalStorage.setItem("token", token);
};

export const loginUser = async (formData) => {
  try {
    const api = API_LOCAL + "login";
    const newData = getFormData(formData);
    const res = await axios.post(api, newData);
    if (res) return res.data;
    throw res;
  } catch (error) {
    console.log("loginUser", error);
  }
};

export const registerUser = async (formData) => {
  try {
    const api = API_LOCAL + "register";
    const newData = getFormData(formData);
    const res = await axios.post(api, newData);
    if (res) return res;
    throw res;
  } catch (error) {
    console.log("registerUser", error);
  }
};

export const loadUser = async () => {
  try {
    const api = API_LOCAL + "user";
    const token = getToken();
    const res = await axios.post(api, { token });
    if (res) return res.data;
    throw res;
  } catch (error) {
    console.log("loadUser", error);
  }
};

export const logoutUser = async () => {
  try {
    const api = API_LOCAL + "logout";
    const token = getToken();
    const res = await axios.post(api, { token });
    const code = res.data?.code;
    if (parseFloat(code) === 1) {
      secureLocalStorage.clear();
      return res.data
    }
  } catch (error) {
    console.log("🚢 ~ logoutUser ~ ➡️:", error);
  }
};
