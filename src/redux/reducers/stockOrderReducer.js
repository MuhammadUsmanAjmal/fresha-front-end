import {
  STOCK_ORDERS_ADD_REQUEST,
  STOCK_ORDERS_ADD_SUCCESS,
  STOCK_ORDERS_ADD_FAIL,
  STOCK_ORDERS_ADD_RESET,
  STOCK_ORDERS_GET_REQUEST,
  STOCK_ORDERS_GET_SUCCESS,
  STOCK_ORDERS_GET_FAIL,
  STOCK_ORDERS_GET_RESET,
  STOCK_ORDERS_UPDATE_REQUEST,
  STOCK_ORDERS_UPDATE_SUCCESS,
  STOCK_ORDERS_UPDATE_FAIL,
  STOCK_ORDERS_UPDATE_RESET,
} from "../constants/stockOrdersConstants";

export const addStockOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_ORDERS_ADD_REQUEST:
      return { loading: true };
    case STOCK_ORDERS_ADD_SUCCESS:
      return { loading: false, StockOrder: action.payload };
    case STOCK_ORDERS_ADD_FAIL:
      return { loading: false, error: action.payload };
    case STOCK_ORDERS_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const getStockOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_ORDERS_GET_REQUEST:
      return { loading: true };
    case STOCK_ORDERS_GET_SUCCESS:
      return { loading: false, StockOrder: action.payload };
    case STOCK_ORDERS_GET_FAIL:
      return { loading: false, error: action.payload };
    case STOCK_ORDERS_GET_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const updateStockOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case STOCK_ORDERS_UPDATE_REQUEST:
      return { loading: true };
    case STOCK_ORDERS_UPDATE_SUCCESS:
      return { loading: false, StockOrder: action.payload };
    case STOCK_ORDERS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STOCK_ORDERS_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};
