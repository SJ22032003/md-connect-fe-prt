import { call, put } from "redux-saga/effects";
import * as actionTypes from "../actions";
import {
  updateNewChatWithDoctorApi,
  getPatientMessageListApi,
  getDoctorMessageListApi,
  getUserChatApi,
  acceptAppointmentApi,
} from "../network/apis/chatData.api";

interface IAction {
  type: string;
  payload: {};
  navigate?: (path?: string) => void;
  setLoading?: (bool: boolean) => void;
  fn?: () => void;
  setData?: (data: any) => void;
}

export function* updateNewChatWithDoctorSaga(
  action: IAction
): Generator<any, void, any> {
  try {
    const response = yield call(updateNewChatWithDoctorApi, action);
    if (response && response.status === 200) {
      action.navigate && action.navigate();
    }
    action.setLoading && action.setLoading(false);
  } catch (error: any) {
    console.log(error);
  }
}

export function* getPatientMessageListSaga(
  action: IAction
): Generator<any, void, any> {
  try {
    const response = yield call(getPatientMessageListApi, action);
    if (response && response.status === 200) {
      action.setData && action.setData(response.data.data.messageToDoctor);
    }
  } catch (error: any) {
    console.log(error);
  }
  action.setLoading && action.setLoading(false);
}

export function* getDoctorMessageListSaga(
  action: IAction
): Generator<any, void, any> {
  try {
    const response = yield call(getDoctorMessageListApi, action);
    if (response && response.status === 200) {
      action.setData && action.setData(response.data.data.messageToPatient);
    }
  } catch (error: any) {
    console.log(error);
  }
  action.setLoading && action.setLoading(false);
}

export function* getUserChatSaga(action: IAction): Generator<any, void, any> {
  try {
    const response = yield call(getUserChatApi, action);
    if (response && response.status === 200) {
      action.setData && action.setData(response.data.data);
    }
  } catch (error: any) {
    console.log(error);
  }
  action.setLoading && action.setLoading(false);
}

export function* acceptAppointmentSaga(
  action: IAction
): Generator<any, void, any> {
  try {
    const response = yield call(acceptAppointmentApi, action);
    if (response && response.status === 200) {
      action.fn && action.fn();
    }
  } catch (error: any) {
    console.log(error);
  }
  action.setLoading && action.setLoading(false);
}
