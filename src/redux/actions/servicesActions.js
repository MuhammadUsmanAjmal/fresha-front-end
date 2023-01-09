import { SERVER_IP } from "../../configs/env.js";
import {
  SERVICES_ADD_REQUEST,
  SERVICES_ADD_SUCCESS,
  SERVICES_ADD_FAIL,
  SERVICES_GET_REQUEST,
  SERVICES_GET_SUCCESS,
  SERVICES_GET_FAIL,
  SERVICES_UPDATE_REQUEST,
  SERVICES_UPDATE_SUCCESS,
  SERVICES_UPDATE_FAIL,
  SERVICES_SEARCH_REQUEST,
  SERVICES_SEARCH_SUCCESS,
  SERVICES_SEARCH_FAIL,
  SERVICES_TOGGLE_REQUEST,
  SERVICES_TOGGLE_SUCCESS,
  SERVICES_TOGGLE_FAIL,
  TOP_SERVICES_REQUEST,
  TOP_SERVICES_SUCCESS,
  TOP_SERVICES_FAIL,
} from "../constants/servicesConstants.js";
import jwtInterceptor from "./jwtInterceptor.js";
export const addServices = (services) => async (dispatch) => {
  try {
    dispatch({
      type: SERVICES_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/service/create`,
      services
    );
    dispatch({
      type: SERVICES_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERVICES_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getServices = (branchId, status, search) => async (dispatch) => {
  if (search === undefined) {
    search = "";
  }
  if (status === undefined) {
    status = "";
  }
  try {
    dispatch({
      type: SERVICES_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/service/${branchId}?search=${search}&isActive=${status}`
    );
    dispatch({
      type: SERVICES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERVICES_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateServiceAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: SERVICES_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/service/update/${ID}`,
      Body
    );
    dispatch({
      type: SERVICES_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERVICES_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const serviceToggleAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: SERVICES_TOGGLE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/service/update/${ID}`,
      Body
    );
    dispatch({
      type: SERVICES_TOGGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SERVICES_TOGGLE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const searchServicesAction =
  (branchId, status, search) => async (dispatch) => {
    if (search === undefined) {
      search = "";
    }
    if (status === undefined) {
      status = "";
    }
    try {
      dispatch({
        type: SERVICES_SEARCH_REQUEST,
        Accept: "application/json",
      });
      const { data } = await jwtInterceptor.get(
        `${SERVER_IP}/api/v1/service/${branchId}?search=${search}&isActive=${status}`
      );
      dispatch({
        type: SERVICES_GET_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SERVICES_SEARCH_FAIL,
        payload: error.response && error.response.data.error,
      });
    }
  };

export const topServicesAction = (branchId) => async (dispatch) => {
  try {
    dispatch({
      type: TOP_SERVICES_REQUEST,
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/service/top/${branchId}`
    );
    dispatch({
      type: TOP_SERVICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOP_SERVICES_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
