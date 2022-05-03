import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest
} from "redux-saga/effects";
import axios from "axios";
import { NotificationManager } from "../../components/common/react-notifications";
import { GET_ORDERS, EDIT_ORDER_STATUS, DELETE_ORDER } from "../actions";
import {
  getOrdersIncomingSuccess,
  getOrdersActiveSuccess,
  editOrderStatusSuccess,
  deleteOrderSuccess,
  getOrdersHistorySuccess,
  deleteAcceptOrderSuccess,
  orderFailure
} from "./actions";
import {startStopChannel} from "./socketSaga"
import { BASE_URL } from "../../../src/API";

const getOrdersAsync = async object =>
  await axios
    .get(`${BASE_URL}/api/cart/manager`, {
      params: {
        branch_id: object.branch_id,
        order_status: object.status,
        section: object.section,
        order_type: object.order_type,
        start_date: object.start_date,
        end_date: object.end_date
      },
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response);
function* getOrders(object) {
  try {
    if (object.payload.status === "INCOMING") {
      const orders = yield call(getOrdersAsync, object.payload);
      if (orders.status === 200) {
        yield put(getOrdersIncomingSuccess(orders.data));
      } else if (orders.status === 401) {

        localStorage.setItem("loggedIn", false);
        localStorage.removeItem("tokenId");
        localStorage.removeItem("isBasic");
        localStorage.removeItem("role");
        window.location.reload();
        alert("User Session Expired");
        yield call("/user/login");
      } else {
        NotificationManager.error(
          orders.error || orders.detail,
          "Incoming Orders",
          4000,
          null,
          null
        );
        yield put(orderFailure());
      }
    } else if (object.payload.order_for === "HISTORY") {
      const orders = yield call(getOrdersAsync, object.payload);
      if (orders.status === 200) {
        yield put(getOrdersHistorySuccess(orders.data));
      } else if (orders.status === 401) {

        localStorage.setItem("loggedIn", false);
        localStorage.removeItem("tokenId");
        localStorage.removeItem("isBasic");
        localStorage.removeItem("role");
        window.location.reload();
        alert("User Session Expired");
        yield call("/user/login");
      } else {
        NotificationManager.error(
          orders.error || orders.detail,
          "Orders History",
          4000,
          null,
          null
        );
        yield put(orderFailure());
      }
    } else if (object.payload.status !== "INCOMING") {
      const orders = yield call(getOrdersAsync, object.payload);
      if (orders.status === 200) {
        yield put(getOrdersActiveSuccess(orders.data));
      } else if (orders.status === 401) {

        localStorage.setItem("loggedIn", false);
        localStorage.removeItem("tokenId");
        localStorage.removeItem("isBasic");
        localStorage.removeItem("role");
        window.location.reload();
        alert("User Session Expired");
        yield call("/user/login");
      } else {
        NotificationManager.error(
          orders.error || orders.detail,
          "Active Orders",
          4000,
          null,
          null
        );
        yield put(orderFailure());
      }
    }

  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchGetOrders() {
  yield takeEvery(GET_ORDERS, getOrders);
}

const editOrderAsync = async object => {

  return await axios
    .patch(`${BASE_URL}/api/cart/manager`, object, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response.data);
};

function* editOrder(object) {
  try {
    const orders = yield call(editOrderAsync, object.payload);
    if (orders.status === 200 || orders.status < 300) {
      if (orders.data.order_status === "SERVED" || orders.data.order_status === "PICKED_UP" || orders.data.order_status === "DELIVERED") {
        yield put(editOrderStatusSuccess(orders.data));
        //yield put(deletePickedUpOrderSuccess({ cart_id: orders.data.id }));
      }
      if (orders.data.order_status === "IN_PROGRESS") {
        yield put(editOrderStatusSuccess(orders.data));
        yield put(deleteAcceptOrderSuccess({ cart_id: orders.data.id }));
      }
      yield put(editOrderStatusSuccess(orders.data));
    } else {
      NotificationManager.error(
        orders.error || orders.detail,
        "Some Error Occured",
        4000,
        null,
        null
      );
      yield put(orderFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchEditOrders() {
  yield takeLatest(EDIT_ORDER_STATUS, editOrder);
}

const deleteOrderAsync = async object => {

  return await axios
    .delete(`${BASE_URL}/api/cart/manager`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      },
      data: object
    })
    .then(response => response)
    .catch(error => error.response.data);
};

function* deleteOrder(object) {
  try {
    const orders = yield call(deleteOrderAsync, object.payload);
    if (orders.status === 200 || orders.status < 300) {
      yield put(deleteOrderSuccess(object.payload));
    } else {
      NotificationManager.error(
        orders.error || orders.detail,
        "Some Error Occured",
        4000,
        null,
        null
      );
      yield put(orderFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchDeleteOrders() {
  yield takeLatest(DELETE_ORDER, deleteOrder);
}

export default function* rootSaga() {
  yield all([fork(watchGetOrders), fork(watchEditOrders), fork(watchDeleteOrders), fork(startStopChannel)]);
}
