import * as actionTypes from "../actions";
const initialState = {
  patientDoctorsExploreData: [],
};

const commonDataReducer = (state = initialState, action: any) => {
  let newState = { ...state };
  switch (action.type) {
    case actionTypes.GET_PATIENT_DOCTORS_EXPLORE_DATA_SUCCESS:
      newState = {
        ...state,
        patientDoctorsExploreData: action.payload,
      };
      break;
    default:
      return state;
  }
  return newState;
};

export default commonDataReducer;