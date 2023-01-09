import {
  SUPPLIER_ADD_REQUEST,
  SUPPLIER_ADD_SUCCESS,
  SUPPLIER_ADD_FAIL,
  SUPPLIER_ADD_RESET,
  SUPPLIER_GET_REQUEST,
  SUPPLIER_GET_SUCCESS,
  SUPPLIER_GET_FAIL,
  SUPPLIER_GET_RESET,
  SUPPLIER_UPDATE_REQUEST,
  SUPPLIER_UPDATE_SUCCESS,
  SUPPLIER_UPDATE_FAIL,
  SUPPLIER_UPDATE_RESET,
} from "../constants/supplierConstants";

export const addSupplierReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPLIER_ADD_REQUEST:
      return { loading: true };
    case SUPPLIER_ADD_SUCCESS:
      return { loading: false, Supplier: action.payload };
    case SUPPLIER_ADD_FAIL:
      return { loading: false, error: action.payload };
    case SUPPLIER_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
export const getSupplierReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPLIER_GET_REQUEST:
      return { loading: true };
    case SUPPLIER_GET_SUCCESS:
      return { loading: false, Supplier: action.payload };
    case SUPPLIER_GET_FAIL:
      return { loading: false, error: action.payload };
    case SUPPLIER_GET_RESET:
      return { loading: false, error: false };
    default:
      return state;
  }
};

export const updateSupplierReducer = (state = {}, action) => {
  switch (action.type) {
    case SUPPLIER_UPDATE_REQUEST:
      return { loading: true };
    case SUPPLIER_UPDATE_SUCCESS:
      return { loading: false, Supplier: action.payload };
    case SUPPLIER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SUPPLIER_UPDATE_RESET:
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
