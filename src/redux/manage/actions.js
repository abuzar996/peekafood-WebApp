import {
  ADD_WAITER,
  ADD_WAITER_SUCCESS,
  GET_ALL_WAITERS,
  GET_ALL_WAITERS_SUCCESS,
  EDIT_WAITER,
  EDIT_WAITER_SUCCESS,
  DELETE_WAITER,
  DELETE_WAITER_SUCCESS,
  ADD_MANAGER,
  ADD_MANAGER_SUCCESS,
  EDIT_MANAGER,
  EDIT_MANAGER_SUCCESS,
  DELETE_MANAGER,
  DELETE_MANAGER_SUCCESS,
  GET_MANAGER,
  GET_MANAGER_SUCCESS,
  GET_FEEDBACK_FIELDS,
  GET_FEEDBACK_FIELDS_SUCCESS,
  ADD_FEEDBACK_FIELDS,
  ADD_FEEDBACK_FIELDS_SUCCESS,
  MANAGE_FAILURE
} from "../actions";

export const addWaiter = waiter => ({
  type: ADD_WAITER,
  payload: waiter
});
export const addWaiterSuccess = newWaiter => ({
  type: ADD_WAITER_SUCCESS,
  payload: newWaiter
});
export const editWaiter = waiter => ({
  type: EDIT_WAITER,
  payload: waiter
});
export const editWaiterSuccess = waiter => ({
  type: EDIT_WAITER_SUCCESS,
  payload: waiter
});
export const deleteWaiter = waiter_id => ({
  type: DELETE_WAITER,
  payload: waiter_id
});
export const deleteWaiterSuccess = waiter_id => ({
  type: DELETE_WAITER_SUCCESS,
  payload: waiter_id
});
export const getWaiter = branch_id => ({
  type: GET_ALL_WAITERS,
  payload: branch_id
});
export const getWaiterSuccess = waiters => ({
  type: GET_ALL_WAITERS_SUCCESS,
  payload: waiters
});
export const getManager = () => ({
  type: GET_MANAGER
});
export const getManagerSuccess = managers => ({
  type: GET_MANAGER_SUCCESS,
  payload: managers
});
export const addManager = manager => ({
  type: ADD_MANAGER,
  payload: manager
});
export const addManagerSuccess = manager => ({
  type: ADD_MANAGER_SUCCESS,
  payload: manager
});
export const editManager = manager => ({
  type: EDIT_MANAGER,
  payload: manager
});
export const editManagerSuccess = manager => ({
  type: EDIT_MANAGER_SUCCESS,
  payload: manager
});
export const deleteManager = manager_id => ({
  type: DELETE_MANAGER,
  payload: manager_id
});
export const deleteManagerSuccess = id => ({
  type: DELETE_MANAGER_SUCCESS,
  payload: id
});
export const getFields = restaurant_id => ({
  type: GET_FEEDBACK_FIELDS,
  payload: restaurant_id
});
export const getFieldsSuccess = object => ({
  type: GET_FEEDBACK_FIELDS_SUCCESS,
  payload: object
});
export const addFields = object => ({
  type: ADD_FEEDBACK_FIELDS,
  payload: object
});
export const addFieldsSuccess = object => ({
  type: ADD_FEEDBACK_FIELDS_SUCCESS,
  payload: object
});
export const manageFailure = () => ({
  type: MANAGE_FAILURE
});
