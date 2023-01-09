import {
  BOOKING_GET_REQUEST,
  BOOKING_GET_SUCCESS,
  BOOKING_GET_FAIL,
  BOOKING_GET_RESET,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
  BOOKING_CREATE_RESET,
} from "../constants/onlineBookingConstants";

export const getOnlineBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_GET_REQUEST:
      return { loading: true };
    case BOOKING_GET_SUCCESS:
      return { loading: false, onlineBookingDetail: action.payload };
    case BOOKING_GET_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_GET_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const createOnlineBookingReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOKING_CREATE_REQUEST:
      return { loading: true };
    case BOOKING_CREATE_SUCCESS:
      return { loading: false, createBookingDetail: action.payload };
    case BOOKING_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case BOOKING_CREATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
