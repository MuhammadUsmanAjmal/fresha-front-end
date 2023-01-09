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

export const addProdCatReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODCATEGORY_ADD_REQUEST:
      return { loading: true };
    case PRODCATEGORY_ADD_SUCCESS:
      return { loading: false, ProdCat: action.payload };
    case PRODCATEGORY_ADD_FAIL:
      return { loading: false, error: action.payload };
    case PRODCATEGORY_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const getProdCatReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODCATEGORY_GET_REQUEST:
      return { loading: true };
    case PRODCATEGORY_GET_SUCCESS:
      return { loading: false, ProdCat: action.payload };
    case PRODCATEGORY_GET_FAIL:
      return { loading: false, error: action.payload };
    case PRODCATEGORY_ADD_RESET:
      return { loading: false, error: false };
    default:
      return state;
  }
};

export const updateProdCatReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODCATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case PRODCATEGORY_UPDATE_SUCCESS:
      return { loading: false, ProdCat: action.payload };
    case PRODCATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODCATEGORY_UPDATE_RESET:
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
