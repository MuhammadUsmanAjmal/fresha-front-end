import { SERVER_IP } from "../../configs/env";
import {
  BRANCHES_LIST_GET_REQUEST,
  BRANCHES_LIST_GET_SUCCESS,
  BRANCHES_LIST_GET_FAIL,
  BRANCH_ACTIVE_GET_REQUEST,
  BRANCH_ACTIVE_GET_FAIL,
  BRANCH_ACTIVE_GET_SUCCESS,
  BRANCH_CREATE_REQUEST,
  BRANCH_CREATE_SUCCESS,
  BRANCH_CREATE_FAIL,
  BRANCHES_ACL_GET_REQUEST,
  BRANCHES_ACL_GET_SUCCESS,
  BRANCHES_ACL_GET_FAIL,
  BRANCH_IMAGE_REQUEST,
  BRANCH_IMAGE_SUCCESS,
  BRANCH_IMAGE_FAIL,
} from "../constants/branchConstants";
import jwtInterceptor from "./jwtInterceptor";
export const getBranchesAction = (salonId, Status) => async (dispatch) => {
  if (salonId === undefined) {
    salonId = "";
  }
  if (Status === undefined) {
    Status = "";
  }
  try {
    dispatch({
      type: BRANCHES_LIST_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/branch/${salonId}?isActive=${Status}`
    );
    dispatch({
      type: BRANCHES_LIST_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRANCHES_LIST_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getBranchesAclAction = (salonId, Status) => async (dispatch) => {
  if (salonId === undefined) {
    salonId = "";
  }
  if (Status === undefined) {
    Status = "";
  }
  try {
    dispatch({
      type: BRANCHES_ACL_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/branch/all/${salonId}?isActive=${Status}`
    );
    dispatch({
      type: BRANCHES_ACL_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRANCHES_ACL_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
export const getBranchStatusAction = (branchId, Status) => async (dispatch) => {
  if (branchId === undefined) {
    branchId = "";
  }
  if (Status === undefined) {
    Status = "";
  }
  try {
    dispatch({
      type: BRANCH_ACTIVE_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/branch/${branchId}?isActive=${Status}`
    );
    dispatch({
      type: BRANCH_ACTIVE_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRANCH_ACTIVE_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const createBranchAction = (salonId, Body) => async (dispatch) => {
  try {
    dispatch({
      type: BRANCH_CREATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/branch/create/${salonId}`,
      Body
    );
    dispatch({
      type: BRANCH_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRANCH_CREATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const addBranchImageAction = (ImageURL) => async (dispatch) => {
  try {
    dispatch({
      type: BRANCH_IMAGE_REQUEST,
    });
    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/image-upload/`,
      ImageURL
    );
    dispatch({
      type: BRANCH_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRANCH_IMAGE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};
