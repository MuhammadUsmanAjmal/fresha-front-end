import { SERVER_IP } from "../../configs/env";
import {
  SALES_DATA_REQUEST,
  SALES_DATA_SUCCESS,
  SALES_DATA_FAIL,
  SALES_HISTORY_REQUEST,
  SALES_HISTORY_SUCCESS,
  SALES_HISTORY_FAIL,
  APPOINTMENT_HISTORY_REQUEST,
  APPOINTMENT_HISTORY_SUCCESS,
  APPOINTMENT_HISTORY_FAIL,
} from "../constants/salesConstants";

import jwtInterceptor from "./jwtInterceptor";

export const getAllSalesAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: SALES_DATA_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/sale/new/${ID}`,
      Body
    );
    dispatch({
      type: SALES_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALES_DATA_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getAllSalesHistoryAction =
  (ID, from_date, to_date) => async (dispatch) => {
    try {
      dispatch({
        type: SALES_HISTORY_REQUEST,
        Accept: "application/json",
      });

      const { data } = await jwtInterceptor.get(
        `${SERVER_IP}/api/v1/sale/history/${ID}?report_date_from=${from_date}&report_date_to=${to_date}`
      );

      dispatch({
        type: SALES_HISTORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALES_HISTORY_FAIL,
        payload: error.response && error.response.data.error,
      });
    }
  };

export const getAllAppointmentHistoryAction =
  (ID, from_date, to_date, search) => async (dispatch) => {
    if (search === undefined) {
      search = "";
    }
    if (from_date === undefined) {
      from_date = "";
    }
    if (to_date === undefined) {
      to_date = "";
    }
    try {
      dispatch({
        type: APPOINTMENT_HISTORY_REQUEST,
        Accept: "application/json",
      });

      const { data } = await jwtInterceptor.get(
        `${SERVER_IP}/api/v1/sale/appointment/${ID}?report_date_from=${from_date}&report_date_to=${to_date}&search=${search}`
      );

      dispatch({
        type: APPOINTMENT_HISTORY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_HISTORY_FAIL,
        payload: error.response && error.response.data.error,
      });
    }
  };
