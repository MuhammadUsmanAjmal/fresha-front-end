import axios from "axios";
import { SERVER_IP } from "../../configs/env.js";
import {
  SUPPLIER_ADD_REQUEST,
  SUPPLIER_ADD_SUCCESS,
  SUPPLIER_ADD_FAIL,
  SUPPLIER_ADD_RESET,
  SUPPLIER_GET_REQUEST,
  SUPPLIER_GET_SUCCESS,
  SUPPLIER_GET_FAIL,
  SUPPLIER_UPDATE_REQUEST,
  SUPPLIER_UPDATE_SUCCESS,
  SUPPLIER_UPDATE_FAIL,
  SUPPLIER_UPDATE_RESET,
} from "../constants/supplierConstants";

import jwtInterceptor from "./jwtInterceptor.js";
export const addSupplier = (supplier) => async (dispatch) => {
  try {
    dispatch({
      type: SUPPLIER_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/supplier/create`,
      supplier
    );

    dispatch({
      type: SUPPLIER_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUPPLIER_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getSupplier = (salonId) => async (dispatch) => {
  try {
    dispatch({
      type: SUPPLIER_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/supplier/all/${salonId}`
    );

    dispatch({
      type: SUPPLIER_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUPPLIER_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateSupplier = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: SUPPLIER_UPDATE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/supplier/update/${Id}`,
      Body
    );
    dispatch({
      type: SUPPLIER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUPPLIER_UPDATE_FAIL,
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
