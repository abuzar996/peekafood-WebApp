import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { NotificationManager } from "../../components/common/react-notifications";
import {
  IMAGE_UPLOAD,
  EDIT_PINFO,
  ADD_RESTAURANT,
  GET_SAMPLE_CATEGORIES,
  ADD_ACCESS_INFO,
} from "../actions";
import {
  addAccessInfoSuccess,
  uploadImageSuccess,
  editPersonalInfoSuccess,
  addRestaurantInfoSuccess,
  addRestaurantInfoFailure,
  getSampleCategoriesSuccess,
  wizardFailure
} from "./actions";
import { BASE_URL } from "../../../src/API";





const addingAccessInfoAsync = async object =>
  await axios
    .post(`${BASE_URL}/api/restaurant-permissions/`, object, {
        headers: {
          Authorization: "token " + localStorage.getItem("tokenId"),
            "Content-Type":"application/json",
        }
    })
    .then(response => response)
    .catch(error => error);

function* addingAccessInfo(object) {
  try {
    const check = yield call(addingAccessInfoAsync, object.payload);
    if (check.status === 200 || check.status === 202) {
      yield put(addAccessInfoSuccess(check.data));

    } else {
      NotificationManager.error(
        check.error || check.detail,
        "Check Token or File format",
        3000,
        null,
        null
      );
      yield put(wizardFailure());
    }
  } catch (error) {
    console.log("upload error : ", error);
  }
}
export function* watchAddAccessinfo() {
  yield takeEvery(ADD_ACCESS_INFO, addingAccessInfo);
}






const uploadingImageAsync = async image =>
  await axios
    .post(`${BASE_URL}/api/user/profileimageupload/`, image, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
        "Content-Type": "multipart/form-data;"
      }
    })
    .then(response => response)
    .catch(error => error);

function* uploadingImage(image) {
  try {
    const check = yield call(uploadingImageAsync, image.payload);
    if (check.status === 200 || check.status === 202) {
      yield put(uploadImageSuccess(check.data));

    } else {
      NotificationManager.error(
        check.error || check.detail,
        "Check Token or File format",
        3000,
        null,
        null
      );
      yield put(wizardFailure());
    }
  } catch (error) {
    console.log("upload error : ", error);
  }
}
export function* watchImageUpload() {
  yield takeEvery(IMAGE_UPLOAD, uploadingImage);
}

const editpersonalInfoAsync = async Info =>
  await axios
    .post(`${BASE_URL}/api/user/profile/`, Info, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error);

function* editpersonalInfo(data) {
  try {
    const check = yield call(editpersonalInfoAsync, data.payload);

    if (check.status >= 200 && check.status < 300) {
      yield put(editPersonalInfoSuccess(check.data));
    } else {
      NotificationManager.error(
        "Some error occured",
        "Check Token or File format",
        3000,
        null,
        null
      );
      yield put(wizardFailure());
    }
  } catch (error) {
    console.log("upload error : ", error);
  }
}

export function* watchEditPersonalInfo() {
  yield takeEvery(EDIT_PINFO, editpersonalInfo);
}

const addFeedbackFieldsAsync = async fields =>
  await axios
    .post(`${BASE_URL}/api/feedbackattributes/`, fields, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response.data);

const addrestaurantinfoAsync = async Info =>
  await axios
    .post(`${BASE_URL}/api/restaurant/`, Info, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
        "Content-Type": "multipart/form-data"
      }
    })
    .then(response => response)
    .catch(error => error.response);

function* addrestaurantinfo(data) {
  try {
    const check = yield call(addrestaurantinfoAsync, data.payload);
    if (check.status >= 200 && check.status < 300) {
      yield put(addRestaurantInfoSuccess(check.data));
      let feedbackFields = {
        restaurant: check.data.id,
        taste: true,
        quality: true
      };
      yield call(
        addFeedbackFieldsAsync,
        feedbackFields
      );
      NotificationManager.success(
        "Restaurant Created",
        "Successfully",
        5000,
        null,
        null
      );
      localStorage.setItem("noRestaurant", "false");
    } else {
      localStorage.setItem("noRestaurant", "true");
      NotificationManager.error(
        "Some Error Occured: Try reloading the page",
        "Error",
        10000,
        null,
        null
      );
      yield put(addRestaurantInfoFailure());
    }
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchAddRestaurantInfo() {
  yield takeEvery(ADD_RESTAURANT, addrestaurantinfo);
}

const getSampleCategoriesAsync = async () =>
  await axios
    .get(`${BASE_URL}/api/samplecategory/`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response);

function* getSampleCategories() {
  try {
    const check = yield call(getSampleCategoriesAsync);
    if (check.status >= 200 && check.status < 300) {
      yield put(getSampleCategoriesSuccess(check.data));
    } else {
      NotificationManager.error(
        "Some Error Occured",
        "Error",
        10000,
        null,
        null
      );
      yield put(wizardFailure());
    }
  } catch (error) {
    console.log("Sample Categories", error);
  }
}

export function* watchGetSampleCategories() {
  yield takeEvery(GET_SAMPLE_CATEGORIES, getSampleCategories);
}

export default function* rootSaga() {
  yield all([
    fork(watchAddAccessinfo),
    fork(watchImageUpload),
    fork(watchEditPersonalInfo),
    fork(watchAddRestaurantInfo),
    fork(watchGetSampleCategories)
  ]);
}
