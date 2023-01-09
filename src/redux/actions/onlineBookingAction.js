import { SERVER_IP } from "../../configs/env.js";
import {
  BOOKING_GET_REQUEST,
  BOOKING_GET_SUCCESS,
  BOOKING_GET_FAIL,
  BOOKING_CREATE_REQUEST,
  BOOKING_CREATE_SUCCESS,
  BOOKING_CREATE_FAIL,
} from "../constants/onlineBookingConstants";
import jwtInterceptor from "./jwtInterceptor.js";

export const getBookingAction =
  (branchId, userId, salonId) => async (dispatch) => {
    try {
      dispatch({
        type: BOOKING_GET_REQUEST,
        Accept: "application/json",
      });

      const { data } = await jwtInterceptor.get(
        `${SERVER_IP}/api/v1/online-booking/profile?branchId=${branchId}&userId=${userId}&salonId=${salonId}`
      );
      dispatch({
        type: BOOKING_GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOKING_GET_FAIL,
        payload: error.response && error.response.data.error,
      });
    }
  };

export const createBookingAction =
  (branchId, userId, salonId, Booking) => async (dispatch) => {
    try {
      dispatch({
        type: BOOKING_CREATE_REQUEST,
        Accept: "application/json",
      });

      const { data } = await jwtInterceptor.put(
        `${SERVER_IP}/api/v1/online-booking/profile?branchId=${branchId}&userId=${userId}&salonId=${salonId}`,
        Booking
      );

      dispatch({
        type: BOOKING_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BOOKING_CREATE_FAIL,
        payload: error.response && error.response.data.error,
      });
    }
  };
