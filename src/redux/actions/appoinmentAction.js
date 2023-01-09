import axios from "axios";
import { SERVER_IP } from "../../configs/env";
import {
  APPOINTMENT_ADD_REQUEST,
  APPOINTMENT_ADD_SUCCESS,
  APPOINTMENT_ADD_FAIL,
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
import jwtInterceptor from "./jwtInterceptor";
export const addAppointmentAction = (order) => async (dispatch) => {
  try {
    dispatch({
      type: APPOINTMENT_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/order/create`,
      order
    );

    dispatch({
      type: APPOINTMENT_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getAppointmentAction =
  (branchId, BeauticianId, Status, search) => async (dispatch) => {
    if (BeauticianId === undefined) {
      BeauticianId = "";
    }
    if (Status === undefined) {
      Status = "";
    }
    if (search === undefined) {
      search = "";
    }
    try {
      dispatch({
        type: APPOINTMENT_GET_REQUEST,
        Accept: "application/json",
      });
      const { data } = await jwtInterceptor.get(
        `${SERVER_IP}/api/v1/order/all/${branchId}?status=${Status}&id=${BeauticianId}&search=${search}`
      );
      dispatch({
        type: APPOINTMENT_GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_GET_FAIL,
        payload: error.response && error.response.data.error,
      });
    }
  };

export const getOrdersAction = (orderID) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/order/${orderID}`
    );
    dispatch({
      type: ORDER_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getAllSalesAction = (ID, status) => async (dispatch) => {
  if (status === undefined) {
    status = "";
  }
  try {
    dispatch({
      type: ALL_SALES_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/order/all/${ID}?status=${status}`
    );
    dispatch({
      type: ALL_SALES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SALES_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
