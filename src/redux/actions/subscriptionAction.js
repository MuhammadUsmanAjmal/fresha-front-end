import axios from "axios";
import { SERVER_IP } from "../../configs/env.js";
import {
  SUBSCRIPTION_ADD_REQUEST,
  SUBSCRIPTION_ADD_SUCCESS,
  SUBSCRIPTION_ADD_FAIL,
  SUBSCRIPTION_GET_REQUEST,
  SUBSCRIPTION_GET_SUCCESS,
  SUBSCRIPTION_GET_FAIL,
  SUBSCRIPTION_UPDATE_REQUEST,
  SUBSCRIPTION_UPDATE_SUCCESS,
  SUBSCRIPTION_UPDATE_FAIL,
  SUBSCRIPTION_TOGGLE_REQUEST,
  SUBSCRIPTION_TOGGLE_SUCCESS,
  SUBSCRIPTION_TOGGLE_FAIL,
  SUBSCRIPTION_TOGGLE_RESET,
  SALON_SUBSCRIPTION_GET_SUCCESS,
  SALON_SUBSCRIPTION_GET_FAIL,
  SALON_SUBSCRIPTION_GET_REQUEST,
  SALON_SUBSCRIPTION_ADD_REQUEST,
  SALON_SUBSCRIPTION_ADD_SUCCESS,
  SALON_SUBSCRIPTION_ADD_FAIL,
} from "../constants/subscriptionConstants.js";
import jwtInterceptor from "./jwtInterceptor.js";

export const addSubscription = (subscription) => async (dispatch) => {
  try {
    dispatch({
      type: SUBSCRIPTION_ADD_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.post(
      `${SERVER_IP}/api/v1/subscription/create`,
      subscription
    );

    dispatch({
      type: SUBSCRIPTION_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_ADD_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getSubscription = (isActive) => async (dispatch) => {
  if (isActive === undefined) {
    isActive = "";
  }
  try {
    dispatch({
      type: SUBSCRIPTION_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/subscription/all?isActive=${isActive}`
    );

    dispatch({
      type: SUBSCRIPTION_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const updateSubscriptionAction = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: SUBSCRIPTION_UPDATE_REQUEST,
      Accept: "application/json",
    });

    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/subscription/update/${Id}`,
      Body
    );
    dispatch({
      type: SUBSCRIPTION_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_UPDATE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const toggleSubscription = (Id, Body) => async (dispatch) => {
  try {
    dispatch({
      type: SUBSCRIPTION_TOGGLE_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.put(
      `${SERVER_IP}/api/v1/subscription/update/${Id}`,
      Body
    );
    dispatch({
      type: SUBSCRIPTION_TOGGLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIPTION_TOGGLE_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const getSalonSubscriptionList = (salonID) => async (dispatch) => {
  if (salonID === undefined) {
    salonID = "";
  }
  try {
    dispatch({
      type: SALON_SUBSCRIPTION_GET_REQUEST,
      Accept: "application/json",
    });
    const { data } = await jwtInterceptor.get(
      `${SERVER_IP}/api/v1/subscription/allsalonsub?salonId=${salonID}`
    );

    dispatch({
      type: SALON_SUBSCRIPTION_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SALON_SUBSCRIPTION_GET_FAIL,
      payload: error.response && error.response.data.error,
    });
  }
};

export const addSalonSubscriptionAction =
  (subscription) => async (dispatch) => {
    try {
      dispatch({
        type: SALON_SUBSCRIPTION_ADD_REQUEST,
        Accept: "application/json",
      });

      const { data } = await jwtInterceptor.post(
        `${SERVER_IP}/api/v1/subscription/add`,
        subscription
      );

      dispatch({
        type: SALON_SUBSCRIPTION_ADD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SALON_SUBSCRIPTION_ADD_FAIL,
        payload: error.response && error.response.data.error,
      });
    }
  };
