import {
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_FAIL,
  CATEGORY_GET_REQUEST,
  CATEGORY_GET_SUCCESS,
  CATEGORY_GET_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,
  CATEGORY_RESET,
  CATEGORY_TOGGLE_REQUEST,
  CATEGORY_TOGGLE_SUCCESS,
  CATEGORY_TOGGLE_FAIL,
} from "../constants/categoryConstants.js";

export const addCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_ADD_REQUEST:
      return { loading: true };
    case CATEGORY_ADD_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_ADD_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_GET_REQUEST:
      return { loading: true };
    case CATEGORY_GET_SUCCESS:
      return { loading: false, categories: action.payload };
    case CATEGORY_GET_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const updateCatReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, updateCate: action.payload };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const updateToggleReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_TOGGLE_REQUEST:
      return { loading: true };
    case CATEGORY_TOGGLE_SUCCESS:
      return { loading: false, updateToggle: action.payload };
    case CATEGORY_TOGGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
