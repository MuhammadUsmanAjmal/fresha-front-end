import { SERVER_IP } from "../../configs/env";
import {
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
} from "../constants/updateOrderConstants";
import jwtInterceptor from "./jwtInterceptor";
export const orderUpdateAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ORDER_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/order/update/${ID}`,
      Body
    );
    dispatch({
      type: UPDATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ORDER_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
