import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { NotificationManager } from "../../components/common/react-notifications";
import {
  ADD_WAITER,
  GET_ALL_WAITERS,
  EDIT_WAITER,
  DELETE_WAITER,
  GET_MANAGER,
  ADD_MANAGER,
  GET_FEEDBACK_FIELDS,
  ADD_FEEDBACK_FIELDS,
  EDIT_MANAGER,
  DELETE_MANAGER
} from "../actions";
import {
  addWaiterSuccess,
  getWaiterSuccess,
  editWaiterSuccess,
  deleteWaiterSuccess,
  getManagerSuccess,
  addManagerSuccess,
  getFieldsSuccess,
  addFieldsSuccess,
  editManagerSuccess,
  deleteManagerSuccess,
  manageFailure
} from "./actions";
import { BASE_URL } from "../../../src/API";

const getAllWaitersAsync = async branch_id =>
  await axios
    .get(`${BASE_URL}/api/branchwaiter/`, {
      params: {
        branch_id: branch_id
      },
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response);

function* getAllWaiters(branch) {
  try {
    const waiters = yield call(getAllWaitersAsync, branch.payload);
    if (waiters.status === 200) {
      yield put(getWaiterSuccess(waiters.data));
    } else if (waiters.status === 401) {

      localStorage.setItem("loggedIn", false);
      localStorage.removeItem("tokenId");
      localStorage.removeItem("isBasic");
      localStorage.removeItem("role");
      window.location.reload();
      alert("User Session Expired");
      yield call("/user/login");
    } else {
      // NotificationManager.error(
      //   waiters.error,
      //   "Waiters not found",
      //   3000,
      //   null,
      //   null
      // );
      yield put(manageFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}
export function* watchGetWaiters() {
  yield takeEvery(GET_ALL_WAITERS, getAllWaiters);
}

const addWaitersAsync = async waiter =>
  await axios
    .post(`${BASE_URL}/api/user/waiter/`, waiter, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response.data);

// const assignWaiterAsync = async waiter =>
//   await axios
//     .post(`${BASE_URL}/api/branchwaiter/`, waiter, {
//       headers: {
//         Authorization: "token " + localStorage.getItem("tokenId")
//       }
//     })
//     .then(response => response)
//     .catch(error => error.response.data);

function* addWaiters(waiter) {
  try {
    const waiters = yield call(addWaitersAsync, waiter.payload);
    if (waiters.status === 200 || waiters.status === 201) {
      // let object = {
      //   branch_id: waiter.payload.branch_id,
      //   username: waiters.data.username
      // };
      yield put(addWaiterSuccess(waiters.data));
      NotificationManager.success("Waiter Added", "Success", 3000, null, null);
      // const assignwaiter = yield call(assignWaiterAsync, object);
      // if (assignwaiter.status === 200 || assignwaiter.status === 201) {
      //   yield put(addWaiterSuccess(waiters.data));
      //   NotificationManager.success(
      //     "Success",
      //     "Waiter Added",
      //     3000,
      //     null,
      //     null
      //   );
    } else {
      NotificationManager.error("Server not Added", "Error", 4000, null, null);
      yield put(manageFailure());
    }
  } catch (error) {
    NotificationManager.error(
      "There Appears to be connectivity issue",
      "Connectivity Error",
      5000,
      null,
      null
    );
    console.log("login error : ", error);
  }
}
export function* watchAddWaiter() {
  yield takeEvery(ADD_WAITER, addWaiters);
}

const editWaiterAsync = async waiter =>
  await axios
    .patch(`${BASE_URL}/api/user/waiter/`, waiter, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response.data);
function* editWaiter(waiter) {
  try {
    const editedWaiter = yield call(editWaiterAsync, waiter.payload);
    if (editedWaiter.status === 200 || editedWaiter.status === 201) {
      yield put(editWaiterSuccess(editedWaiter.data));
    } else {
      NotificationManager.error(
        editedWaiter.error || editedWaiter.detail,
        "Server Edit Error",
        3000,
        null,
        null
      );
      yield put(manageFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchEditWaiter() {
  yield takeEvery(EDIT_WAITER, editWaiter);
}

const deleteWaiterAsync = async waiter_id => {
  return await axios
    .delete(`${BASE_URL}/api/user/waiter/`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      },
      data: {
        waiter_id: waiter_id
      }
    })
    .then(response => response)
    .catch(error => error.response.data);
};
function* deleteWaiter(waiter) {
  try {
    const deletedWaiter = yield call(deleteWaiterAsync, waiter.payload);
    if (deletedWaiter.status === 200 || deletedWaiter.status === 201) {
      NotificationManager.success(
        "Waiter Deleted",
        "Success",
        4000,
        null,
        null
      );
      yield put(deleteWaiterSuccess(waiter.payload));
    } else {
      NotificationManager.error(
        deletedWaiter.error || deletedWaiter.detail,
        "Branch Error",
        4000,
        null,
        null
      );
      yield put(manageFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchDeleteWaiter() {
  yield takeEvery(DELETE_WAITER, deleteWaiter);
}

const getAllManagersAsync = async () =>
  await axios
    .get(`${BASE_URL}/api/manager/`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response);

function* getAllManagers() {
  try {
    const managers = yield call(getAllManagersAsync);
    if (managers.status === 200 || managers.status === 201) {
      yield put(getManagerSuccess(managers.data));
    } else if (managers.status === 401) {

      localStorage.setItem("loggedIn", false);
      localStorage.removeItem("tokenId");
      localStorage.removeItem("isBasic");
      localStorage.removeItem("role");
      window.location.reload();
      alert("User Session Expired");
      yield call("/user/login");
    } else {
      yield put(manageFailure());
    }
  } catch (error) {
    console.log("login error : ", error);
  }
}
export function* watchGetManagers() {
  yield takeEvery(GET_MANAGER, getAllManagers);
}

const addManagerAsync = async manager =>
  await axios
    .post(`${BASE_URL}/api/manager/`, manager, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
        "Content-Type": "multipart/form-data;"
      }
    })
    .then(response => response)
    .catch(error => error.response.data);

function* addManager(manager) {
  try {
    const newmanager = yield call(addManagerAsync, manager.payload);
    console.log(newmanager.data);
    if (newmanager.status === 200 || newmanager.status === 201) {
      yield put(addManagerSuccess(newmanager.data));
      NotificationManager.success("Success", "Manager Added", 3000, null, null);
    } else {
      NotificationManager.error("User already exists", 2000, null, null);
      yield put(manageFailure());
    }
  } catch (error) {
    NotificationManager.error("Connectivity Error", 2000, null, null);
    console.log("login error : ", error);
  }
}
export function* watchAddManager() {
  yield takeEvery(ADD_MANAGER, addManager);
}

const addFeedbackFieldsAsync = async fields =>
  await axios
    .patch(`${BASE_URL}/api/feedbackattributes/`, fields, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response.data);

function* addFeedbackFields(object) {
  try {
    const newobject = yield call(addFeedbackFieldsAsync, object.payload);
    if (newobject.status === 200 || newobject.status === 201) {
      yield put(addFieldsSuccess(newobject.data));
      NotificationManager.success("Success", "Fields Added", 3000, null, null);
    } else {
      NotificationManager.error("Some Error occured", 2000, null, null);
      yield put(manageFailure());
    }
  } catch (error) {
    NotificationManager.error("Connectivity Error", 2000, null, null);
    console.log("login error : ", error);
  }
}
export function* watchAddFields() {
  yield takeEvery(ADD_FEEDBACK_FIELDS, addFeedbackFields);
}

const getFeedbackFieldsAsync = async id =>
  await axios
    .get(`${BASE_URL}/api/feedbackattributes/?restaurant_id=${id}`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      },
      data: {
        restaurant_id: id
      }
    })
    .then(response => response)
    .catch(error => error.response);

function* getFeedbackFields(object) {
  try {
    const fields = yield call(getFeedbackFieldsAsync, object.payload);
    if (fields.status === 200 || fields.status === 201) {
      yield put(getFieldsSuccess(fields.data));
    } else if (fields.status === 401) {

      localStorage.setItem("loggedIn", false);
      localStorage.removeItem("tokenId");
      localStorage.removeItem("isBasic");
      localStorage.removeItem("role");
      window.location.reload();
      alert("User Session Expired");
      yield call("/user/login");
    } else {
      NotificationManager.error(
        fields.error || fields.detail,
        "Error",
        3000,
        null,
        null
      );
      yield put(manageFailure());
    }
  } catch (error) {
    console.log("login error : ", error);
  }
}
export function* watchGetFields() {
  yield takeEvery(GET_FEEDBACK_FIELDS, getFeedbackFields);
}

const editManagerAsync = async manager =>
  await axios
    .patch(`${BASE_URL}/api/manager/`, manager, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
        "Content-Type": "multipart/form-data;"
      }
    })
    .then(response => response)
    .catch(error => error.response.data);
function* editManager(manager) {
  try {
    const editedManager = yield call(editManagerAsync, manager.payload);
    if (editedManager.status === 200 || editedManager.status === 201) {
      yield put(editManagerSuccess(editedManager.data));
      NotificationManager.success(
        "Manager Edited",
        "Success",
        4000,
        null,
        null
      );
    } else {
      NotificationManager.error(
        editedManager.error || editedManager.detail,
        "Manager Edit Error",
        3000,
        null,
        null
      );
      yield put(manageFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchEditManager() {
  yield takeEvery(EDIT_MANAGER, editManager);
}

const deleteManagerAsync = async manager_id => {
  return await axios
    .delete(`${BASE_URL}/api/manager/`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
        "Content-Type": "application/json"
      },
      data: {
        manager_id: manager_id
      }
    })
    .then(response => response)
    .catch(error => error.response.data)
    ;
};
function* deleteManager(manager) {
  try {
    const deletedManager = yield call(deleteManagerAsync, manager.payload);
    console.log(deletedManager);
    if (deletedManager.status === 200 || deletedManager.status === 201) {
      yield put(deleteManagerSuccess(manager.payload));
      NotificationManager.success(
        "Manager deleted",
        "Success",
        4000,
        null,
        null
      );
      
    } else {
      NotificationManager.error(
        deletedManager.error || deletedManager.detail,
        "Manager Delete Error",
        4000,
        null,
        null
      );
      yield put(manageFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchDeleteManager() {
  yield takeEvery(DELETE_MANAGER, deleteManager);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetWaiters),
    fork(watchAddWaiter),
    fork(watchDeleteWaiter),
    fork(watchEditWaiter),
    fork(watchGetManagers),
    fork(watchAddManager),
    fork(watchGetFields),
    fork(watchAddFields),
    fork(watchEditManager),
    fork(watchDeleteManager)
  ]);
}
