import axios from "axios";
import { API_LOCAL } from "../config";
// import secureLocalStorage from "react-secure-storage";
import { isMobile } from "react-device-detect";
import moment from "moment";
import "moment-timezone";
import Cookies from "js-cookie";

export const ipInfo = async () => {
  try {
    let data;
    const type = isMobile;
    const deviceType = type ? "mobile" : "pc";
    const ua = window.navigator.appVersion;
    const res = await axios.get("https://api.ipify.org/?format=json");
    if (res.status === 200) {
      const resData = res?.data;
      data = `${resData?.ip} ${deviceType} - ${ua}`;
      Cookies.set("ip", data, { expires: 7, secure: true });
    } else {
      data = Cookies.get("ip");
    }
    if (data) return data;
    throw data;
  } catch (error) {
    console.log("ipInfo", error);
  }
};

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
  const token = Cookies.get("token");
  return token;
};

export const setToken = (token) => {
  Cookies.set("token", token, { expires: 7, secure: true });
};

export const setLoginTime = (login_time) => {
  Cookies.set("login_time", login_time, { expires: 7, secure: true });
};

export const getLoginTime = () => {
  const login_time = Cookies.get("login_time");
  return login_time;
};

export const loginUser = async (formData) => {
  try {
    const api = API_LOCAL + "login";
    const IP = await ipInfo();
    const login_time = moment()
      .tz("Asia/Phnom_Penh")
      .format("YYYY-MM-DD hh:mm:ss");

    const newData = getFormData(formData);
    const res = await axios.post(api, { ...newData, ip: IP });
    if (res) {
      setLoginTime(login_time);
      return res.data;
    }
    throw res;
  } catch (error) {
    console.log("loginUser", error);
  }
};

export const registerUser = async (formData) => {
  try {
    const api = API_LOCAL + "register";
    const IP = await ipInfo();
    const newData = getFormData(formData);
    const res = await axios.post(api, { ...newData, ip: IP });
    if (res) return res;
    throw res;
  } catch (error) {
    console.log("registerUser", error);
  }
};

export const loadUser = async () => {
  try {
    const api = API_LOCAL + "user";
    const IP = await ipInfo();
    const token = getToken();
    const res = await axios.post(api, { token, ip: IP });
    if (res) return res?.data;
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
    const code = res?.data?.code;
    if (parseFloat(code) === 1) {
      Cookies.remove("token");
      Cookies.remove("ip");
      Cookies.remove("login_time");
      return res.data;
    }
  } catch (error) {
    console.log("🚢 ~ logoutUser ~ ➡️:", error);
  }
};
