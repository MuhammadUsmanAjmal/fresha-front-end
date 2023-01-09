import {
  PRODUCT_ADD_REQUEST,
  PRODUCT_ADD_SUCCESS,
  PRODUCT_ADD_FAIL,
  PRODUCT_ADD_RESET,
  PRODUCT_GET_REQUEST,
  PRODUCT_GET_SUCCESS,
  PRODUCT_GET_FAIL,
  PRODUCT_GET_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_IMAGE_REQUEST,
  PRODUCT_IMAGE_SUCCESS,
  PRODUCT_IMAGE_FAIL,
} from "../constants/productsConstants";

export const addProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADD_REQUEST:
      return { loading: true };
    case PRODUCT_ADD_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_ADD_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const getProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_GET_REQUEST:
      return { loading: true };
    case PRODUCT_GET_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_GET_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_GET_RESET:
      return { loading: false, error: false };
    default:
      return state;
  }
};

export const updateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
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

export const addProductImageReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_IMAGE_REQUEST:
      return { loading: true };
    case PRODUCT_IMAGE_SUCCESS:
      return { loading: false, ProdImage: action.payload };
    case PRODUCT_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
