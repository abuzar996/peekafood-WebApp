import {
  ADD_WAITER,
  ADD_WAITER_SUCCESS,
  GET_ALL_WAITERS,
  GET_ALL_WAITERS_SUCCESS,
  EDIT_WAITER,
  EDIT_WAITER_SUCCESS,
  DELETE_WAITER,
  DELETE_WAITER_SUCCESS,
  GET_MANAGER,
  GET_MANAGER_SUCCESS,
  ADD_MANAGER,
  ADD_MANAGER_SUCCESS,
  GET_FEEDBACK_FIELDS,
  GET_FEEDBACK_FIELDS_SUCCESS,
  ADD_FEEDBACK_FIELDS,
  ADD_FEEDBACK_FIELDS_SUCCESS,
  EDIT_MANAGER,
  EDIT_MANAGER_SUCCESS,
  DELETE_MANAGER,
  DELETE_MANAGER_SUCCESS,
  MANAGE_FAILURE
} from "../actions";
const INIT_STATE = {
  waiters: [],
  managers: [],
  feedbackFields: {},
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ALL_WAITERS:
      return { ...state, loading: true, waiters: [] };
    case GET_ALL_WAITERS_SUCCESS:
      return { ...state, loading: true, waiters: action.payload };
    case EDIT_WAITER:
      return { ...state, loading: true };
    case EDIT_WAITER_SUCCESS:
      return {
        ...state,
        loading: false,
        waiters: [
          ...state.waiters.map(waiter =>
            waiter.id === action.payload.id
              ? {
                  ...waiter,
                  first_name: action.payload.first_name,
                  last_name: action.payload.last_name,
                  phone_number: action.payload.phone_number,
                  activated: action.payload.activated,
                  username: action.payload.username,
                  id: action.payload.id
                }
              : waiter
          )
        ]
      };
    case DELETE_WAITER:
      return { ...state, loading: true };
    case DELETE_WAITER_SUCCESS:
      return {
        ...state,
        loading: false,
        waiters: [
          ...state.waiters.filter(waiter => {
            return waiter.id !== action.payload;
          })
        ]
      };
    case ADD_WAITER:
      return { ...state, loading: true };
    case ADD_WAITER_SUCCESS:
      return {
        ...state,
        loading: false,
        waiters: [...state.waiters, action.payload]
      };
    case GET_MANAGER:
      return { ...state, loading: true, managers: [] };
    case GET_MANAGER_SUCCESS:
      return { ...state, loading: false, managers: action.payload };
    case ADD_MANAGER:
      return { ...state, loading: true };
    case ADD_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        managers: [...state.managers, action.payload]
      };
    case EDIT_MANAGER:
      return { ...state, loading: true };
    case EDIT_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        managers: [
          ...state.managers.map(manager =>
            manager.id === action.payload.id
              ? {
                  
                  ...manager,
                  first_name: action.payload.first_name,
                  last_name: action.payload.last_name,
                  phone_number: action.payload.phone_number,
                  activated: action.payload.activated,
                  username: action.payload.username,
                  profile_image: action.payload.profile_image,
                  contact_email: action.payload.contact_email,
                  id: action.payload.id,
                  branch_name: action.payload.branch_name
                }
              : manager
          )
        ]
      };
    case DELETE_MANAGER:
      return { ...state, loading: true };
    case DELETE_MANAGER_SUCCESS:
      return {
        ...state,
        loading: false,
        managers: [
          ...state.managers.filter(manager => {
            return manager.id !== action.payload;
          })
        ]
      };
    case GET_FEEDBACK_FIELDS:
      return { ...state, loading: true, feedbackFields: {} };
    case GET_FEEDBACK_FIELDS_SUCCESS:
      return { ...state, loading: false, feedbackFields: action.payload };
    case ADD_FEEDBACK_FIELDS:
      return { ...state, loading: true };
    case ADD_FEEDBACK_FIELDS_SUCCESS:
      return { ...state, loading: false, feedbackFields: action.payload };
    case MANAGE_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
