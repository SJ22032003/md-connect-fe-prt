import axios from "axios";
import toastMessages from "../../../utils/toastMessages";

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

// @desc login PATIENT
// @route POST baseUrl + public/patient/login
// @access Public
export const loginAsPatientApi = async (action: any) => {
  let res = null;
  const { email, password } = action.payload;
  try {
    const response = await axios.post(`${baseUrl}/public/patient/login`, {
      email,
      password,
    });
    res = response;
    toastMessages({ type: "success", message: "Your are now logged in" });
  } catch (error: any) {
    console.log(error.response);
    toastMessages({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc register PATIENT
// @route POST baseUrl + public/patient/register
// @access Public
export const registerAsPatientApi = async (action: any) => {
  let res = null;
  const { email, password } = action.payload;
  try {
    const response = await axios.post(`${baseUrl}/public/patient/register`, {
      email,
      password,
    });
    res = response;
    toastMessages({ type: "success", message: "Your are registerd" });
  } catch (error: any) {
    console.log(error.response);
    toastMessages({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc login DOCTOR
// @route POST baseUrl + public/doctor/login
// @access Public
export const loginAsDoctorApi = async (action: any) => {
  let res = null;
  const { email, password } = action.payload;
  try {
    const response = await axios.post(`${baseUrl}/public/doctor/login`, {
      email,
      password,
    });
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessages({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc register DOCTOR
// @route POST baseUrl + public/doctor/register
// @access Public
export const registerAsDoctorApi = async (action: any) => {
  let res = null;
  const { email, password } = action.payload;
  try {
    const response = await axios.post(`${baseUrl}/public/doctor/register`, {
      email,
      password,
    });
    res = response;
    toastMessages({ type: "success", message: "Your are registerd" });
  } catch (error: any) {
    console.log(error.response);
    toastMessages({ type: "error", message: error.response.data.message });
  }
  return res;
};
