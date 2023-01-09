import axios from "axios";
import { SERVER_IP } from "../../configs/env.js";

import {
  PRODCATEGORY_ADD_REQUEST,
  PRODCATEGORY_ADD_SUCCESS,
  PRODCATEGORY_ADD_FAIL,
  PRODCATEGORY_ADD_RESET,
  PRODCATEGORY_GET_REQUEST,
  PRODCATEGORY_GET_SUCCESS,
  PRODCATEGORY_GET_FAIL,
  PRODCATEGORY_GET_RESET,
  PRODCATEGORY_UPDATE_REQUEST,
  PRODCATEGORY_UPDATE_SUCCESS,
  PRODCATEGORY_UPDATE_FAIL,
  PRODCATEGORY_UPDATE_RESET,
} from "../constants/productCategoryConstants";

import jwtInterceptor from "./jwtInterceptor.js";
export const addProdCatAction = (prodCat) => async (dispatch) => {
  try {
    dispatch({
      type: PRODCATEGORY_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/prod_category/create`,
      prodCat
    );

    dispatch({
      type: PRODCATEGORY_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODCATEGORY_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getProdCatAction = (salonId) => async (dispatch) => {
  try {
    dispatch({
      type: PRODCATEGORY_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/prod_category/all/${salonId}`
    );

    dispatch({
      type: PRODCATEGORY_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODCATEGORY_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateProdCatAction = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: PRODCATEGORY_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/prod_category/update/${Id}`,
      Body
    );
    dispatch({
      type: PRODCATEGORY_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODCATEGORY_UPDATE_FAIL,
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
