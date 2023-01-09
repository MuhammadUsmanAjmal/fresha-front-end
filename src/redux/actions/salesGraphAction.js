import { SERVER_IP } from "../../configs/env";
import {
  SALES_GRAPH_REQUEST,
  SALES_GRAPH_SUCCESS,
  SALES_GRAPH_FAILURE,
} from "../constants/salesGraphConstants";

import jwtInterceptor from "./jwtInterceptor";

export const getSalesGraphAction = (branchId, status) => async (dispatch) => {
  try {
    dispatch({
      type: SALES_GRAPH_REQUEST,
      Accept: "application/json",
    });
    // debugger;
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/sale/graph/${branchId}?status=${status}`
    );
    // debugger;
    dispatch({
      type: SALES_GRAPH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_GRAPH_FAILURE,
      payload: error.response && error.response.data.error,
    });
  }
};
