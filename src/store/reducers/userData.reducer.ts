import * as actionTypes from "../actions";
const initialState = {
  patientInfo: JSON.parse(localStorage.getItem("patient") || "null"),
  doctorInfo: JSON.parse(localStorage.getItem("doctor") || "null"),
  adminInfo: JSON.parse(localStorage.getItem("admin") || "null"),
};

const userDataReducer = (state = initialState, action: any) => {
  let newState = { ...state };
  const { auth_token } = action.payload || {};
  switch (action.type) {
    case actionTypes.LOGIN_AS_PATIENT_SUCCESS:
      newState = {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          ...action.payload,
        },
      };
      localStorage.setItem("patient", JSON.stringify(newState.patientInfo));
      localStorage.setItem("user_type_as", "p");
      break;
    case actionTypes.REGISTER_AS_PATIENT_SUCCESS:
      newState = {
        ...state,
        patientInfo: {
          auth_token,
        },
      };
      localStorage.setItem("patient", JSON.stringify(newState.patientInfo));
      localStorage.setItem("user_type_as", "p");
      break;
    case actionTypes.GET_PATIENT_DATA_SUCCESS:
      newState = {
        ...state,
        patientInfo: {
          ...state.patientInfo,
          ...action.payload,
        },
      };
      localStorage.setItem("patient", JSON.stringify(newState.patientInfo));
      break;

    // --------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------------------

    case actionTypes.LOGIN_AS_DOCTOR_SUCCESS:
      newState = {
        ...state,
        doctorInfo: {
          ...state.doctorInfo,
          ...action.payload,
        },
      };
      localStorage.setItem("doctor", JSON.stringify(newState.doctorInfo));
      localStorage.setItem("user_type_as", "d");
      break;

    case actionTypes.REGISTER_AS_DOCTOR_SUCCESS:
      newState = {
        ...state,
        doctorInfo: {
          auth_token,
        },
      };
      localStorage.setItem("doctor", JSON.stringify(newState.doctorInfo));
      localStorage.setItem("user_type_as", "d");
      break;
    case actionTypes.GET_DOCTOR_DATA_SUCCESS:
      newState = {
        ...state,
        doctorInfo: {
          ...state.doctorInfo,
          ...action.payload,
        },
      };
      localStorage.setItem("doctor", JSON.stringify(newState.doctorInfo));
      break;
    default:
      return state;
  }
  return newState;
};

export default userDataReducer;
