import { SERVER_IP } from "../../configs/env";
import {
  PAYMENT_MODE_GET_REQUEST,
  PAYMENT_MODE_GET_SUCCESS,
  PAYMENT_MODE_GET_FAIL,
} from "../constants/paymentSelect";
import jwtInterceptor from "./jwtInterceptor";
export const paymentModeAction = (ID) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_MODE_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/paymentmode/all/${ID}`
    );
    dispatch({
      type: PAYMENT_MODE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_MODE_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
