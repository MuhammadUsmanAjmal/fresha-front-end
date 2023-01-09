import {
  APPOINTMENT_ADD_REQUEST,
  APPOINTMENT_ADD_SUCCESS,
  APPOINTMENT_ADD_FAIL,
  APPOINTMENT_ADD_RESET,
  APPOINTMENT_GET_REQUEST,
  APPOINTMENT_GET_SUCCESS,
  APPOINTMENT_GET_FAIL,
  ORDER_GET_REQUEST,
  ORDER_GET_SUCCESS,
  ORDER_GET_FAIL,
  ALL_SALES_GET_REQUEST,
  ALL_SALES_GET_SUCCESS,
  ALL_SALES_GET_FAIL,
} from "../constants/appointmentConstants";

export const addAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_ADD_REQUEST:
      return { loading: true };
    case APPOINTMENT_ADD_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_ADD_FAIL:
      return { loading: false, error: action.payload };
    case APPOINTMENT_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const getAppointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_GET_REQUEST:
      return { loading: true };
    case APPOINTMENT_GET_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_GET_REQUEST:
      return { loading: true };
    case ORDER_GET_SUCCESS:
      return { loading: false, Order: action.payload };
    case ORDER_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const AllSalesReducer = (state = {}, action) => {
  switch (action.type) {
    case ALL_SALES_GET_REQUEST:
      return { loading: true };
    case ALL_SALES_GET_SUCCESS:
      return { loading: false, AllSales: action.payload };
    case ALL_SALES_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
