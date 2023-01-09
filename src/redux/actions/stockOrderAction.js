import axios from "axios";
import { SERVER_IP } from "../../configs/env.js";

import {
  STOCK_ORDERS_ADD_REQUEST,
  STOCK_ORDERS_ADD_SUCCESS,
  STOCK_ORDERS_ADD_FAIL,
  STOCK_ORDERS_ADD_RESET,
  STOCK_ORDERS_GET_REQUEST,
  STOCK_ORDERS_GET_SUCCESS,
  STOCK_ORDERS_GET_FAIL,
  STOCK_ORDERS_UPDATE_REQUEST,
  STOCK_ORDERS_UPDATE_SUCCESS,
  STOCK_ORDERS_UPDATE_FAIL,
} from "../constants/stockOrdersConstants";

import jwtInterceptor from "./jwtInterceptor";
export const addStockOrder = (stockOrder) => async (dispatch) => {
  try {
    dispatch({
      type: STOCK_ORDERS_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/stockorder/create`,
      stockOrder
    );
    dispatch({
      type: STOCK_ORDERS_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_ORDERS_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getStockOrder = (salonId, branchId) => async (dispatch) => {
  if (salonId === undefined) {
    salonId === "";
  }
  if (branchId === undefined) {
    branchId === "";
  }
  try {
    dispatch({
      type: STOCK_ORDERS_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/stockorder/all/${salonId}?branchId=${branchId}`
    );
    dispatch({
      type: STOCK_ORDERS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_ORDERS_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateStockOrder = (stockOrder) => async (dispatch) => {
  try {
    dispatch({
      type: STOCK_ORDERS_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/stockorder/update`,
      stockOrder
    );
    dispatch({
      type: STOCK_ORDERS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STOCK_ORDERS_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
