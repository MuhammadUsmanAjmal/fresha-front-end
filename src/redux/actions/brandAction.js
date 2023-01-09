import axios from "axios";
import { SERVER_IP } from "../../configs/env.js";
import {
  BRAND_ADD_REQUEST,
  BRAND_ADD_SUCCESS,
  BRAND_ADD_FAIL,
  BRAND_ADD_RESET,
  BRAND_GET_REQUEST,
  BRAND_GET_SUCCESS,
  BRAND_GET_FAIL,
  BRAND_UPDATE_REQUEST,
  BRAND_UPDATE_SUCCESS,
  BRAND_UPDATE_FAIL,
  BRAND_UPDATE_RESET,
} from "../constants/brandConstants";

import jwtInterceptor from "./jwtInterceptor.js";
export const addBrand = (brand) => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/brand/create`,
      brand
    );

    dispatch({
      type: BRAND_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getBrand = (salonId) => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/brand/all/${salonId}`
    );

    dispatch({
      type: BRAND_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateBrandAction = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: BRAND_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/brand/update/${Id}`,
      Body
    );
    dispatch({
      type: BRAND_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRAND_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

// export const clientToggleAction = (Id, Body) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CLIENTS_TOGGLE_REQUEST,
//       Accept: "application/json",
//     });
//     const { data } = await jwtInterceptor.put(
//       `${SERVER_IP}/api/v1/client/update/${Id}`,
//       Body
//     );
//     dispatch({
//       type: CLIENTS_TOGGLE_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: CLIENTS_TOGGLE_FAIL,
//       payload: error.response && error.response.data.error,
//     });
//   }
// };

// export const searchClientsAction = (branchId, val) => async (dispatch) => {
//   try {
//     dispatch({
//       type: CLIENTS_SEARCH_REQUEST,
//       Accept: "application/json",
//     });
//     const { data } = await jwtInterceptor.get(
//       `${SERVER_IP}/api/v1/client/all/${branchId}?search=${val}`
//     );

//     dispatch({
//       type: CLIENTS_GET_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: CLIENTS_SEARCH_FAIL,
//       payload: error.response && error.response.data.error,
//     });
//   }
// };
