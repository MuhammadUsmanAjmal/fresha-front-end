import {
  SUBSCRIPTION_ADD_REQUEST,
  SUBSCRIPTION_ADD_SUCCESS,
  SUBSCRIPTION_ADD_FAIL,
  SUBSCRIPTION_ADD_RESET,
  SUBSCRIPTION_GET_REQUEST,
  SUBSCRIPTION_GET_SUCCESS,
  SUBSCRIPTION_GET_FAIL,
  SUBSCRIPTION_UPDATE_REQUEST,
  SUBSCRIPTION_UPDATE_SUCCESS,
  SUBSCRIPTION_UPDATE_FAIL,
  SUBSCRIPTION_UPDATE_RESET,
  SUBSCRIPTION_TOGGLE_REQUEST,
  SUBSCRIPTION_TOGGLE_SUCCESS,
  SUBSCRIPTION_TOGGLE_FAIL,
  SUBSCRIPTION_TOGGLE_RESET,
  SALON_SUBSCRIPTION_GET_SUCCESS,
  SALON_SUBSCRIPTION_GET_FAIL,
  SALON_SUBSCRIPTION_GET_REQUEST,
  SALON_SUBSCRIPTION_ADD_RESET,
  SALON_SUBSCRIPTION_ADD_FAIL,
  SALON_SUBSCRIPTION_ADD_SUCCESS,
  SALON_SUBSCRIPTION_ADD_REQUEST,
} from "../constants/subscriptionConstants.js";

export const addSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_ADD_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_ADD_SUCCESS:
      return { loading: false, subscription: action.payload };
    case SUBSCRIPTION_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIPTION_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const getSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_GET_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_GET_SUCCESS:
      return { loading: false, subscription: action.payload };
    case SUBSCRIPTION_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const updateSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_UPDATE_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_UPDATE_SUCCESS:
      return { loading: false, subscription: action.payload };
    case SUBSCRIPTION_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIPTION_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const toggleSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIPTION_TOGGLE_REQUEST:
      return { loading: true };
    case SUBSCRIPTION_TOGGLE_SUCCESS:
      return { loading: false, subscription: action.payload };
    case SUBSCRIPTION_TOGGLE_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIPTION_TOGGLE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const getSalonSubscriptionListReducer = (state = {}, action) => {
  switch (action.type) {
    case SALON_SUBSCRIPTION_GET_REQUEST:
      return { loading: true };
    case SALON_SUBSCRIPTION_GET_SUCCESS:
      return { loading: false, subscriptionList: action.payload };
    case SALON_SUBSCRIPTION_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addSalonSubscriptionReducer = (state = {}, action) => {
  switch (action.type) {
    case SALON_SUBSCRIPTION_ADD_REQUEST:
      return { loading: true };
    case SALON_SUBSCRIPTION_ADD_SUCCESS:
      return { loading: false, subscriptionSalons: action.payload };
    case SALON_SUBSCRIPTION_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SALON_SUBSCRIPTION_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
