import axios from "axios";
import { SERVER_IP } from "../../configs/env.js";
import {
  STAFF_ADD_REQUEST,
  STAFF_ADD_SUCCESS,
  STAFF_ADD_FAIL,
  STAFF_GET_REQUEST,
  STAFF_GET_SUCCESS,
  STAFF_GET_FAIL,
  STAFF_UPDATE_REQUEST,
  STAFF_UPDATE_SUCCESS,
  STAFF_UPDATE_FAIL,
  STAFF_WORK_REQUEST,
  STAFF_WORK_SUCCESS,
  STAFF_WORK_FAIL,
  STAFF_HOURS_REQUEST,
  STAFF_HOURS_SUCCESS,
  STAFF_HOURS_FAIL,
  STAFF_SEARCH_REQUEST,
  STAFF_SEARCH_SUCCESS,
  STAFF_SEARCH_FAIL,
  STAFF_TOGGLE_REQUEST,
  STAFF_TOGGLE_SUCCESS,
  STAFF_TOGGLE_FAIL,
  STAFF_IMAGE_REQUEST,
  STAFF_IMAGE_SUCCESS,
  STAFF_IMAGE_FAIL,
  TOP_STAFF_REQUEST,
  TOP_STAFF_SUCCESS,
  TOP_STAFF_FAIL,
} from "../constants/staffConstants.js";
import jwtInterceptor from "./jwtInterceptor.js";
export const addStaff = (staff) => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_ADD_REQUEST,
      // Accept: "application/json",
    });
    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/beautician/create`,
      staff
    );
    dispatch({
      type: STAFF_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getStaff = (branchId, isActive) => async (dispatch) => {
  if (isActive === undefined) {
    isActive = "";
  }
  try {
    dispatch({
      type: STAFF_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/beautician/all/${branchId}?isActive=${isActive}`
    );
    dispatch({
      type: STAFF_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getStaffWorkAction = (branchId) => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_WORK_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      // `${SERVER_IP}/api/v1/beautician/working_services/${StaffWork}`
      `${SERVER_IP}/api/v1/beautician/working_services/all/${branchId}`
    );
    dispatch({
      type: STAFF_WORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_WORK_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateStaffAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_UPDATE_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/beautician/update/${ID}`,
      Body
    );

    dispatch({
      type: STAFF_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateHourAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_HOURS_REQUEST,
      Accept: "application/json",
    });
    // debugger;
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/beautician/working_days`,
      Body
    );

    dispatch({
      type: STAFF_HOURS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_HOURS_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const staffToggleAction = (ID, Body) => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_TOGGLE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/beautician/update/${ID}`,
      Body
    );
    dispatch({
      type: STAFF_TOGGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_TOGGLE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const searchStaffAction = (branchId, val) => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_SEARCH_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/beautician/all/${branchId}?search=${val}`
    );

    dispatch({
      type: STAFF_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_SEARCH_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const addStaffImageAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: STAFF_IMAGE_REQUEST,
      // Accept: "application/json",
    });
    // debugger;
    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/image-upload/`,
      formData
    );
    // debugger;
    dispatch({
      type: STAFF_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: STAFF_IMAGE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const topStaffAction = (branchId) => async (dispatch) => {
  try {
    dispatch({
      type: TOP_STAFF_REQUEST,
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/beautician/top/${branchId}`
    );
    dispatch({
      type: TOP_STAFF_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOP_STAFF_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
