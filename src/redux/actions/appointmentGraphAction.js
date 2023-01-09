import { SERVER_IP } from "../../configs/env";
import {
  APPOINTMENT_GRAPH_REQUEST,
  APPOINTMENT_GRAPH_SUCCESS,
  APPOINTMENT_GRAPH_FAILURE,
} from "../constants/appointmentGraphConstants";

import jwtInterceptor from "./jwtInterceptor";

export const getAppointmentGraphAction =
  (branchId, status) => async (dispatch) => {
    try {
      dispatch({
        type: APPOINTMENT_GRAPH_REQUEST,
        Accept: "application/json",
      });
      // debugger;
      const { data } = await jwtInterceptor.get(
        `${SERVER_IP}/api/v1/sale/graph/${branchId}?status=${status}`
      );
      // debugger;
      dispatch({
        type: APPOINTMENT_GRAPH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_GRAPH_FAILURE,
        payload: error.response && error.response.data.error,
      });
    }
  };
