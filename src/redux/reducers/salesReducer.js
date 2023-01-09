import {
  SALES_DATA_REQUEST,
  SALES_DATA_SUCCESS,
  SALES_DATA_FAIL,
  SALES_HISTORY_REQUEST,
  SALES_HISTORY_SUCCESS,
  SALES_HISTORY_FAIL,
  APPOINTMENT_HISTORY_FAIL,
  APPOINTMENT_HISTORY_REQUEST,
  APPOINTMENT_HISTORY_SUCCESS,
} from "../constants/salesConstants";

export const salesTableReducer = (state = {}, action) => {
  switch (action.type) {
    case SALES_DATA_REQUEST:
      return { loading: true };
    case SALES_DATA_SUCCESS:
      return { loading: false, SalesDetail: action.payload };
    case SALES_DATA_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const salesHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case SALES_HISTORY_REQUEST:
      return { loading: true };
    case SALES_HISTORY_SUCCESS:
      return { loading: false, sales: action.payload };
    case SALES_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentHistoryReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_HISTORY_REQUEST:
      return { loading: true };
    case APPOINTMENT_HISTORY_SUCCESS:
      return { loading: false, appointment: action.payload };
    case APPOINTMENT_HISTORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
