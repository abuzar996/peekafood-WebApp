import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { NotificationManager } from "../../components/common/react-notifications";
import {
  ADD_SERVICES,
  GET_SERVICES,
  UPDATE_SERVICES,
} from "../actions";
import {
  addServicesSuccess,
  getServicesSuccess,
  updateServicesSuccess,
  ServiceFailiure
} from "./actions";
import { BASE_URL } from "../../../src/API";
const getServicesAsync = async () =>

  await axios
    .get(`${BASE_URL}/api/restaurant-permissions/`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
          "Content-Type":"application/json",
      }
  })
    .then(response => response)
    .catch(error => error);

function* getAllServices(object) {
  try {
    const check = yield call(getServicesAsync, object.payload);
    if (check.status === 200 || check.status === 202) {
      yield put(getServicesSuccess(check.data));

    } else {
      NotificationManager.error(
        check.error || check.detail,
        "Check Token or File format",
        3000,
        null,
        null
      );
      yield put(ServiceFailiure());
    }
  } catch (error) {
    console.log("upload error : ", error);
  }
}
export function* watchgetServices() {
  yield takeEvery(GET_SERVICES, getAllServices);
}


const addServicesAsync = async object =>

  await axios
  .post(`${BASE_URL}/api/restaurant-permissions/`, object, {
    headers: {
      Authorization: "token " + localStorage.getItem("tokenId"),
        "Content-Type":"application/json",
    }
   
  })
  .then(response => response)
  .catch(error => error.response.data);
function* addAllServices(object) {
  try {
    const check = yield call(addServicesAsync, object.payload);
    if (check.status === 200 ||check.status===201 || check.status === 202) {
      yield put(addServicesSuccess(check.data));

    } else {
      NotificationManager.error(
        check.error || check.detail,
        "Check Token or File format",
        3000,
        null,
        null
      );
      yield put(ServiceFailiure());
    }
  } catch (error) {
    console.log("upload error : ", error);
  }
}
export function* watchaddServices() {
  yield takeEvery(ADD_SERVICES, addAllServices);
}

const updateServicesAsync = async object =>

  await axios
    .patch(`${BASE_URL}/api/restaurant-permissions/`, object, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
        "Content-Type": "multipart/form-data;"
      }
    })
    .then(response => response)
    .catch(error => error);

function* updateAllServices(object) {
  try {
    const check = yield call(updateServicesAsync, object.payload);
    if (check.status === 200 || check.status === 202) {
      yield put(updateServicesSuccess(check.data));

    } else {
      NotificationManager.error(
        check.error || check.detail,
        "Check Token or File format",
        3000,
        null,
        null
      );
      yield put(ServiceFailiure());
    }
  } catch (error) {
    console.log("upload error : ", error);
  }
}
export function* watchupdateServices() {
  yield takeEvery(UPDATE_SERVICES, updateAllServices);
}


export default function* rootSaga() {
    yield all([
      fork(watchgetServices),
      fork(watchupdateServices),
      fork(watchaddServices),
    ]);
  }