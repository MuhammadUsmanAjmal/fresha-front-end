import {
  APPOINTMENT_GRAPH_REQUEST,
  APPOINTMENT_GRAPH_SUCCESS,
  APPOINTMENT_GRAPH_FAILURE,
} from "../constants/appointmentGraphConstants";

export const appointmentGraphReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_GRAPH_REQUEST:
      return { loading: true };
    case APPOINTMENT_GRAPH_SUCCESS:
      return { loading: false, appointmentGraphDetails: action.payload };
    case APPOINTMENT_GRAPH_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
