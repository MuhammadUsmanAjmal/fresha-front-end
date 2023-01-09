import {
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_RESET,
} from "../constants/updateOrderConstants";
export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ORDER_REQUEST:
      return { loading: true };
    case UPDATE_ORDER_SUCCESS:
      return { loading: false, OrderUpdate: action.payload };
    case UPDATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_ORDER_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
