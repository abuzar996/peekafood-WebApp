import {
  LOGIN_USER,
  AUTH_FAILURE,
  LOGIN_USER_SUCCESS,
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

const INIT_STATE = {
  user: {},
  loading: false,
  notificationLoading: false,
  notifications: [],
  otpShow: false,
  resetPassword: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS:
      return { ...state, notificationLoading: true, notifications: []};
    case GET_NOTIFICATIONS_SUCCESS:
      return {...state,notificationLoading: false, notifications: state.notifications.concat(action.payload)};
    case STOP_NOTIFICATIONS:
      return {...state, notificationLoading: false, notifications: []}
    case DELETE_NOTIFICATION:
      return {...state,  ...state,
        notificationLoading: false,
        notifications: [
          ...state.notifications.filter(order => {
            return order.id !== action.payload;
          })
        ]}
    case LOGIN_USER:
      return { ...state, loading: true, user: action.payload };
    case LOGIN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case AUTH_FAILURE:
      return { ...state, loading: false };
    case GET_USER_PROFILE:
      return { ...state, loading: true };
    case GET_USER_PROFILE_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case REGISTER_USER:
      return { ...state, loading: true };
    case REGISTER_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case FORGOT_PASSWORD:
      return { ...state, loading: true };
    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, otpShow: true }
    case OTP_VERIFY:
      return { ...state, loading: true };
    case OTP_VERIFY_SUCCESS:
      return { ...state, loading: false, resetPassword: true }
    case LOGOUT_USER:
      return { ...state, loading: true, user: null };
    case LOGOUT_USER_SUCCESS:
      return { ...state, loading: false };
    case RESET_PASSWORD:
      return { ...state, loading: true };
    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, otpShow: false, resetPassword: false };
    default:
      return { ...state };
  }
};
