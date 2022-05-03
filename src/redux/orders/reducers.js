import {
  GET_ORDERS,
  GET_ORDERS_INCOMING_SUCCESS,
  GET_ORDERS_ACTIVE_SUCCESS,
  EDIT_ORDER_STATUS,
  EDIT_ORDER_STATUS_SUCCESS,
  ORDER_FAILURE,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ACCEPT_ORDER_SUCCESS,
  DELETE_PICKEDUP_ORDER_SUCCESS,
  GET_ORDERS_HISTORY_SUCCESS,
  GET_ORDERS_FROM_CHANNEL,
  STOP_ORDERS_FROM_CHANNEL,
  ORDER_INCOMING_FROM_CHANNEL
} from "../actions";
const INIT_STATE = {
  incomingOrders: [],
  activeOrders: [],
  historyOrders: [],
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, loading: true };
    case GET_ORDERS_FROM_CHANNEL: 
      return {...state, loading: true, incomingOrders:[] };
    case STOP_ORDERS_FROM_CHANNEL: 
     return {...state, loading: false};
     case ORDER_INCOMING_FROM_CHANNEL:
       return {...state, loading: false, incomingOrders: state.incomingOrders.concat(action.payload)}
    case GET_ORDERS_INCOMING_SUCCESS:
      return { ...state, loading: false, incomingOrders: action.payload };
    case GET_ORDERS_HISTORY_SUCCESS:
      return { ...state, loading: false, historyOrders: action.payload };
    case GET_ORDERS_ACTIVE_SUCCESS:
      return { ...state, loading: false, activeOrders: action.payload };
    case EDIT_ORDER_STATUS:
      return { ...state, loading: true };
    case EDIT_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        activeOrders: [
          ...state.activeOrders.map(rest =>
            rest.id === action.payload.id
              ? {
                ...rest,
                order_status: action.payload.order_status,
                cart_items: action.payload.cart_items
              }
              : rest
          )
        ]
      };
    case DELETE_ORDER:
      return { ...state, loading: true };
    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        incomingOrders: [
          ...state.incomingOrders.filter(order => {
            return order.id !== action.payload.cart_id;
          })
        ]
      };
    case DELETE_ACCEPT_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        incomingOrders: [
          ...state.incomingOrders.filter(order => {
            return order.id !== action.payload.cart_id;
          })
        ]
      };
    case DELETE_PICKEDUP_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        activeOrders: [
          ...state.activeOrders.filter(order => {
            return order.id !== action.payload.cart_id;
          })
        ]
      };
    case ORDER_FAILURE:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};
