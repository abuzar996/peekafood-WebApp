import {
    all,
    call,
    fork,
    put,
    takeLatest
} from "redux-saga/effects";
import axios from "axios";
import { NotificationManager } from "../../components/common/react-notifications";
import { GET_INVENTORY, ADD_INVENTORY, EDIT_INVENTORY, DELETE_INVENTORY, CALCULATE_INVENTORY } from "../actions";
import {
    getInventorySuccess,
    addInventorySuccess,
    editInventorySuccess,
    deleteInventorySuccess,
    calculateInventorySuccess,
    inventoryFailure
} from "./actions";
import { BASE_URL } from "../../../src/API";
const getInventoryAsync = async obj =>
    await axios
        .get(`${BASE_URL}/api/v1/inventory/`, {
            params: obj,
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response);

function* getInventory(obj) {
    try {
        const inventory = yield call(getInventoryAsync, obj.payload);
        if (inventory.status === 200) {
            yield put(getInventorySuccess(inventory.data));
        } else if (inventory.status === 401) {

            localStorage.setItem("loggedIn", false);
            localStorage.removeItem("tokenId");
            localStorage.removeItem("isBasic");
            localStorage.removeItem("role");
            window.location.reload();
            alert("User Session Expired");
            yield call("/user/login");
        } else {

            yield put(inventoryFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchGetInventory() {
    yield takeLatest(GET_INVENTORY, getInventory);
}
const addInventoryAsync = async data =>
    await axios
        .post(`${BASE_URL}/api/v1/inventory_item/`, data, {

            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response);

function* addInventory(obj) {
    try {
        const inventory = yield call(addInventoryAsync, obj.payload);
        if (inventory.status > 199 && inventory.status < 300) {
            yield put(addInventorySuccess(inventory.data));
            NotificationManager.success(
                "New Item Added!",
                "Success",
                4000,
                null,
                null
            );
        } else if (inventory.status === 401) {

            localStorage.setItem("loggedIn", false);
            localStorage.removeItem("tokenId");
            localStorage.removeItem("isBasic");
            localStorage.removeItem("role");
            window.location.reload();
            alert("User Session Expired");
            yield call("/user/login");
        } else {

            yield put(inventoryFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchAddInventory() {
    yield takeLatest(ADD_INVENTORY, addInventory);
}
const editInventoryAsync = async data =>
    await axios
        .patch(`${BASE_URL}/api/v1/inventory_item/`, data, {

            headers: {
                Authorization: "token " + localStorage.getItem("tokenId")
            }
        })
        .then(response => response)
        .catch(error => error.response);

function* editInventory(obj) {
    try {
        const inventory = yield call(editInventoryAsync, obj.payload);
        if (inventory.status > 199 && inventory.status < 300) {
            yield put(editInventorySuccess(inventory.data));
            NotificationManager.success(
                "Inventory Updated!",
                "Success",
                4000,
                null,
                null
            );
        } else if (inventory.status === 401) {

            localStorage.setItem("loggedIn", false);
            localStorage.removeItem("tokenId");
            localStorage.removeItem("isBasic");
            localStorage.removeItem("role");
            window.location.reload();
            alert("User Session Expired");
            yield call("/user/login");
        } else {

            yield put(inventoryFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}

export function* watchEditInventory() {
    yield takeLatest(EDIT_INVENTORY, editInventory);
}

const deleteInventoryAsync = async data =>
    await axios
        .delete(`${BASE_URL}/api/v1/inventory_item/`, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "application/json"
            },
            data: {
                item_id: data
            }
        })
        .then(response => response)
        .catch(error => error.response);

function* deleteInventory(obj) {
    try {

        const inventory = yield call(deleteInventoryAsync, obj.payload);

        if (inventory.status > 199 && inventory.status < 300) {
            yield put(deleteInventorySuccess(obj.payload));
            NotificationManager.success(
                "Item Deleted!",
                "Success",
                4000,
                null,
                null
            );
        } else if (inventory.status === 401) {

            localStorage.setItem("loggedIn", false);
            localStorage.removeItem("tokenId");
            localStorage.removeItem("isBasic");
            localStorage.removeItem("role");
            window.location.reload();
            alert("User Session Expired");
            yield call("/user/login");
        } else {

            yield put(inventoryFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}



export function* watchDeleteInventory() {
    yield takeLatest(DELETE_INVENTORY, deleteInventory);
}
const calculateInventoryAsync = async data =>
    await axios
        .post(`${BASE_URL}/api/v1/inventory_estimates/`, data, {
            headers: {
                Authorization: "token " + localStorage.getItem("tokenId"),
                "Content-Type": "application/json"
            }
        })
        .then(response => response)
        .catch(error => error.response);
function* calculateInventory(obj) {
    try {

        const inventory = yield call(calculateInventoryAsync, obj.payload);
        if (inventory.status > 199 && inventory.status < 300) {
            yield put(calculateInventorySuccess(inventory.data));
            NotificationManager.success(
                "Inventory Estimated!",
                "Success",
                4000,
                null,
                null
            );
        } else if (inventory.status === 401) {

            localStorage.setItem("loggedIn", false);
            localStorage.removeItem("tokenId");
            localStorage.removeItem("isBasic");
            localStorage.removeItem("role");
            window.location.reload();
            alert("User Session Expired");
            yield call("/user/login");
        } else {

            yield put(inventoryFailure());
        }
    } catch (error) {
        console.log("error : ", error);
    }
}


export function* watchCalculateInventory() {
    yield takeLatest(CALCULATE_INVENTORY, calculateInventory)
}

export default function* rootSaga() {
    yield all([fork(watchGetInventory), fork(watchAddInventory), fork(watchEditInventory), fork(watchDeleteInventory), fork(watchCalculateInventory)]);
}