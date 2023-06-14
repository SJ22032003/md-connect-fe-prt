import { call, put } from "redux-saga/effects";
import * as actionTypes from "../actions";
import {
  loginAsPatientApi,
  loginAsDoctorApi,
  registerAsPatientApi,
  registerAsDoctorApi,
} from "../network/apis/signIn.api";

interface IAction {
  type: string;
  payload: {};
  navigate?: (path?: string) => void;
  setLoading?: (bool: boolean) => void;
}

export function* loginAsPatientSaga(
  action: IAction
): Generator<any, void, any> {
  try {
    const response = yield call(loginAsPatientApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.LOGIN_AS_PATIENT_SUCCESS,
        payload: response.data,
      });
      yield put({
        type: actionTypes.GET_PATIENT_DATA,
      });

      if (!response.data.onBoarded) {
        return action.navigate && action.navigate("/onboarding/patient");
      }
    }
    action.navigate && action.navigate();
    action.setLoading && action.setLoading(false);
  } catch (error: any) {
    console.log(error);
  }
}

export function* registerAsPatientSaga(
  action: IAction
): Generator<any, void, any> {
  try {
    const response = yield call(registerAsPatientApi, action);
    if (response && response.status === 201) {
      yield put({
        type: actionTypes.REGISTER_AS_PATIENT_SUCCESS,
        payload: response.data,
      });
      action.navigate && action.navigate();
    }
    action.setLoading && action.setLoading(false);
  } catch (error: any) {
    console.log(error);
  }
}

// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------

export function* loginAsDoctorSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(loginAsDoctorApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.LOGIN_AS_DOCTOR_SUCCESS,
        payload: response.data,
      });
      if (!response.data.onBoarded) {
        return action.navigate && action.navigate("/onboarding/doctor");
      }
      action.navigate && action.navigate();
    }
    action.setLoading && action.setLoading(false);
  } catch (error: any) {
    console.log(error);
  }
}

export function* registerAsDoctorSaga(
  action: IAction
): Generator<any, void, any> {
  try {
    const response = yield call(registerAsDoctorApi, action);
    if (response && response.status === 201) {
      yield put({
        type: actionTypes.REGISTER_AS_DOCTOR_SUCCESS,
        payload: response.data,
      });
      action.navigate && action.navigate();
    }
    action.setLoading && action.setLoading(false);
  } catch (error: any) {
    console.log(error);
  }
}
