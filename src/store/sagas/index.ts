import * as actionTypes from "../actions";
import { takeLatest } from "redux-saga/effects";
import {
  loginAsPatientSaga,
  loginAsDoctorSaga,
  registerAsPatientSaga,
  registerAsDoctorSaga,
} from "./signIn.saga";
import {
  getPatientDataSaga,
  updatePatientDataSaga,
  updatePatientReportsSaga,
  deletePatientReportsSaga,
  getDoctorDataSaga,
  updateDoctorDataSaga,
  getEmergencyAvailableDoctorsSaga,
} from "./userData.saga";
import { getPatientDoctorsExploreDataSaga } from "./commonData.saga";
import {
  updateNewChatWithDoctorSaga,
  getPatientMessageListSaga,
  getDoctorMessageListSaga,
  getUserChatSaga,
  acceptAppointmentSaga,
} from "./chatData.saga";

export default function* rootSaga() {
  yield takeLatest(actionTypes.GET_PATIENT_DATA, getPatientDataSaga);
  yield takeLatest(actionTypes.UPDATE_PATIENT_DATA, updatePatientDataSaga);

  yield takeLatest(actionTypes.LOGIN_AS_PATIENT, loginAsPatientSaga);
  yield takeLatest(actionTypes.REGISTER_AS_PATIENT, registerAsPatientSaga);

  yield takeLatest(
    actionTypes.UPDATE_PATIENT_REPORTS,
    updatePatientReportsSaga
  );
  yield takeLatest(
    actionTypes.DELETE_PATIENT_REPORTS,
    deletePatientReportsSaga
  );

  yield takeLatest(
    actionTypes.GET_PATIENT_DOCTORS_EXPLORE_DATA,
    getPatientDoctorsExploreDataSaga
  );

  yield takeLatest(
    actionTypes.UPDATE_NEW_CHAT_WITH_DOCTOR,
    updateNewChatWithDoctorSaga
  );

  yield takeLatest(
    actionTypes.GET_PATIENT_MESSAGE_LIST,
    getPatientMessageListSaga
  );

  yield takeLatest(
    actionTypes.GET_EMERGENCY_AVAILABLE_DOCTORS,
    getEmergencyAvailableDoctorsSaga
  );

  // -----------------------------
  // -----------------------------
  // ----------------------------

  yield takeLatest(actionTypes.LOGIN_AS_DOCTOR, loginAsDoctorSaga);
  yield takeLatest(actionTypes.REGISTER_AS_DOCTOR, registerAsDoctorSaga);

  yield takeLatest(actionTypes.GET_DOCTOR_DATA, getDoctorDataSaga);
  yield takeLatest(actionTypes.UPDATE_DOCTOR_DATA, updateDoctorDataSaga);

  yield takeLatest( actionTypes.GET_DOCTOR_MESSAGE_LIST, getDoctorMessageListSaga);

  // -----------------------------
  // -----------------------------
  // ----------------------------

  yield takeLatest(actionTypes.GET_USER_CHATS, getUserChatSaga);
  yield takeLatest(actionTypes.UPDATE_DOCTOR_PATIENT_APPOINTMENT, acceptAppointmentSaga)
}
