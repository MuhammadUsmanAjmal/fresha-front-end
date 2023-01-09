import {
  SALON_GET_REQUEST,
  SALON_GET_SUCCESS,
  SALON_GET_FAIL,
} from "../constants/saloonConstants.js";

export const getSalonReducer = (state = {}, action) => {
  switch (action.type) {
    case SALON_GET_REQUEST:
      return { loading: true };
    case SALON_GET_SUCCESS:
      return { loading: false, SalonsInfo: action.payload };
    case SALON_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
