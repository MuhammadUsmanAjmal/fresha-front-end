import {
  SERVICES_ADD_REQUEST,
  SERVICES_ADD_SUCCESS,
  SERVICES_ADD_FAIL,
  SERVICES_RESET,
  SERVICES_GET_REQUEST,
  SERVICES_GET_SUCCESS,
  SERVICES_GET_FAIL,
  SERVICES_UPDATE_REQUEST,
  SERVICES_UPDATE_SUCCESS,
  SERVICES_UPDATE_FAIL,
  SERVICES_UPDATE_RESET,
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

export const addServicesReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICES_ADD_REQUEST:
      return { loading: true };
    case SERVICES_ADD_SUCCESS:
      return { loading: false, services: action.payload };
    case SERVICES_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SERVICES_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const getServicesReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICES_GET_REQUEST:
      return { loading: true };
    case SERVICES_GET_SUCCESS:
      return { loading: false, services: action.payload };
    case SERVICES_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICES_UPDATE_REQUEST:
      return { loading: true };
    case SERVICES_UPDATE_SUCCESS:
      return { loading: false, update: action.payload };
    case SERVICES_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SERVICES_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const serviceToggleReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICES_TOGGLE_REQUEST:
      return { loading: true };
    case SERVICES_TOGGLE_SUCCESS:
      return { loading: false, toggle: action.payload };
    case SERVICES_TOGGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchServiceReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICES_SEARCH_REQUEST:
      return { loading: true };
    case SERVICES_SEARCH_SUCCESS:
      return { loading: false, Service: action.payload };
    case SERVICES_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topServicesReducer = (state = {}, action) => {
  switch (action.type) {
    case TOP_SERVICES_REQUEST:
      return { loading: true };
    case TOP_SERVICES_SUCCESS:
      return { loading: false, topService: action.payload };
    case TOP_SERVICES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
