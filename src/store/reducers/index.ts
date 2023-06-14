import { combineReducers } from "redux";
import userDataReducer from "./userData.reducer";
import commonDataReducer from "./commonData.reducer";

const rootReducer = combineReducers({
  userData: userDataReducer,
  commonData: commonDataReducer,
});

export default rootReducer;
