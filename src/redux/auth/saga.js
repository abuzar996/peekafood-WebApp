import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "axios";

import { NotificationManager } from "../../components/common/react-notifications";
import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER_PROFILE,
  LOGOUT_USER,
  FORGOT_PASSWORD,

  OTP_VERIFY,

  RESET_PASSWORD,

} from "../actions";
import {startStopNotificationChannel} from './notificationSaga'
import {
  loginUserSuccess,
  registerUserSuccess,
  getUserSuccess,
  auth_failure,
  logoutUserSuccess,
  forgotPasswordSuccess,
  resetPasswordSuccess,
  otpVeifySuccess,
} from "./actions";
import { BASE_URL } from "../../../src/API";
import _ from "lodash";

const loginWithEmailPasswordAsync = async (email, password) =>
  await axios
    .post(`${BASE_URL}/api/auth/login/`, {
      username: email,
      password: password
    })
    .then(response => response)
    .catch(error => error.response.data);

const loginWithEmailPasswordManagerAsync = async user => {

  return await axios
    .post(`${BASE_URL}/api/employee/auth/login/`, {
      username: user.username,
      password: user.password,
      account_string: user.account_string
    })
    .then(response => response)
    .catch(error => error.response.data);
};
function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {

    if (!_.isEmpty(payload.user.account_string)) {

      const loginUserManager = yield call(
        loginWithEmailPasswordManagerAsync,
        payload.user
      );
      if (loginUserManager.status === 200) {
        if (loginUserManager.data.user_group !== "RESTAURANT_WAITER" || loginUserManager.data.user_group !== "CUSTOMER") {
          localStorage.setItem("tokenId", loginUserManager.data.token);
          localStorage.setItem(
            "isBasic",
            loginUserManager.data.restaurant_info_flag
          );
          localStorage.setItem("role", loginUserManager.data.user_group);
          localStorage.setItem("loggedIn", true);
          yield put(loginUserSuccess(loginUserManager.data));
          NotificationManager.success(
            "You are logged in!",
            "Successfully",
            3000,
            null,
            null
          );
          history.push("/app");
        } else {
          NotificationManager.error(
            "Access Denied",
            "Check credentials, User not found",
            3000,
            null,
            null
          );
          yield put(auth_failure());
        }
      } else {
        NotificationManager.error(
          loginUserManager.error,
          "Check credentials, User not found",
          3000,
          null,
          null
        );
        yield put(auth_failure());
      }
    } else {
      const loginUser = yield call(
        loginWithEmailPasswordAsync,
        email,
        password
      );

      if (loginUser.status === 200) {
        if (loginUser.data.user_group !== "RESTAURANT_WAITER" || loginUser.data.user_group !== "CUSTOMER") {
          localStorage.setItem("tokenId", loginUser.data.token);
          localStorage.setItem("isBasic", loginUser.data.restaurant_info_flag);
          localStorage.setItem("role", loginUser.data.user_group);
          localStorage.setItem("loggedIn", true);
          yield put(loginUserSuccess(loginUser.data));
          NotificationManager.success(
            "You are logged in!",
            "Successfully",
            3000,
            null,
            null
          );
          history.push("/app");
        } else {
          NotificationManager.error(
            "Access Denied",
            "Check credentials, User not found",
            3000,
            null,
            null
          );
          yield put(auth_failure());
        }
      } else {
        NotificationManager.error(
          loginUser.error || loginUser.detail,
          "Check credentials",
          3000,
          null,
          null
        );
        yield put(auth_failure());
      }
    }
  } catch (error) {

    NotificationManager.error(
      "check internet connection",
      "Connectivity Issue",
      3000,
      null,
      null
    );
    yield put(auth_failure());
  }
}

const registerWithEmailPasswordAsync = async formData =>
  await axios
    .post(`${BASE_URL}/api/register/`, {
      email: formData.email,
      password: formData.password,
      first_name: formData.name
        .split(" ")
        .slice(0, -1)
        .join(" "),
      last_name: formData.name
        .split(" ")
        .slice(-1)
        .join(" "),
      role: "RESTAURANT_OWNER",
      username: formData.email
    })
    .then(response => response.data)
    .catch(error => {
      return error;
    });

function* registerWithEmailPassword({ payload }) {
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      payload.user
    );
    if (!registerUser.message) {
      yield put(registerUserSuccess(registerUser));
      NotificationManager.success(
        "Please Check Email and Verify Your Account",
        "Registered Successfully",
        5000,
        null,
        null
      );
      history.goBack();
    } else {
      NotificationManager.error(
        "User already exists",
        "Some error Occured",
        4000,
        null,
        null
      );
      yield put(auth_failure());
    }
  } catch (error) {

    NotificationManager.error(
      "check internet connection",
      "Connectivity Issue",
      3000,
      null,
      null
    );
    yield put(auth_failure());
  }
}

