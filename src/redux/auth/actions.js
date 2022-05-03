import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  AUTH_FAILURE,
  GET_USER_PROFILE,
  GET_USER_PROFILE_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  OTP_VERIFY,
  OTP_VERIFY_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS,
  STOP_NOTIFICATIONS,
  DELETE_NOTIFICATION
} from "../actions";

export const getNotifications = () => ({
  type: GET_NOTIFICATIONS,
});
export const stopNotificationsChannel = () => ({
  type: STOP_NOTIFICATIONS
})
export const getNotificationsSuccess = (notification) => ({
  type: GET_NOTIFICATIONS_SUCCESS,
  payload: notification
});
export const deleteNotification = (id) => ({
type: DELETE_NOTIFICATION,
payload: id
})
export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history }
});
export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
});
export const getUser = () => ({
  type: GET_USER_PROFILE
});
export const auth_failure = () => ({
  type: AUTH_FAILURE
});
export const getUserSuccess = user => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: user
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history }
});
export const registerUserSuccess = user => ({
  type: REGISTER_USER_SUCCESS,
  payload: user
});
export const forgotPassword = (email) => ({
  type: FORGOT_PASSWORD,
  payload: email
});
export const forgotPasswordSuccess = () => ({
  type: FORGOT_PASSWORD_SUCCESS
});
export const otpVerify = (email, otp) => ({
  type: OTP_VERIFY,
  payload: { email, otp }
});
export const otpVeifySuccess = () => ({
  type: OTP_VERIFY_SUCCESS
})
export const resetPassword = (object, history) => ({
  type: RESET_PASSWORD,
  payload: { object, history }
})
export const resetPasswordSuccess = () => ({
  type: RESET_PASSWORD_SUCCESS,
})
export const logoutUser = history => ({
  type: LOGOUT_USER,
  payload: { history }
});

export const logoutUserSuccess = () => ({
  type: LOGOUT_USER_SUCCESS
});
