import { SERVER_IP } from "../../configs/env.js";
import {
  SALON_GET_REQUEST,
  SALON_GET_SUCCESS,
  SALON_GET_FAIL,
} from "../constants/saloonConstants.js";
import jwtInterceptor from "./jwtInterceptor.js";
export const getSalonAction = (phone) => async (dispatch) => {
  try {
    dispatch({
      type: SALON_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/salons/all?contact=${phone}`
    );
    dispatch({
      type: SALON_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALON_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