const logoutAsync = async history =>
  await axios
    .get(`${BASE_URL}/api/token/expire/`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId"),
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(response => response)
    .catch(error => error);

function* logout({ payload }) {
  const { history } = payload;
  try {
    const logoout = yield call(logoutAsync, history);
    if (logoout.status >= 200 && logoout.status < 300) {
      localStorage.setItem("loggedIn", false);
      localStorage.removeItem("tokenId");
      localStorage.removeItem("isBasic");
      localStorage.removeItem("role");
      window.location.reload();
      history.push("/user/login");
      yield put(logoutUserSuccess());
    } else {
      NotificationManager.error(
        "User token Expired",
        "Some error Occured",
        4000,
        null,
        null
      );
    }
  } catch (error) { }
}

const getUserProfileAsync = async () =>
  await axios
    .get(`${BASE_URL}/api/user/profile/`, {
      headers: {
        Authorization: "token " + localStorage.getItem("tokenId")
      }
    })
    .then(response => response)
    .catch(error => error.response);

function* getUserProfile() {
  try {
    const User = yield call(getUserProfileAsync);

    if (User.status === 200) {
      let usernew = {
        name: User.data.first_name.concat(" ", User.data.last_name),
        restaurant_info_flag: false,
        profile_image: User.data.profile_image,
        authorized: User.data.authorized,
        phone_number: User.data.phone_number,
        user_group: User.data.role
      };
      yield put(getUserSuccess(usernew));
    } else if (User.status === 401) {

      localStorage.setItem("loggedIn", false);
      localStorage.removeItem("tokenId");
      localStorage.removeItem("isBasic");
      localStorage.removeItem("role");
      window.location.reload();
      alert("User Session Expired");
      yield call("/user/login");
    }
    else {
      NotificationManager.error(
        "check internet connection",
        "Connectivity Issue",
        3000,
        null,
        null
      );
      yield put(auth_failure());
    }
  } catch (error) {

  }
}

export function* watchRegisterUser() {
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

export function* watchLogoutUser() {
  yield takeEvery(LOGOUT_USER, logout);
}
export function* watchGetUser() {
  yield takeEvery(GET_USER_PROFILE, getUserProfile);
}
const forgotPasswordAsync = async email =>
  await axios
    .post(`${BASE_URL}/api/forgot-password-otp/`, {
      email: email,
    })
    .then(response => response)
    .catch(error => error.response.data);

function* forgotPassword({ payload }) {
  try {
    const forgotPassword = yield call(
      forgotPasswordAsync,
      payload
    ); 
        if (forgotPassword.status > 200 || forgotPassword.status < 299) {
      yield put(forgotPasswordSuccess());
      NotificationManager.success(
        "Check Mail",
        "An email has been sent with OTP",
        5000,
        null,
        null
      );

    } else {
      NotificationManager.error(
        "Email not found",
        "There appears to be some issue",
        4000,
        null,
        null
      );
      yield put(auth_failure());
    }
  } catch (error) {

    NotificationManager.error(
      "check internet connection",
      "Connectivity Issue",
      3000,
      null,
      null
    );
    yield put(auth_failure());
  }
}

export function* watchForgotPassword() {
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}
const OTPVerifyAsync = async payload =>
  await axios
    .get(`${BASE_URL}/api/forgot-password-otp/`, {
      params: {
        email: payload.email,
        otp: payload.otp
      }
    })
    .then(response => response)
    .catch(error => error.response.data);

function* OTPVerify({ payload }) {
  try {
    const OTPVerify = yield call(
      OTPVerifyAsync,
      payload
    );
    if (OTPVerify.status > 200 || OTPVerify.status < 299) {
      yield put(otpVeifySuccess());
      NotificationManager.success(
        "",
        "Verified",
        5000,
        null,
        null
      );

    } else {
      NotificationManager.error(
        "Invalid OTP",
        "There appears to be some issue",
        4000,
        null,
        null
      );
      yield put(auth_failure());
    }
  } catch (error) {

    NotificationManager.error(
      "check internet connection",
      "Connectivity Issue",
      3000,
      null,
      null
    );
    yield put(auth_failure());
  }
}

export function* watchOTPVerify() {
  yield takeEvery(OTP_VERIFY, OTPVerify);
}

const resetPasswordAsync = async payload =>
  await axios
    .patch(`${BASE_URL}/api/forgot-password-otp/`, {
      email: payload.email,
      otp: payload.otp,
      new_password: payload.newPassword

    })
    .then(response => response)
    .catch(error => error.response.data);

function* resetPassword({ payload }) {
  const { history } = payload;
  try {
    const resetPassword = yield call(
      resetPasswordAsync,
      payload.object
    );
    if (resetPassword.status > 200 || resetPassword.status < 299) {

      yield put(resetPasswordSuccess());
      history.push("/")
      NotificationManager.success(
        "New Password set",
        "Password Changed",
        5000,
        null,
        null
      );

    } else {
      NotificationManager.error(
        "",
        "There appears to be some issue",
        4000,
        null,
        null
      );
      yield put(auth_failure());
    }
  } catch (error) {

    NotificationManager.error(
      "check internet connection",
      "Connectivity Issue",
      3000,
      null,
      null
    );
    yield put(auth_failure());
  }
}


export function* watchResetPassword() {
  yield takeEvery(RESET_PASSWORD, resetPassword);
}
export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchForgotPassword),
    fork(watchOTPVerify),
    fork(watchResetPassword),
    fork(watchGetUser),
    fork(watchRegisterUser),
    fork(startStopNotificationChannel)
  ]);
}
