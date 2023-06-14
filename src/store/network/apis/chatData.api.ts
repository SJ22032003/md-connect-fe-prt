import API from "./index";
import toastMessage from "../../../utils/toastMessages";

// @desc UPDATE PATIENT MESSAGE LIST TO ADD DOCTOR TO CHAT LIST
// @route PATCH /api/v1/user/patient/new-chat/:dId
// @access Private (patient)
export const updateNewChatWithDoctorApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.patch(
      "/user/patient/new-chat/:" + action.payload.dId
    );
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc get all the message list of patient
// @route GET /patient/doctor-message-list
// @access private
export const getPatientMessageListApi = async (action: any) => {
  let res = null;
  const search = action?.payload?.search || "";
  try {
    const response = await API.get(
      "/user/patient/doctor-message-list?search=" + search
    );
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc get all the message list from doctor of patient
// @route GET /user/chat/:roomId
// @access private
export const getUserChatApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.get("/user/chat/:" + action.payload.roomId);
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc get all the message list of doctor
// @route GET /doctor/patient-message-list
// @access private
export const getDoctorMessageListApi = async (action: any) => {
  let res = null;
  const search = action?.payload?.search || "";
  try {
    const response = await API.get(
      "/user/doctor/patient-message-list?search=" + search
    );
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};

// @desc accept appointment request from doctor
// @route PATCH /patient/accept-appointment/:dId
// @access private
export const acceptAppointmentApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.patch(
      "/user/patient/accept-appointment/:" + action.payload.dId,
      action.payload.data
    );
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};
