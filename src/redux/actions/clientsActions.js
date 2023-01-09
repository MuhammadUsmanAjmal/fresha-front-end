import axios from "axios";
import { SERVER_IP } from "../../configs/env.js";
import {
  CLIENTS_ADD_REQUEST,
  CLIENTS_ADD_SUCCESS,
  CLIENTS_ADD_FAIL,
  CLIENTS_GET_REQUEST,
  CLIENTS_GET_SUCCESS,
  CLIENTS_GET_FAIL,
  CLIENTS_UPDATE_REQUEST,
  CLIENTS_UPDATE_SUCCESS,
  CLIENTS_UPDATE_FAIL,
  CLIENTS_SEARCH_REQUEST,
  CLIENTS_SEARCH_SUCCESS,
  CLIENTS_SEARCH_FAIL,
  CLIENTS_TOGGLE_REQUEST,
  CLIENTS_TOGGLE_SUCCESS,
  CLIENTS_TOGGLE_FAIL,
} from "../constants/clientsConstants";
import jwtInterceptor from "./jwtInterceptor.js";
export const addClients = (clients) => async (dispatch) => {
  try {
    dispatch({
      type: CLIENTS_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/client/create`,
      clients
    );

    dispatch({
      type: CLIENTS_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENTS_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getClients = (branchId, isActive) => async (dispatch) => {
  if (isActive === undefined) {
    isActive = "";
  }
  try {
    dispatch({
      type: CLIENTS_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/client/all/${branchId}?isActive=${isActive}`
    );

    dispatch({
      type: CLIENTS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENTS_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateClientsAction = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: CLIENTS_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/client/update/${Id}`,
      Body
    );
    dispatch({
      type: CLIENTS_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENTS_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const clientToggleAction = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: CLIENTS_TOGGLE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/client/update/${Id}`,
      Body
    );
    dispatch({
      type: CLIENTS_TOGGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENTS_TOGGLE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const searchClientsAction = (branchId, val) => async (dispatch) => {
  try {
    dispatch({
      type: CLIENTS_SEARCH_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/client/all/${branchId}?search=${val}`
    );

    dispatch({
      type: CLIENTS_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENTS_SEARCH_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
