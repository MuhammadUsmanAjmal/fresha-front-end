import {
  PAYMENT_MODE_GET_REQUEST,
  PAYMENT_MODE_GET_SUCCESS,
  PAYMENT_MODE_GET_FAIL,
} from "../constants/paymentSelect";
export const paymentModeReducer = (state = {}, action) => {
  switch (action.type) {
    case PAYMENT_MODE_GET_REQUEST:
      return { loading: true };
    case PAYMENT_MODE_GET_SUCCESS:
      return { loading: false, payMode: action.payload };
    case PAYMENT_MODE_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
