import { call, put } from "redux-saga/effects";
import * as actionTypes from "../actions";
import { getPatientDoctorsExploreDataApi } from "../network/apis/commonData.api";

interface IAction {
  type: string;
  payload: {};
  navigate?: (path?: string) => void;
  setLoading?: () => void;
  fn?: () => void;
}

export function* getPatientDoctorsExploreDataSaga(
  action: IAction
): Generator<any, void, any> {
  try {
    const response = yield call(getPatientDoctorsExploreDataApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.GET_PATIENT_DOCTORS_EXPLORE_DATA_SUCCESS,
        payload: response.data.data,
      });
      action.setLoading && action.setLoading();
    }
  } catch (error: any) {
    console.log(error);
  }
}
