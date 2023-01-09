import { SERVER_IP } from "../../configs/env.js";
import {
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_FAIL,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  CATEGORY_GET_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_TOGGLE_REQUEST,
  CATEGORY_TOGGLE_SUCCESS,
  CATEGORY_TOGGLE_FAIL,
} from "../constants/categoryConstants.js";
import jwtInterceptor from "./jwtInterceptor.js";

export const addCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/category/create`,
      category
    );

    dispatch({
      type: CATEGORY_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getCategory = (branchId) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_GET_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/category/${branchId}`
    );

    dispatch({
      type: CATEGORY_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateCatAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/category/update/${ID}`,
      Body
    );
    dispatch({
      type: CATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateToggleAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_TOGGLE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/category/update/${ID}`,
      Body
    );
    dispatch({
      type: CATEGORY_TOGGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_TOGGLE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
