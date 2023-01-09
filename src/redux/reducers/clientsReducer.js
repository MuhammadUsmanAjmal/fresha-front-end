import {
  CLIENTS_ADD_REQUEST,
  CLIENTS_ADD_SUCCESS,
  CLIENTS_ADD_FAIL,
  CLIENTS_ADD_RESET,
  CLIENTS_GET_REQUEST,
  CLIENTS_GET_SUCCESS,
  CLIENTS_GET_FAIL,
  CLIENTS_UPDATE_REQUEST,
  CLIENTS_UPDATE_SUCCESS,
  CLIENTS_UPDATE_FAIL,
  CLIENTS_SEARCH_REQUEST,
  CLIENTS_SEARCH_SUCCESS,
  CLIENTS_SEARCH_FAIL,
  CLIENTS_UPDATE_RESET,
  CLIENTS_TOGGLE_REQUEST,
  CLIENTS_TOGGLE_SUCCESS,
  CLIENTS_TOGGLE_FAIL,
} from "../constants/clientsConstants.js";

export const addClientsReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENTS_ADD_REQUEST:
      return { loading: true };
    case CLIENTS_ADD_SUCCESS:
      return { loading: false, Clients: action.payload };
    case CLIENTS_ADD_FAIL:
      return { loading: false, error: action.payload };
    case CLIENTS_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const getClientsReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENTS_GET_REQUEST:
      return { loading: true };
    case CLIENTS_GET_SUCCESS:
      return { loading: false, Clients: action.payload };
    case CLIENTS_GET_FAIL:
      return { loading: false, error: action.payload };
    //   case CLIENTS_ADD_RESET:
    //     return { loading: false, error: false };
    default:
      return state;
  }
};
export const updateClientsReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENTS_UPDATE_REQUEST:
      return { loading: true };
    case CLIENTS_UPDATE_SUCCESS:
      return { loading: false, Clients: action.payload };
    case CLIENTS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CLIENTS_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const clientToggleReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENTS_TOGGLE_REQUEST:
      return { loading: true };
    case CLIENTS_TOGGLE_SUCCESS:
      return { loading: false, Clients: action.payload };
    case CLIENTS_TOGGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchClientsReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENTS_SEARCH_REQUEST:
      return { loading: true };
    case CLIENTS_SEARCH_SUCCESS:
      return { loading: false, Clients: action.payload };
    case CLIENTS_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
