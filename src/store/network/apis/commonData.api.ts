import API from "./index";
import toastMessage from "../../../utils/toastMessages";
import { user_type } from "../../../constant/user";

// @desc get list of doctors for patient to explore
// @route GET /api/v1/user/patient/doctors
// @access Private (patient)
export const getPatientDoctorsExploreDataApi = async (action: any) => {
  let res = null;
  try {
    const response = await API.get("/user/patient/doctors?search=" + action.payload.search);
    res = response;
  } catch (error: any) {
    console.log(error.response);
    toastMessage({ type: "error", message: error.response.data.message });
  }
  return res;
};
