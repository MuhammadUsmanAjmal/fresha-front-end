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

export const addBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_ADD_REQUEST:
      return { loading: true };
    case BRAND_ADD_SUCCESS:
      return { loading: false, Brand: action.payload };
    case BRAND_ADD_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const getBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_GET_REQUEST:
      return { loading: true };
    case BRAND_GET_SUCCESS:
      return { loading: false, Brand: action.payload };
    case BRAND_GET_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_ADD_RESET:
      return { loading: false, error: false };
    default:
      return state;
  }
};

export const updateBrandReducer = (state = {}, action) => {
  switch (action.type) {
    case BRAND_UPDATE_REQUEST:
      return { loading: true };
    case BRAND_UPDATE_SUCCESS:
      return { loading: false, Brand: action.payload };
    case BRAND_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case BRAND_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

// export const clientToggleReducer = (state = {}, action) => {
//   switch (action.type) {
//     case CLIENTS_TOGGLE_REQUEST:
//       return { loading: true };
//     case CLIENTS_TOGGLE_SUCCESS:
//       return { loading: false, Clients: action.payload };
//     case CLIENTS_TOGGLE_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const searchClientsReducer = (state = {}, action) => {
//   switch (action.type) {
//     case CLIENTS_SEARCH_REQUEST:
//       return { loading: true };
//     case CLIENTS_SEARCH_SUCCESS:
//       return { loading: false, Clients: action.payload };
//     case CLIENTS_SEARCH_FAIL:
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// };
