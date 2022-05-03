import {
  GET_ORDERS,
  GET_ORDERS_INCOMING_SUCCESS,
  GET_ORDERS_HISTORY_SUCCESS,
  GET_ORDERS_ACTIVE_SUCCESS,
  ORDER_FAILURE,
  EDIT_ORDER_STATUS,
  EDIT_ORDER_STATUS_SUCCESS,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ACCEPT_ORDER_SUCCESS,
  DELETE_PICKEDUP_ORDER_SUCCESS,
  GET_ORDERS_FROM_CHANNEL,
  STOP_ORDERS_FROM_CHANNEL,
  ORDER_INCOMING_FROM_CHANNEL
} from "../actions";
export const getOrdersChannel = object => ({
  type: GET_ORDERS_FROM_CHANNEL,
  payload: object
});
export const stopOrdersChannel = object => ({
  type: STOP_ORDERS_FROM_CHANNEL,
  payload: object
});
export const orderIncomingSuccessFromChannel = object => ({
  type: ORDER_INCOMING_FROM_CHANNEL,
  payload: object
})
export const getOrders = object => ({
  type: GET_ORDERS,
  payload: object
});
export const getOrdersIncomingSuccess = object => ({
  type: GET_ORDERS_INCOMING_SUCCESS,
  payload: object
});
export const getOrdersHistorySuccess = object => ({
  type: GET_ORDERS_HISTORY_SUCCESS,
  payload: object
});
export const getOrdersActiveSuccess = object => ({
  type: GET_ORDERS_ACTIVE_SUCCESS,
  payload: object
});
export const editOrderStatus = object => ({
  type: EDIT_ORDER_STATUS,
  payload: object
});
export const editOrderStatusSuccess = object => ({
  type: EDIT_ORDER_STATUS_SUCCESS,
  payload: object
});
export const deleteOrder = (object) => ({
  type: DELETE_ORDER,
  payload: object
});
export const deleteOrderSuccess = (object) => ({
  type: DELETE_ORDER_SUCCESS,
  payload: object
});
export const deleteAcceptOrderSuccess = (object) => ({
  type: DELETE_ACCEPT_ORDER_SUCCESS,
  payload: object
});
export const deletePickedUpOrderSuccess = (object) => ({
  type: DELETE_PICKEDUP_ORDER_SUCCESS,
  payload: object
})
export const orderFailure = () => ({
  type: ORDER_FAILURE
});
