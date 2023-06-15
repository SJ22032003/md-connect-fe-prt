import API from "./index";
import toastMessage from "../../../utils/toastMessages";
import { user_type } from "../../../constant/user";

// @desc get patient data
// @route GET /api/v1/user/patient/data
// @access Private
export const getPatientDataApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.get("/user/patient/data");
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
    localStorage.removeItem(user_type.PATIENT);
    return window.location.replace("/");
  }
  return res;
};

// @desc update patient data
// @route PATCH /api/v1/user/patient/data
// @access Private
export const updatePatientDataApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.patch("/user/patient/data", action.payload);
    res = response;
    toastMessage({
      type: "success",
      message: "Data updated successfully",
    });
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc update patient reports
// @route PATCH /api/v1/user/patient/reports
// @access Private
export const updatePatientReportsApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.patch("/user/patient/report", action.payload);
    res = response;
    toastMessage({
      type: "success",
      message: "Report added successfully",
    });
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc delete patient reports using report id in params
// @route DELETE /api/v1/user/patient/report/:reportId
// @access Private
export const deletePatientReportsApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.delete(
      `/user/patient/report/:${action.payload.id}`
    );
    res = response;
    toastMessage({
      type: "success",
      message: "Report deleted successfully",
    });
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};

export const getEmergencyAvailableDoctorsApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.get("/user/patient/doctors-available-on-emergency");
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
}

// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------

// @desc get doctor data
// @route GET /api/v1/user/doctor/data
// @access Private
export const getDoctorDataApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.get("/user/doctor/data");
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
    localStorage.removeItem(user_type.DOCTOR);
    return window.location.replace("/");
  }
  return res;
};

// @desc update doctor data
// @route PATCH /api/v1/user/doctor/data
// @access Private
export const updateDoctorDataApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.patch("/user/doctor/data", action.payload);
    res = response;
    toastMessage({
      type: "success",
      message: "Data updated successfully",
    });
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};
