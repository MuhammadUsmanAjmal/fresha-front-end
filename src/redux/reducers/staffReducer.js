import {
  STAFF_ADD_REQUEST,
  STAFF_ADD_SUCCESS,
  STAFF_ADD_FAIL,
  STAFF_ADD_RESET,
  STAFF_GET_REQUEST,
  STAFF_GET_SUCCESS,
  STAFF_GET_FAIL,
  STAFF_UPDATE_REQUEST,
  STAFF_UPDATE_SUCCESS,
  STAFF_UPDATE_FAIL,
  STAFF_UPDATE_RESET,
  STAFF_WORK_REQUEST,
  STAFF_WORK_SUCCESS,
  STAFF_WORK_FAIL,
  STAFF_WORK_RESET,
  STAFF_HOURS_REQUEST,
  STAFF_HOURS_SUCCESS,
  STAFF_HOURS_FAIL,
  STAFF_HOURS_RESET,
  STAFF_SEARCH_REQUEST,
  STAFF_SEARCH_SUCCESS,
  STAFF_SEARCH_FAIL,
  STAFF_TOGGLE_REQUEST,
  STAFF_TOGGLE_SUCCESS,
  STAFF_TOGGLE_FAIL,
  STAFF_IMAGE_REQUEST,
  STAFF_IMAGE_SUCCESS,
  STAFF_IMAGE_FAIL,
  TOP_STAFF_REQUEST,
  TOP_STAFF_SUCCESS,
  TOP_STAFF_FAIL,
} from "../constants/staffConstants.js";

export const addStaffReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_ADD_REQUEST:
      return { loading: true };
    case STAFF_ADD_SUCCESS:
      return { loading: false, Staff: action.payload };
    case STAFF_ADD_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_ADD_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const getStaffReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_GET_REQUEST:
      return { loading: true };
    case STAFF_GET_SUCCESS:
      return { loading: false, Staff: action.payload };
    case STAFF_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getStaffWorkReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_WORK_REQUEST:
      return { loading: true };
    case STAFF_WORK_SUCCESS:
      return { loading: false, Staff: action.payload };
    case STAFF_WORK_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_WORK_RESET:
      return { loading: false, error: false, success: false };
    default:
      return state;
  }
};

export const updateStaffReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_UPDATE_REQUEST:
      return { loading: true };
    case STAFF_UPDATE_SUCCESS:
      return { loading: false, Staff: action.payload };
    case STAFF_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_UPDATE_RESET:
      return { loading: false, success: false, error: false };
    default:
      return state;
  }
};

export const updateHoursReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_HOURS_REQUEST:
      return { loading: true };
    case STAFF_UPDATE_SUCCESS:
      return { loading: false, Staff: action.payload };
    case STAFF_HOURS_FAIL:
      return { loading: false, error: action.payload };
    case STAFF_HOURS_RESET:
      return { loading: false, success: false, error: false };
    default:
      return state;
  }
};

export const staffToggleReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_TOGGLE_REQUEST:
      return { loading: true };
    case STAFF_TOGGLE_SUCCESS:
      return { loading: false, Staff: action.payload };
    case STAFF_TOGGLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const searchStaffReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_SEARCH_REQUEST:
      return { loading: true };
    case STAFF_SEARCH_SUCCESS:
      return { loading: false, StaffSearch: action.payload };
    case STAFF_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addStaffImageReducer = (state = {}, action) => {
  switch (action.type) {
    case STAFF_IMAGE_REQUEST:
      return { loading: true };
    case STAFF_IMAGE_SUCCESS:
      return { loading: false, Staff: action.payload };
    case STAFF_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const topStaffReducer = (state = {}, action) => {
  switch (action.type) {
    case TOP_STAFF_REQUEST:
      return { loading: true };
    case TOP_STAFF_SUCCESS:
      return { loading: false, Staff: action.payload };
    case TOP_STAFF_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
