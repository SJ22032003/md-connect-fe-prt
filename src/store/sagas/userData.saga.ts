import { call, put } from "redux-saga/effects";
import * as actionTypes from "../actions";
import {
  getPatientDataApi,
  updatePatientDataApi,
  updatePatientReportsApi,
  deletePatientReportsApi,
  getDoctorDataApi,
  updateDoctorDataApi,
} from "../network/apis/userData.api";

export function* getPatientDataSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getPatientDataApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.GET_PATIENT_DATA_SUCCESS,
        payload: response.data.data,
      });
    }
    action.setLoading && action.setLoading(false);
  } catch (error: any) {
    console.log(error);
  }
}

export function* updatePatientDataSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(updatePatientDataApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.GET_PATIENT_DATA,
        payload: response.data.data,
      });
      action.navigate && action.navigate();
      action.setLoading && action.setLoading(false);
    }
  } catch (error: any) {
    console.log(error);
  }
}

export function* updatePatientReportsSaga(
  action: any
): Generator<any, void, any> {
  try {
    const response = yield call(updatePatientReportsApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.GET_PATIENT_DATA,
        payload: response.data.data,
      });
      action.navigate && action.navigate();
      action.setLoading && action.setLoading(false);
    }
  } catch (error: any) {
    console.log(error);
  }
}

export function* deletePatientReportsSaga(
  action: any
): Generator<any, void, any> {
  try {
    const response = yield call(deletePatientReportsApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.GET_PATIENT_DATA,
        payload: response.data.data,
      });
      action.navigate && action.navigate();
      action.fn && action.fn();
      action.setLoading && action.setLoading(false);
    }
  } catch (error: any) {
    console.log(error);
  }
}

// ---------------------------------------------------------
// ---------------------------------------------------------
// ---------------------------------------------------------

export function* getDoctorDataSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(getDoctorDataApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.GET_DOCTOR_DATA_SUCCESS,
        payload: response.data.data,
      });
    }
    action.setLoading && action.setLoading(false);
  } catch (error: any) {
    console.log(error);
  }
}

export function* updateDoctorDataSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(updateDoctorDataApi, action);
    if (response && response.status === 200) {
      yield put({
        type: actionTypes.GET_DOCTOR_DATA,
        payload: response.data.data,
      });
      action.navigate && action.navigate();
      action.setLoading && action.setLoading(false);
    }
  } catch (error: any) {
    console.log(error);
  }
}
